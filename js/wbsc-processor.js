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
    let validation = '';
    
    if (bInput !== null) {
        playersInvolved += 1;
        validation += attachValidation(validation, bInput[input_validation]);
    }
    
    const extraBatterInput = [];
    if (b1Input !== null) {
        validation += attachValidation(validation, b1Input[input_validation]);
        extraBatterInput.push(b1Input);
    }
    if (b2Input !== null) {
        validation += attachValidation(validation, b2Input[input_validation]);
        extraBatterInput.push(b2Input);
    }
    if (b3Input !== null) {
        validation += attachValidation(validation, b3Input[input_validation]);
        extraBatterInput.push(b3Input);
    }
    
    if (r1Input !== null) {
        playersInvolved += 1;
        validation += attachValidation(validation, r1Input[input_validation]);
    }
    
    const extraR1Input = [];
    if (r1aInput !== null) {
        validation += attachValidation(validation, r1aInput[input_validation]);
        extraR1Input.push(r1aInput);
    }
    if (r1bInput !== null) {
        validation += attachValidation(validation, r1bInput[input_validation]);
        extraR1Input.push(r1bInput);
    }
    
    if (r2Input !== null) {
        playersInvolved += 1;
        validation += attachValidation(validation, r2Input[input_validation]);
    }
    
    const extraR2Input = [];
    if (r2aInput !== null) {
        validation += attachValidation(validation, r2aInput[input_validation]);
        extraR2Input.push(r2aInput);
    }
    
    if (r3Input !== null) {
        playersInvolved += 1;
        validation += attachValidation(validation, r3Input[input_validation]);
    }
    
    if (validation === '') {
        window.vOffset = 0;
        window.hOffset = 75;
        
        window.canvas.height = playersInvolved * h - ((playersInvolved - 1) * 8);
        
        if (bInput === null) {
            window.batter = playersInvolved + 1;
        } else {
            window.batter = playersInvolved;
        }
        
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
        values[input_position] = getPosSelection(group);
        values[input_validation] = checkPosSelection(values[input_position]);
    }
    
    return values;
}

// validates given 'involved' sequence
function checkPosSelection(selection) {
    let validation = '';

    if (selection.length > 1) {
        if (!selection.endsWith('LL') && selection[selection.length - 2] === selection[selection.length - 1]) {
            validation = 'A player cannot assist directly to self';
        }
    }
    if (selection.length > 2) {
        let alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false];
        for (let i = 0; i < selection.length - 1; i += 1) {
            if (alreadyEncounteredPositions[selection.substr(i, 1)] === true) {
                if (validation !== '') {
                    validation += '\n- ';
                }
                validation += 'A player cannot have more than 1 assist in a play';
                break;
            }
            alreadyEncounteredPositions[selection.substr(i, i + 1)] = true;
        }
    }

    return validation;
}

// helper to attach new part of validation message to previous contents
function attachValidation(input, validation) {
    if (input !== '') {
        input += '\n';
    }

    if (validation !== '') {
        input += '- ';
    }

    input += validation;

    return input;
}