/* *************************************** */
/* wbsc-eval.js                            */
/* CORE file with input evaluation methods */
/* *************************************** */

// triggered when user selects from 'base' action
function changeBaseAction(group) {
    if (group === input_b) {
        changeBatterBaseAction();
    } else {
        changeRunnerBaseAction(group);
    }
}

// triggered when user selects from 'specific' action
function changeSpecificAction(group) {
    if (group === input_b) {
        changeBatterSpecificAction();
    } else {
        changeRunnerSpecificAction(group);
    }
}

// ajdust 'specific' action according to selected 'base' action
function changeBatterBaseAction() {
    const baseAction = document.getElementById(input_b + input_base_action);
    const actionOptions = renderBatterSpecificActionOptions(baseAction.value);
    const specificActionDisabled = actionOptions === [];

    const specificAction = document.getElementById(input_b + input_spec_action);
    specificAction.innerHTML = actionOptions;
    specificAction.disabled = specificActionDisabled;
    
    changeBatterSpecificAction();
}

// adjust 'involved' inputs according to selected 'specific' action
function changeBatterSpecificAction() {
    let fc = false;
    let hit = false;
    let minPosItems = 1;
    let targetPosItems = 1;
    let maxPosItems = 4;
    let runTypeSelectDisabled = true;
    
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
        case 'HR':
        case 'IHR':
            runTypeSelectDisabled = false;
        case '1B':
        case '2B':
        case '3B':
        case '1BB':
        case '2BG':
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

    const runTypeSelect = document.getElementById(input_b + input_runtype);
    runTypeSelect.disabled = runTypeSelectDisabled;
}

// ajdust 'specific' action according to selected 'base' action
function changeRunnerBaseAction(group) {
    const runnerBaseAction = document.getElementById(group + input_base_action);
    const actionOptions = renderRunnerSpecificActionOptions(runnerBaseAction.value, group);
    const specificActionDisabled = actionOptions === [];

    const specificAction = document.getElementById(group + input_spec_action);
    specificAction.innerHTML = actionOptions;
    specificAction.disabled = specificActionDisabled;
    
    changeRunnerSpecificAction(group);
}

// adjust 'involved' inputs according to selected 'specific' action
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
        case 'CSN':
        case 'CSO':
        case 'GO':
            minPosItems = 1;
            targetPosItems = 2;
            break;
        case 'EF':
        case 'eF':
        case 'ET':
        case 'eT':
        case 'ENF':
        case 'ENT':
        case 'CSET':
        case 'CSNT':
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

// allows to select run type when home base is selected
function changeBase(group) {
    const baseSelect = document.getElementById(group + input_base);
    const baseSelectValue = baseSelect.value;
    
    const runTypeSelect = document.getElementById(group + input_runtype);
    runTypeSelect.disabled = baseSelectValue !== '4';
}

// transform user's input into output instructions
function processInput(input) {
    let output = [];
    
    output[output_base] = parseInt(input[input_base]);
    output[output_run] = input[input_runtype];
    output[output_out] = false;
    output[output_hit] = false;
    output[output_na] = false;
    
    let pos = input[input_position];
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
            output[output_na] = true;
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
            output[output_text_2] = pos;
        case 'LT':
            output[output_base] = 0;
            output[output_text_1] = action;
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
        case 'CSN':
        case 'CSNT':
            output[output_na] = true;
            output[output_base] -= 1;
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
        case 'ENT':
        case 'ENF':
                output[output_na] = true;
                output[output_base] -= 1;
        case 'EF':
        case 'ET':
        case 'EM':
        case 'ED':
        case 'eF':
        case 'eT':
            output[output_text_1] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (!action.endsWith('F')) {
                output[output_text_1] += action.substring(action.length - 1);
            }
            break;
    }
    
    return output;
}