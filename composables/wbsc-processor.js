/* *************************************** */
/* wbsc-processor.js                       */
/* Transform and process user's input      */
/* *************************************** */

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction() {
    const inputs = [];
    const r3Input = getInput(input_r3);
    inputs.push(r3Input);
    const r2aInput = getInput(input_r2a);
    inputs.push(r2aInput);
    const r2Input = getInput(input_r2);
    inputs.push(r2Input);
    const r1bInput = getInput(input_r1b);
    inputs.push(r1bInput);
    const r1aInput = getInput(input_r1a);
    inputs.push(r1aInput);
    const r1Input = getInput(input_r1);
    inputs.push(r1Input);
    const b3Input = getInput(input_b3);
    inputs.push(b3Input);
    const b2Input = getInput(input_b2);
    inputs.push(b2Input);
    let b1Input = getInput(input_b1);
    const bInput = getInput(input_b);
    // possible special case for "extra advance on the same error"
    if (b1Input && b1Input[input_spec_action] === 'se0') {
        if (bInput) {
            bInput[input_base] = b1Input[input_base];
        }
        b1Input = null;
    } else {
        inputs.push(b1Input);
    }
    inputs.push(bInput);

    checkMultipleRunnerAdvances(inputs);

    let playersInvolved = 0;
    window.outs = [];
    window.concurrentPlays = [];

    // runner 3
    if (r3Input !== null) {
        playersInvolved += 1;
        processInput(r3Input, playersInvolved, 3);
    }
    
    // runner 2
    if (r2Input !== null) {
        playersInvolved += 1;
    }
    const extraR2Input = [];
    if (r2aInput !== null) {
        processInput(r2aInput, playersInvolved, 3);
        extraR2Input.push(r2aInput);
    }
    if (r2Input !== null) {
        processInput(r2Input, playersInvolved, 2);
    }

    // runner 1
    if (r1Input !== null) {
        playersInvolved += 1;
    }
    const extraR1Input = [];
    if (r1bInput !== null) {
        processInput(r1bInput, playersInvolved, 3);
        extraR1Input.push(r1bInput);
    }
    if (r1aInput !== null) {
        const r1orig = r1Input !== null ? r1Input[output_base] : 2;
        processInput(r1aInput, playersInvolved, r1orig);
        extraR1Input.push(r1aInput);
    }
    if (r1Input !== null) {
        processInput(r1Input, playersInvolved, 1);
    }

    // batter
    if (bInput !== null) {
        playersInvolved += 1;
    }
    const extraBatterInput = [];
    if (b3Input !== null) {
        processInput(b3Input, playersInvolved, 3);
        extraBatterInput.push(b3Input);
    }
    if (b2Input !== null) {
        const b2orig = b1Input !== null ? b1Input[output_base] : 2;
        processInput(b2Input, playersInvolved, b2orig);
        extraBatterInput.push(b2Input);
    }
    if (b1Input !== null) {
        const b1orig = bInput !== null ? bInput[output_base] : 1;
        processInput(b1Input, playersInvolved, b1orig);
        extraBatterInput.push(b1Input);
    }
    if (bInput !== null) {
        processInput(bInput, playersInvolved, 0);
    }
    
    const validation = checkUserInput(inputs);
    if (validation === '') {
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
            if (inputs[i] != null) {
                inputs[i][output_text_1] = inputs[i][output_text_1].replace('#b#', window.batter);
            }
        }

        // render situations one by one
        let displayed = 0;
        if (r3Input !== null) {
            displayed += 1;
            renderAction(displayed, r3Input, null, true);
            window.vOffset += h - 8;
        }
        if (r2Input !== null) {
            displayed += 1;
            renderAction(displayed, r2Input, extraR2Input, true);
            window.vOffset += h - 8;
        }
        if (r1Input !== null) {
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
    let advanceEncountered = false;
    for (let i = 0; i < inputArr.length; i += 1) {
        const current = inputArr[i];
        if (current != null) {
            if (current[input_spec_action] === "WP" || current[input_spec_action] === "PB"
             || current[input_spec_action] === "BK" || current[input_spec_action] === "IP") {
                if (advanceEncountered) {
                    current[input_spec_action] = current[input_spec_action].toLowerCase();
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

export {
    processAction
}

