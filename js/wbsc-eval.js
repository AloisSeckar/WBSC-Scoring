function changeBaseAction(group) {
    if (group === input_b) {
        changeBatterBaseAction();
    } else {
        changeRunnerBaseAction(group);
    }
}

function changeSpecificAction(group) {
    if (group === input_b) {
        changeBatterSpecificAction();
    } else {
        changeRunnerSpecificAction(group);
    }
}

function changeBatterBaseAction() {
    
    const actionOptions = [];
    let specificActionDisabled = false;

    const baseAction = document.getElementById(input_b + input_base_action);
    const baseActionValue = baseAction.value;
    switch (baseActionValue) {
        case 'StrikeOut':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="KS">Swinging</option>');
            actionOptions.push('<option value="KL">Looking</option>');
            actionOptions.push('<option value="KSO">Swinging with tag/throw out</option>');
            actionOptions.push('<option value="KLO">Looking with tag/throw out</option>');
            actionOptions.push('</optgroup>');
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="KSET">Swinging with throwing error</option>');
            actionOptions.push('<option value="KSE">Swinging with fielding error</option>');
            actionOptions.push('<option value="KSWP">Swinging with wild pitch</option>');
            actionOptions.push('<option value="KSPB">Swinging with passed ball</option>');
            actionOptions.push('<option value="KSFC">Swinging with putting out runner</option>');
            actionOptions.push('<option value="KLET">Looking with throwing error</option>');
            actionOptions.push('<option value="KLE">Looking with fielding error</option>');
            actionOptions.push('<option value="KLWP">Looking with wild pitch</option>');
            actionOptions.push('<option value="KLPB">Looking with passed ball</option>');
            actionOptions.push('<option value="KLFC">Looking with putting out runner</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'GroundOut':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="GO">Ground out</option>');
            actionOptions.push('<option value="GOB">Ground out - bunt</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'FlyOut':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="F">Fly out</option>');
            actionOptions.push('<option value="P">Pop out</option>');
            actionOptions.push('<option value="L">Line out</option>');
            actionOptions.push('<option value="FF">Fouled fly out</option>');
            actionOptions.push('<option value="FP">Fouled pop out</option>');
            actionOptions.push('<option value="FL">Fouled line out</option>');
            actionOptions.push('<option value="IF">Infield fly</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'Hit':
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="1B">Single</option>');
            actionOptions.push('<option value="2B">Double</option>');
            actionOptions.push('<option value="3B">Triple</option>');
            actionOptions.push('<option value="HR">Homerun</option>');
            actionOptions.push('<option value="1BB">Single - bunt</option>');
            actionOptions.push('<option value="2BG">Double - ground rule</option>');
            actionOptions.push('<option value="IHR">Homerun - inside the park</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'Sacrifice':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="SH">Sacrifice bunt</option>');
            actionOptions.push('<option value="SF">Sacrifice fly</option>');
            actionOptions.push('<option value="FSF">Sacrifice fly in foul territory</option>');
            actionOptions.push('</optgroup>');
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="SHE">Sacrifice bunt with fielding error</option>');
            actionOptions.push('<option value="SHET">Sacrifice bunt with throwing error</option>');
            actionOptions.push('<option value="SHEF">Sacrifice bunt with dropped fly</option>');        // code ends with "F" for easier output transformation
            actionOptions.push('<option value="SHFC">Sacrifice bunt with FC</option>');
            actionOptions.push('<option value="SFE">Sacrifice fly with error</option>');
            actionOptions.push('<option value="SFO">Dropped sacrifice fly + forced out</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'FC':
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="O">Occupied</option>');
            actionOptions.push('<option value="FC">Fielder\'s choice</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'Error':
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="EF">Fielding error</option>');
            actionOptions.push('<option value="ET">Throwing error</option>');
            actionOptions.push('<option value="ED">Dropped fly</option>');
            actionOptions.push('<option value="EDF">Dropped foul</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'Advance':
            actionOptions.push('<optgroup label="Batter is safe">');
            actionOptions.push('<option value="BB1">Base on balls</option>');                            // "1" indicates the numbering should be included in output
            actionOptions.push('<option value="IBB1">Intentional base on balls</option>');                // "1" indicates the numbering should be included in output
            actionOptions.push('<option value="HP">Hit by pitch</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'OBR':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="OBR1_">1 - Illegally batted ball</option>');
            actionOptions.push('<option value="OBR2_">2 - Bunting foul third strike</option>');
            actionOptions.push('<option value="OBR3_">3 - Touched by own batted ball</option>');
            actionOptions.push('<option value="OBR4_">4 - Interfering with the catcher</option>');
            actionOptions.push('<option value="OBR5_">5 - Failing to bat in proper turn</option>');
            actionOptions.push('<option value="OBR6_">6 - Refusing to touch 1st base</option>');
            actionOptions.push('<option value="OBR8_">8 - Infield Fly that is not caught</option>');
            actionOptions.push('<option value="OBR14_">14 - Interference by a preceding runner</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'Other':
            actionOptions.push('<optgroup label="Batter is out">');
            actionOptions.push('<option value="A">Appeal play</option>');
            actionOptions.push('<option value="LT">Lost turn</option>');
            actionOptions.push('</optgroup>');
            break;
        default:
            specificActionDisabled = true;    
    }
    
    const specificAction = document.getElementById(input_b + input_spec_action);
    specificAction.innerHTML = actionOptions;
    specificAction.disabled = specificActionDisabled;
    
    changeBatterSpecificAction();
}

function changeBatterSpecificAction() {
    let fc = false;
    let hit = false;
    let minPosItems = 1;
    let targetPosItems = 1;
    let maxPosItems = 4;
    
    const specificAction = document.getElementById(input_b + input_spec_action);
    const specificActionValue = specificAction.value;
    switch (specificActionValue) {
        case 'FC':
        case 'SHFC':
            fc = true;
            minPosItems = targetPosItems = maxPosItems = 2;
            break;
        case 'BB1':
        case 'IBB1':
        case 'HP':
        case 'KS':
        case 'KSWP':
        case 'KSPB':
        case 'KL':
        case 'KLWP':
        case 'KLPB':
        case 'OBR1_':
        case 'OBR2_':
        case 'OBR3_':
        case 'OBR4_':
        case 'OBR6_':
        case 'OBR7_':
        case 'LT':
            minPosItems = targetPosItems = maxPosItems = 0;
            break;
        case '1B':
        case '2B':
        case '3B':
        case 'HR':
        case '1BB':
        case '2BG':
        case 'IHR':
            hit = true;
            minPosItems = targetPosItems = maxPosItems = 1;
            break;
        case 'KSFC':
        case 'KLFC':
        case 'O':
        case 'ED':
        case 'EDF':
        case 'SHEF':
        case 'SF':
        case 'SFE':
        case 'SFO':
        case 'FSF':
        case 'IF':
        case 'OBR8_':
            minPosItems = targetPosItems = maxPosItems = 1;
            break;
        case 'GO':
        case 'GOB':
        case 'SH':
        case 'A':
            minPosItems = 1;
            targetPosItems = 2;
            break;
        case 'OBR5_':
            minPosItems = targetPosItems = 0;
            break;
        case 'KSE':
        case 'KLE':
        case 'KSET':
        case 'KLET':
        case 'KSO':
        case 'KLO':
        case 'F':
        case 'P':
        case 'L':
        case 'FF':
        case 'FP':
        case 'FL':
        case 'EF':
        case 'ET':
        case 'SHE':
        case 'SHET':
        case 'OBR14_':
            // no adjustments
            break;
        default:
            minPosItems = targetPosItems = maxPosItems = 0;
    }
    
    window.minPosItems[input_b] = minPosItems;
    window.targetPosItems[input_b] = targetPosItems;
    window.maxPosItems[input_b] = maxPosItems;
    
    const groupID = input_b + input_position;
    
    const container = document.getElementById(groupID);
    const addItemButton = document.getElementById(groupID + input_add);
    const removeItemButton = document.getElementById(groupID + input_remove);
    
    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    while (itemsCreated > 0) {
        const posItemN = document.getElementById(groupID + itemsCreated); 
        container.removeChild(posItemN);
        itemsCreated -= 1;
    }
    
    while (itemsCreated < targetPosItems) {
        itemsCreated += 1;
        const posItemN = getPosSelectionSelect(input_b, itemsCreated);
        container.insertBefore(posItemN, addItemButton);
    }
    
    addItemButton.disabled = itemsCreated >= maxPosItems;
    removeItemButton.disabled = itemsCreated <= minPosItems;
    
    if (hit === true) {
        const posItem1 = document.getElementById(groupID + '1');
        posItem1.innerHTML = renderHitLocationOptions();
        if (posSelection[groupID]) {
            posItem1.value = posSelection[groupID][0];
        }
    }
    
    if (fc === true) {
        const posItem2 = document.getElementById(groupID + '2');
        posItem2.innerHTML = renderFCLocationOptions();
        if (posSelection[groupID]) {
            posItem2.value = posSelection[groupID][1];
        }
    }
}

function changeRunnerBaseAction(group) {
    const actionOptions = [];
    let specificActionDisabled = false;
    
    const runnerBaseAction = document.getElementById(group + input_base_action);
    switch (runnerBaseAction.value) {
        case 'adv':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="ADV">Advanced by batter</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'exbb':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="bb">Base on balls</option>');
            actionOptions.push('<option value="ibb">Intentional base on balls</option>');
            actionOptions.push('<option value="hp">Hit by pitch</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'exb':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="WP">Wild pitch</option>');
            actionOptions.push('<option value="PB">Passed ball</option>');
            actionOptions.push('<option value="BK">Balk</option>');
            actionOptions.push('<option value="IP">Illegal pitch</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'ste':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="SB">Stolen base</option>');
            actionOptions.push('<option value="CSE">Caught stealing with fielding error</option>');
            actionOptions.push('<option value="CSET">Caught stealing with throwing error</option>');
            actionOptions.push('<option value="POE">Picked off with (throwing) error</option>');
            actionOptions.push('</optgroup>');
            actionOptions.push('<optgroup label="Runner is out">');
            actionOptions.push('<option value="CSO">Caught stealing</option>');
            actionOptions.push('<option value="PO">Picked off</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'fdc':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="T">On the throw</option>');
            actionOptions.push('<option value="O/">Indifference</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'err':
            actionOptions.push('<optgroup label="Runner is safe">');
            actionOptions.push('<option value="EF">Decessive fielding</option>');
            actionOptions.push('<option value="ET">Decessive throwing</option>');
            actionOptions.push('<option value="eF">Extra base fielding</option>');
            actionOptions.push('<option value="eT">Extra base throwing</option>');
            actionOptions.push('<option value="se0">Same error (Batter)</option>');
            if (!(group.includes('1'))) {
                actionOptions.push('<option value="se1">Same error (Runner at 1st)</option>');
            }
            if (!(group.includes('2'))) {
                actionOptions.push('<option value="se2">Same error (Runner at 2nd)</option>');
            }
            if (!(group.includes('3'))) {
                actionOptions.push('<option value="se3">Same error (Runner at 3rd)</option>');
            }
            actionOptions.push('</optgroup>');
            break;
        case 'out':
            actionOptions.push('<optgroup label="Runner is out">');
            actionOptions.push('<option value="GO">Force out</option>');
            actionOptions.push('<option value="GO">Tag out</option>');
            actionOptions.push('<option value="A">Appeal play</option>');
            actionOptions.push('</optgroup>');
            break;
        case 'obr':
            actionOptions.push('<optgroup label="Runner is out">');
            actionOptions.push('<option value="OBR7_">7 - Refusing to advance from 3rd base to HP</option>');
            actionOptions.push('<option value="OBR9_">9 - Touched by a fair ball</option>');
            actionOptions.push('<option value="OBR10_">10 - Running out of line to avoid being tagged</option>');
            actionOptions.push('<option value="OBR11_">11 - Passing another runner</option>');
            actionOptions.push('<option value="OBR12_">12 - Running the bases in reverse order</option>');
            actionOptions.push('<option value="OBR13_">13 - Interfered with a fielder</option>');
            actionOptions.push('<option value="OBR15_">15 - Runner left early</option>');
            actionOptions.push('</optgroup>');
            break;
        default:
            specificActionDisabled = true;
    }
    
    const runnerSpecificAction = document.getElementById(group + input_spec_action);
    runnerSpecificAction.innerHTML = actionOptions;
    runnerSpecificAction.disabled = specificActionDisabled;
    
    changeRunnerSpecificAction(group);
}

function changeRunnerSpecificAction(group) {
    let throwing = false;
    let minPosItems = 1;
    let targetPosItems = 1;
    let maxPosItems = 4;
    
    const runnerSpecificAction = document.getElementById(group + input_spec_action);
    const runnerSpecificActionValue = runnerSpecificAction.value;
    switch (runnerSpecificActionValue) {
        case 'ADV':
        case 'bb':
        case 'ibb':
        case 'hp':
        case 'WP':
        case 'PB':
        case 'BK':
        case 'IP':
        case 'SB':
        case 'OBR7_':
        case 'se0':
        case 'se1':
        case 'se2':
        case 'se3':
            minPosItems = targetPosItems = maxPosItems = 0;
            break;
        case 'O/':
        case 'POE':
        case 'OBR9_':
        case 'OBR11_':
        case 'OBR12_':
        case 'OBR15_':
            minPosItems = targetPosItems = maxPosItems = 1;
            break;
        case 'T':
            minPosItems = targetPosItems = maxPosItems = 2;
            throwing = true;
            break;
        case 'PO':
            minPosItems = targetPosItems = 2;
            break;
        case 'CSE':
        case 'CSO':
        case 'GO':
            minPosItems = 1;
            targetPosItems = 2;
            break;
        case 'EF':
        case 'eF':
        case 'ET':
        case 'eT':
        case 'CSET':
        case 'OBR10_':
        case 'OBR13_':
        case 'A':
            // no adjustments
            break;
        default:
            maxPosItems = 1;
    }
    
    window.minPosItems[group] = minPosItems;
    window.targetPosItems[group] = targetPosItems;
    window.maxPosItems[group] = maxPosItems;
    
    const groupID = group + input_position;
    
    const container = document.getElementById(groupID);
    const addItemButton = document.getElementById(groupID + input_add);
    const removeItemButton = document.getElementById(groupID + input_remove);
    
    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    while (itemsCreated > 0) {
        const posItemN = document.getElementById(groupID + itemsCreated); 
        container.removeChild(posItemN);
        itemsCreated -= 1;
    }
    
    while (itemsCreated < targetPosItems) {
        itemsCreated += 1;
        const posItemN = getPosSelectionSelect(group, itemsCreated);
        container.insertBefore(posItemN, addItemButton);
    }
    
    addItemButton.disabled = itemsCreated >= maxPosItems;
    removeItemButton.disabled = itemsCreated <= minPosItems;
    
    if (throwing === true) {
        const posItem2 = document.getElementById(groupID + '2');
        posItem2.innerHTML = renderFCLocationOptions();
        if (posSelection[groupID]) {
            posItem2.value = posSelection[groupID][1];    
        }
    }
}

function getBaseSelection(group) {
    let base = '1';
    
    const baseSelect = document.getElementById(group + input_base);
    if (baseSelect !== null) {
        base = baseSelect.value;
    }
    
    return base;
}

function getTIESelection(group) {
    let tie = false;
    
    const tieCheck = document.getElementById(group + input_tie);
    if (tieCheck !== null) {
        tie = tieCheck.checked;
    }
    
    return tie;
}

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
            if (alreadyEncounteredPositions[selection.substr(i,1)] === true) {
                if (validation !== '') {
                    validation += '\n- ';
                }
                validation += 'A player cannot have more than 1 assist in a play';
                break;
            }
            alreadyEncounteredPositions[selection.substr(i,i+1)] = true;
        }
    }
    
    return validation;
}

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

function processInput(input) {
    let output = [];
    
    output[output_base] = parseInt(input[input_base]);
    output[output_out] = false;
    output[output_hit] = false;
    
    const pos = input[input_position];
    if (pos !== null) {
        lastPos = pos[pos.length - 1];
        if (lastPos === 'X') {
            pos = pos.substring(0, pos.length - 1) + '4';
        } else if (lastPos === 'Y') {
            pos = pos.substring(0, pos.length - 1) + '5';
        } else if (lastPos === 'Z') {
            pos = pos.substring(0, pos.length - 1) + '2';
        }
    }
    
    const action = input[input_spec_action];
    switch (action) {
        case 'EDF':
            output[output_base] = 0;
            output[output_text_1] = 'E' + pos + ' DF';
            break;
        case 'KSO':
        case 'KLO':
            output[output_text_2] = pos;
        case 'KS':
        case 'KL':
            output[output_base] = 0;
            output[output_text_1] = action.substring(0, 2);
            output[output_sub] = '1';
            output[output_out] = true;
            break;
        case 'F':
        case 'P':
        case 'L':
        case 'FF':
        case 'FP':
        case 'FL':
        case 'IF':
        case 'SF':
            output[output_base] = 0;
            output[output_text_1] = action + pos;
            output[output_out] = true;
            break;
        case 'SH':
        case 'FSF':
        case 'LT':
            output[output_base] = 0;
            output[output_text_1] = action;
            output[output_text_2] = pos;
            output[output_out] = true;
            break;
        case 'OBR1_':
        case 'OBR2_':
        case 'OBR3_':
        case 'OBR4_':
        case 'OBR6_':
            output[output_base] = 0;
            output[output_text_1] = 'OBR';
            if (action.includes('2')) {
                output[output_text_2] = 'KS';
                output[output_sub] = '1';
            } else {
                output[output_text_2] = '2';
            }
            output[output_out] = true;
            output[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case 'OBR5_':    
        case 'OBR8_':
        case 'OBR14_':
            output[output_base] = 0;
            output[output_text_1] = 'OBR';
            if (pos === '') {
                output[output_text_2] = '2';
            } else {
                output[output_text_2] = pos;
            }
            output[output_out] = true;
            output[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case '1B':
        case '1BB':
            output[output_base] = 1;
            output[output_text_1] = pos;
            if (action.endsWith('BB')) {
                output[output_text_1] += 'B';
            }
            output[output_hit] = true;
            break;
        case 'O':
        case 'FC':
            output[output_base] = 1;
            output[output_text_1] = action + pos;
            break;
        case 'KSWP':
        case 'KSPB':
        case 'KLWP':
        case 'KLPB':
            output[output_base] = 1;
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = action.substring(2);
            output[output_sub] = '1';
            break;
        case 'KSFC':    
        case 'KLFC':
            output[output_sub] = '1';
        case 'SHFC':
        case 'SFO':
            output[output_base] = 1;
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = action.substring(2) + pos;
            break;
        case 'KSET':
        case 'KSE':
        case 'KLET':
        case 'KLE':
            output[output_sub] = '1';
        case 'SHE':
        case 'SHET':
        case 'SHEF':
        case 'SFE':
        case 'SFO':
            output[output_base] = 1;
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (action.length > 3) {
                output[output_text_2] += action.substring(3);
            }
            break;
        case '2B':
        case '2BG':
            output[output_base] = 2;
            output[output_text_1] = pos;
            if (action.endsWith('G')) {
                output[output_text_2] += 'GR';
            }
            output[output_hit] = true;
            break;
        case '3B':
            output[output_base] = 3;
            output[output_text_1] = pos;
            output[output_hit] = true;
            break;
        case 'HR':
        case 'IHR':
            output[output_base] = 4;
            output[output_text_1] = action;
            output[output_text_2] = pos;
            output[output_hit] = true;
            break;
        case 'BB1':
        case 'IBB1':
            output[output_sub] = '1';
        case 'HP':
            output[output_base] = 1;
            if (action.length > 2) {
                output[output_text_1] = action.substring(0, action.length - 1);
            } else {
                output[output_text_1] = action;
            }
            break;
        case 'bb':
        case 'ibb':
        case 'hp':
        case 'WP':
        case 'PB':
        case 'BK':
        case 'IP':
        case 'SB':
            output[output_text_1] = action.toUpperCase() + window.batter;
            break;
        case 'ADV':
            output[output_text_1] = window.batter;
            break;
        case 'se0':
            output[output_text_1] = '(' + window.batter + ')' ;
            break;
        case 'se1':
            battingOrder = 1;
            battingOrder += document.getElementById(input_r2) !== null ? 1 : 0;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            output[output_text_1] = '(' + battingOrder + ')' ;
            break;
        case 'se2':
            battingOrder = 1;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            output[output_text_1] = '(' + battingOrder + ')' ;
        case 'se3':
            output[output_text_1] = '(1)' ;
            break;
        case 'GO':
        case 'GOB':
        case 'A':
            if (output[output_base] === 1) {
                output[output_base] = 0;
            }
            output[output_text_1] = pos;
            if (action.startsWith('A')) {
                output[output_text_1] = 'A' + pos;
            } else if (action.endsWith('B')) {
                output[output_text_1] += 'B';
            }
            output[output_out] = true;
            break;
        case 'O/':
            output[output_num] = true;
        case 'T':
            output[output_text_1] = action + pos;
            break;
        case 'CSO':
        case 'PO':
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = pos;
            output[output_out] = true;
            output[output_num] = true;
            break;
        case 'CSE':
        case 'CSET':
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (action.endsWith('T')) {
                output[output_text_2] += 'T';
            }
            output[output_num] = true;
            break;
        case 'POE':
            output[output_text_1] = action.substring(0, 2);
            output[output_text_2] = 'e' + pos + 'T';
            output[output_num] = true;
            break;
        case 'OBR7_':
        case 'OBR9_':
        case 'OBR10_':
        case 'OBR11_':
        case 'OBR12_':
        case 'OBR13_':
        case 'OBR15_':
            output[output_text_1] = 'OBR';
            if (action.includes('7')) {
                output[output_text_2] = '2';
            } else {
                output[output_text_2] = pos;
            }
            output[output_out] = true;
            output[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case 'EF':
        case 'ET':
        case 'EM':
        case 'ED':
        case 'eF':
        case 'eT':
            output[output_text_1] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (!action.endsWith('F')) {
                output[output_text_1] += action.substring(1);
            }
            break;
    }
    
    return output;
}