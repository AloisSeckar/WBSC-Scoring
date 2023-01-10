/* *************************************** */
/* wbsc-processor.js                       */
/* Transform and process user's input      */
/* *************************************** */

import { WBSCInput } from "./useInputStore";

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction() {
    const inputs = [] as WBSCInput[];
    const r3Input = getInput(input_r3);
    if (r3Input) {
        inputs.push(r3Input);
    }
    const r2aInput = getInput(input_r2a);
    if (r2aInput) {
        inputs.push(r2aInput);
    }
    const r2Input = getInput(input_r2);
    if (r2Input) {
        inputs.push(r2Input);
    }
    const r1bInput = getInput(input_r1b);
    if (r1bInput) {
        inputs.push(r1bInput);
    }
    const r1aInput = getInput(input_r1a);
    if (r1aInput) {
        inputs.push(r1aInput);
    }
    const r1Input = getInput(input_r1);
    if (r1Input) {
        inputs.push(r1Input);
    }
    const b3Input = getInput(input_b3);
    if (b3Input) {
        inputs.push(b3Input);
    }
    const b2Input = getInput(input_b2);
    if (b2Input) {
        inputs.push(b2Input);
    }
    let b1Input = getInput(input_b1);
    const bInput = getInput(input_b);
    // possible special case for "extra advance on the same error"
    if (b1Input && b1Input.specAction === 'se0') {
        if (bInput) {
            bInput.base = b1Input.base;
        }
        b1Input = null;
    } else {
        if (b1Input) {
            inputs.push(b1Input);
        }
    }
    if (bInput) {
        inputs.push(bInput);
    }

    checkMultipleRunnerAdvances(inputs);

    let playersInvolved = 0;
    useEvalStore().outs = [];
    useEvalStore().concurrentPlays = [];

    // runner 3
    if (r3Input) {
        playersInvolved += 1;
        r3Input.output = processInput(r3Input, playersInvolved, 3);
        r3Input.output.previousAdvance = true
    }
    
    // runner 2
    if (r2Input) {
        playersInvolved += 1;
    }
    const extraR2Input = [];
    if (r2aInput) {
        r2aInput.output = processInput(r2aInput, playersInvolved, 3);
        extraR2Input.push(r2aInput);
    }
    if (r2Input) {
        r2Input.output = processInput(r2Input, playersInvolved, 2);
        r2Input.output.previousAdvance = true
    }

    // runner 1
    if (r1Input) {
        playersInvolved += 1;
    }
    const extraR1Input = [];
    if (r1bInput) {
        r1bInput.output = processInput(r1bInput, playersInvolved, 3);
        extraR1Input.push(r1bInput);
    }
    if (r1aInput) {
        const r1orig = r1Input && r1Input.base ? r1Input.base : 2;
        r1aInput.output = processInput(r1aInput, playersInvolved, r1orig);
        extraR1Input.push(r1aInput);
    }
    if (r1Input) {
        r1Input.output = processInput(r1Input, playersInvolved, 1);
        r1Input.output.previousAdvance = true
    }

    // batter
    if (bInput) {
        playersInvolved += 1;
    }
    const extraBatterInput = [];
    if (b3Input) {
        b3Input.output = processInput(b3Input, playersInvolved, 3);
        extraBatterInput.push(b3Input);
    }
    if (b2Input) {
        const b2orig = b1Input && b1Input.base ? b1Input.base : 2;
        b2Input.output = processInput(b2Input, playersInvolved, b2orig);
        extraBatterInput.push(b2Input);
    }
    if (b1Input) {
        const b1orig = bInput && bInput.base ? bInput.base : 1;
        b1Input.output = processInput(b1Input, playersInvolved, b1orig);
        extraBatterInput.push(b1Input);
    }
    if (bInput) {
        bInput.output = processInput(bInput, playersInvolved, 0);
    }
    
    const validation = checkUserInput(inputs);
    if (validation === '') {
        useCanvasStore().vOffset = 0;
        
        const canvas = useCanvasStore().canvas as HTMLCanvasElement
        canvas.height = playersInvolved * h1 - ((playersInvolved - 1) * 8);
        
        if (bInput === null) {
            useEvalStore().batter = playersInvolved + 1;
        } else {
            useEvalStore().batter = playersInvolved;
        }

        // current batter is not known in the time of input evaluation (we don't forsee number of players involved)
        // therefore placeholder is being used and here is replaced with actual number
        for (let i = 0; i < inputs.length; i += 1) {
            const output = inputs[i].output
            if (output) {
                output.text1 = output.text1.replace('#b#', useEvalStore().batter.toString());
            }
        }

        // render situations one by one
        let displayed = 0;
        if (r3Input !== null) {
            displayed += 1;
            renderAction(displayed, r3Input, null, true);
            useCanvasStore().vOffset += h1 - 8;
        }
        if (r2Input !== null) {
            displayed += 1;
            renderAction(displayed, r2Input, extraR2Input, true);
            useCanvasStore().vOffset += h1 - 8;
        }
        if (r1Input !== null) {
            displayed += 1;
            renderAction(displayed, r1Input, extraR1Input, true);
            useCanvasStore().vOffset += h1 - 8;
        }
        if (bInput !== null) {
            displayed += 1;
            renderAction(displayed, bInput, extraBatterInput, true);
            useCanvasStore().vOffset += h1 - 8;
        }

        connectOutsIfNeeded();
        removeDuplicateConnectors();
        connectConcurrentPlaysIfNeeded();

    } else {
        alert('The given input is invalid:\n' + validation);
    }
}

