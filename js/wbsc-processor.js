/* *************************************** */
/* wbsc-processor.js                       */
/* Transform and process user's input      */
/* *************************************** */

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction() {
    const bInput = getInput(input_b);
    const b1Input = getInput(input_b1);
    const b2Input = getInput(input_b2);
    const b3Input = getInput(input_b3);
    const r1Input = getInput(input_r1);
    const r1aInput = getInput(input_r1a);
    const r1bInput = getInput(input_r1b);
    const r2Input = getInput(input_r2);
    const r2aInput = getInput(input_r2a);
    const r3Input = getInput(input_r3);
    
    let playersInvolved = 0;
    const inputs = [];
        
    window.outs = [];
    window.concurrentPlays = [];

    // runner 3
    if (r3Input !== null) {
        playersInvolved += 1;
        processInput(r3Input, playersInvolved);
        inputs.push(r3Input);
    }
    
    // runner 2
    if (r2Input !== null) {
        playersInvolved += 1;
        processInput(r2Input, playersInvolved);
        inputs.push(r2Input);
    }
    const extraR2Input = [];
    if (r2aInput !== null) {
        processInput(r2aInput, playersInvolved);
        inputs.push(r2aInput);
        extraR2Input.push(r2aInput);
    }

    // runner 1
    if (r1Input !== null) {
        playersInvolved += 1;
        processInput(r1Input, playersInvolved);
        inputs.push(r1Input);
    }
    const extraR1Input = [];
    if (r1aInput !== null) {
        processInput(r1aInput, playersInvolved);
        inputs.push(r1aInput);
        extraR1Input.push(r1aInput);
    }
    if (r1bInput !== null) {
        processInput(r1bInput, playersInvolved);
        inputs.push(r1bInput);
        extraR1Input.push(r1bInput);
    }

    // batter
    if (bInput !== null) {
        playersInvolved += 1;
        processInput(bInput, playersInvolved);
        inputs.push(bInput);
    }
    const extraBatterInput = [];
    if (b1Input !== null) {
        processInput(b1Input, playersInvolved);
        inputs.push(b1Input);
        extraBatterInput.push(b1Input);
    }
    if (b2Input !== null) {
        processInput(b2Input, playersInvolved);
        inputs.push(b2Input);
        extraBatterInput.push(b2Input);
    }
    if (b3Input !== null) {
        processInput(b3Input, playersInvolved);
        inputs.push(b3Input);
        extraBatterInput.push(b3Input);
    }
    
    const validation = checkUserInput(inputs);
    if (validation === '') {
        const inputArr = [r3Input, r2aInput, r2Input, r1bInput, r1aInput, r1Input];
        checkMultipleRunnerAdvances(inputArr);

        window.vOffset = 0;
        window.hOffset = 75;
        
        window.canvas.height = playersInvolved * h - ((playersInvolved - 1) * 8);
        
        if (bInput === null) {
            window.batter = playersInvolved + 1;
        } else {
            window.batter = playersInvolved;
        }

        // current batter is not known in the time of input evaluation (we don't forsee number of players involved)
        // therefore placeholder is being used and here is replaced with actual number
        for (let i = 0; i < inputs.length; i += 1) {
            inputs[i][output_text_1] = inputs[i][output_text_1].replace('#b#', window.batter);
        }

        // render situations one by one
        let displayed = 0;
        if (r3Input !== null) {
            r3Input[input_origBase] = 3;
            displayed += 1;
            renderAction(displayed, r3Input, null, true);
            window.vOffset += h - 8;
        }
        if (r2Input !== null) {
            r2Input[input_origBase] = 2;
            displayed += 1;
            renderAction(displayed, r2Input, extraR2Input, true);
            window.vOffset += h - 8;
        }
        if (r1Input !== null) {
            r1Input[input_origBase] = 1;
            displayed += 1;
            renderAction(displayed, r1Input, extraR1Input, true);
            window.vOffset += h - 8;
        }
        if (bInput !== null) {
            displayed += 1;
            renderAction(displayed, bInput, extraBatterInput, true);
            window.vOffset += h - 8;
        }

        connectOutsIfNeeded();
        removeDuplicateConnectors();
        connectConcurrentPlaysIfNeeded();

    } else {
        alert('The given input is invalid:\n' + validation);
    }
}

// get current value from 'base' select for given input group
function getBaseSelection(group) {
    let base = '1';
    
    const baseSelect = document.getElementById(group + input_base);
    if (baseSelect !== null) {
        base = baseSelect.value;
    }
    
    return base;
}

// get current value from 'tiebreak' checker for given input group
function getTIESelection(group) {
    let tie = false;
    
    const tieCheck = document.getElementById(group + input_tie);
    if (tieCheck !== null) {
        tie = tieCheck.checked;
    }
    
    return tie;
}


// get current value from 'run' select for given input group
function getRunTypeSelection(group) {
    let run = 'e';
    
    const runtypeSelect = document.getElementById(group + input_runtype);
    if (runtypeSelect !== null) {
        run = runtypeSelect.value;
    }
    
    return run;
}

// get current values from 'involved' selects for given input group
function getPosSelection(group) {
    let selection = [];
    
    const container = document.getElementById(group + input_position);
    const posCount = container.getElementsByClassName(class_wbsc_pos);
    for (let i = 0; i < posCount.length; i += 1) {
        selection[i] = posCount.item(i).value;
    }
    
    posSelection[group + input_position] = selection;
    
    return selection.join('');
}

// get and wrap current user input for given input group
function getInput(group) {
    let values = null;
    
    const container = document.getElementById(group);
    if (container !== null) {
        values = [];
        values[input_base_action] = document.getElementById(group + input_base_action).value;
        values[input_spec_action] = document.getElementById(group + input_spec_action).value;
        values[input_tie] = getTIESelection(group);
        values[input_base] = getBaseSelection(group);
        values[input_runtype] = getRunTypeSelection(group);
        values[input_position] = getPosSelection(group);
    }
    
    return values;
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/10
function checkMultipleRunnerAdvances(inputArr) {
    // first encountered will be uppercase, possible others lowercase
    let wpOrPbEncountered = false;
    for (let i = 0; i < inputArr.length; i += 1) {
        const current = inputArr[i];
        if (current != null) {
            if (current[input_spec_action] === "WP" || current[input_spec_action] === "PB"
             || current[input_spec_action] === "BK" || current[input_spec_action] === "IP") {
                if (wpOrPbEncountered) {
                    current[input_spec_action] = current[input_spec_action].toLowerCase();
                }
                wpOrPbEncountered = true;
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
    for (let i = 0; i < window.outs.length; i += 1) {
        const base = window.outs[i].base;
        if (base === 4 || base === 3) {
            runner23Out = true;
        }
        if (base === 0) { 
            batterOut = true;
        }
    }
    for (let i = 0; i < window.concurrentPlays.length; i += 1) {
        const base = window.concurrentPlays[i].base;
        const out = window.concurrentPlays[i].out;
        if ((base === 3 || base === 2) && !out) {
            runner12Advance = true;
        }
    }

    // if conditions are met, remove the first connector 
    // (evaluation always goes from most ahead runner)
    if (runner23Out === true && runner12Advance === true && batterOut === true) {
        window.concurrentPlays.shift();
    }
}

