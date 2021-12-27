/* **************************************** */
/* wbsc-validation.js                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

// validation sequence to be run over given inputs
// (this should be the single point of entry to validatons)
// (called from wbsc-processor.processAction())
function checkUserInput(inputs) {
    let validation = '';

    // 1) validations to be run over each input separately
    for (let i = 0; i < inputs.length; i += 1) {
        validation = attachValidation(validation, checkPosSelection(inputs[i][input_position]));
    }

    // 2) validations over all inputs
    validation = attachValidation(validation, checkMaxOuts(inputs));
    
    return validation;
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
            alreadyEncounteredPositions[selection.substr(i, 1)] = true;
        }
    }

    return validation;
}

// there cannot be more than 3 outs
function checkMaxOuts(inputs) {
    let outs = 0;

    for (let i = 0; i < inputs.length; i += 1) {
        if (inputs[i][output_out] === true) {
            outs++;
        }
    }

    if (outs > 3) {
        return 'There cannot be more than 3 outs in one play';
    } else {
        return '';
    }
}

// runner cannot overtake his precessor
// runners cannot end on the same base
function checkOutcome(inputs) {
    // TODO
    return '';
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