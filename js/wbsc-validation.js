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
        if (inputs[i] != null) {
            validation = attachValidation(validation, checkPosSelection(inputs[i][input_position]));
        }
    }

    // 2) validations over all inputs
    validation = attachValidation(validation, checkMaxOuts(inputs));
    validation = attachValidation(validation, checkOutcome(inputs));
    validation = attachValidation(validation, checkGDP(inputs));
    
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
        if (inputs[i] != null && inputs[i][output_out] === true) {
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
// extra actions for same runner must happen in order
// when the runner is out, he cannot advance further
function checkOutcome(inputs) {
    let validation = '';

    let currentPlayer = -1;
    let playerWasOut = false;
    let reachedBases = [];

    for (let i = 0; i < inputs.length; i += 1) {
        if (inputs[i] != null) {
            if (currentPlayer === inputs[i][output_player]) {
                if (inputs[i][output_out]) {
                    if (playerWasOut) {
                        validation = attachValidation(validation, 'One player cannot be out more than once');
                    } else {
                        playerWasOut = true;
                        validation = attachValidation(validation, 'Player cannot advance further after being out');
                    }
                }
                const maxReachedBase = reachedBases[reachedBases.length - 1];
                const currentReachedBase = inputs[i][output_base];
                if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && inputs[i][output_na] === false)) {
                    validation = attachValidation(validation, 'Extra advances of one player must happen in order');
                }
            } else {
                currentPlayer = inputs[i][output_player];
                playerWasOut = inputs[i][output_out];
                reachedBases.push(inputs[i][output_base]);
            }
        }
    }

    for (let i = 0; i < reachedBases.length - 1; i += 1) {
        const reachedBase1 = reachedBases[i];
        const reachedBase2 = reachedBases[i+1];

        if (reachedBase2 > reachedBase1) {
            validation = attachValidation(validation, 'Player cannot pass another runner');
        }
        
        if (reachedBase1 !== 4 && reachedBase1 === reachedBase2) {
            validation = attachValidation(validation, 'Two players cannot finish on the same base');
        }
    }
    
    return validation;
}

// if GDP (GDPE) is selected for batter
// there has to be at least 1 correspondig out/decessive error situatuon for runners
function checkGDP(inputs) {
    let validation = '';

    let gdpSelected = false;
    let gdpOut = false;

    for (let i = 0; i < inputs.length; i += 1) {
        if (inputs[i] != null) {
            if (inputs[i][output_text_1] === 'GDP' || inputs[i][output_text_1] === 'GDPE') {
                gdpSelected = true;
            } else {
                if (inputs[i][output_out] === true || inputs[i][output_text_1].includes('E') || 
                (inputs[i][output_text_2] !== undefined && inputs[i][output_text_2].includes('E'))) {
                    gdpOut = true;
                }
            }
        }
    }

    if (gdpSelected === true && gdpOut === false) {
        validation = attachValidation(validation, 'GDP is selected, but corresponding out/decessive error is missing');
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