// get current value from 'base' select for given input group
function getBaseSelection(group: string): number {
    let base = 1;
    
    const baseSelect = document.getElementById(group + input_base) as HTMLInputElement;
    if (baseSelect) {
        base = parseInt(baseSelect.value);
    }
    
    return base;
}

// get current value from 'tiebreak' checker for given input group
function getTIESelection(group: string): boolean {
    let tie = false;
    
    const tieCheck = document.getElementById(group + input_tie) as HTMLInputElement;
    if (tieCheck) {
        tie = tieCheck.checked;
    }
    
    return tie;
}


// get current value from 'run' select for given input group
function getRunTypeSelection(group: string): string{
    let run = 'e';
    
    const runtypeSelect = document.getElementById(group + input_runtype) as HTMLInputElement;
    if (runtypeSelect) {
        run = runtypeSelect.value;
    }
    
    return run;
}

// get current values from 'involved' selects for given input group
function getPosSelection(group: string) {
    let selection = '';
    
    const container = document.getElementById(group + input_position) as HTMLElement;
    const posCount = container.getElementsByClassName(class_wbsc_pos);
    for (let i = 0; i < posCount.length; i += 1) {
        const item = posCount.item(i) as HTMLInputElement;
        selection += item.value;
    }
    
    useEvalStore().setPosSelection(group + input_position, selection);
    
    return selection;
}

// get and wrap current user input for given input group
function getInput(group: string): WBSCInput | null {
    let input = null;
    
    const container = document.getElementById(group);
    if (container) {
        const baseAction = document.getElementById(group + input_base_action) as HTMLInputElement
        const specAction = document.getElementById(group + input_spec_action) as HTMLInputElement

        input = getEmptyInput();
        input.group = group;
        input.baseAction = baseAction.value;
        input.specAction = specAction.value;
        input.tie = getTIESelection(group);
        input.base = getBaseSelection(group);
        input.runtype = getRunTypeSelection(group);
        input.pos = getPosSelection(group);
    }
    
    return input;
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/10
function checkMultipleRunnerAdvances(inputArr: WBSCInput[]) {
    // first encountered will be uppercase, possible others lowercase
    let advanceEncountered = false;
    for (let i = 0; i < inputArr.length; i += 1) {
        const current = inputArr[i];
        if (current != null) {
            const action = current.specAction
            if (action === "WP" || action === "PB" || action === "BK" || action === "IP") {
                if (advanceEncountered) {
                    current.specAction = action.toLowerCase();
                }
                advanceEncountered = true;
            }
        }
    }
}

// helper for concurrent plays
// in situations with mupltiple outs some of the connectors may become obsolete
// as the situations were already bind together with multiple-out marker
// known cases: 
// - ahead runner out at 3rd/Home + following runner advances to 2nd/3rd + batter out
function removeDuplicateConnectors() {
    let runner23Out = false;
    let runner12Advance = false;
    let batterOut = false;
    for (let i = 0; i < useEvalStore().outs.length; i += 1) {
        const base = useEvalStore().outs[i].base;
        if (base === 4 || base === 3) {
            runner23Out = true;
        }
        if (base === 0) { 
            batterOut = true;
        }
    }
    for (let i = 0; i < useEvalStore().concurrentPlays.length; i += 1) {
        const base = useEvalStore().concurrentPlays[i].base;
        const out = useEvalStore().concurrentPlays[i].out;
        if ((base === 3 || base === 2) && !out) {
            runner12Advance = true;
        }
    }

    // if conditions are met, remove the first connector 
    // (evaluation always goes from most ahead runner)
    if (runner23Out === true && runner12Advance === true && batterOut === true) {
        useEvalStore().concurrentPlays.shift();
    }
}

export {
    processAction, getPosSelection
}

