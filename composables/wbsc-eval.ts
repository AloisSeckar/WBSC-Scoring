/* *************************************** */
/* wbsc-eval.js                            */
/* CORE file with input evaluation methods */
/* *************************************** */

import { useEvalStore } from './useEvalStore';
import { WBSCInput } from './useInputStore';
import { WBSCOutput } from './useOutputStore';

// triggered when user selects from 'base' action
function changeBaseAction(group: string) {
    if (group === input_b) {
        changeBatterBaseAction();
    } else {
        changeRunnerBaseAction(group);
    }
}

// triggered when user selects from 'specific' action
function changeSpecificAction(group: string) {
    if (group === input_b) {
        changeBatterSpecificAction();
    } else {
        changeRunnerSpecificAction(group);
    }
}

// ajdust 'specific' action according to selected 'base' action
function changeBatterBaseAction() {
    const baseAction = document.getElementById(input_b + input_base_action) as HTMLInputElement;
    const actionOptions = renderBatterSpecificActionOptions(baseAction.value);
    const specificActionDisabled = actionOptions.length < 1;

    const specificAction = document.getElementById(input_b + input_spec_action) as HTMLInputElement;
    specificAction.innerHTML = actionOptions.join();
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
    
    const specificAction = document.getElementById(input_b + input_spec_action) as HTMLInputElement;
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
        case 'INT':
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
        case 'KSO':
        case 'KLO':
        case 'O':
        case 'EDF':
        case 'EDL':
        case 'EDP':
        case 'EDFB':
        case 'OB':
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
        case 'GDP':
        case 'GDPE':
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
        case 'KST':
        case 'KLT':
        case 'F':
        case 'P':
        case 'L':
        case 'FF':
        case 'FP':
        case 'FL':
        case 'FB':
        case 'FFB':
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
    
    useEvalStore().minPosItems.push({inputGroup: input_b, limit: minPosItems})
    useEvalStore().targetPosItems.push({inputGroup: input_b, limit: targetPosItems})
    useEvalStore().maxPosItems.push({inputGroup: input_b, limit: maxPosItems})
    
    const groupID = input_b + input_position;
    
    const container = document.getElementById(groupID);
    if (container) {
        
        const addItemButton = document.getElementById(groupID + input_add) as HTMLInputElement;
        const removeItemButton = document.getElementById(groupID + input_remove) as HTMLInputElement;

        let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
        if (itemsCreated) {
            while (itemsCreated > 0) {
                const posItemN = document.getElementById(groupID + itemsCreated);
                if (posItemN) {
                    container.removeChild(posItemN);
                    itemsCreated -= 1;
                }
            }
            
            while (itemsCreated < targetPosItems) {
                itemsCreated += 1;
                const posItemN = getPosSelectionSelect(input_b, itemsCreated);
                container.insertBefore(posItemN, addItemButton);
            }
        }
    
        addItemButton.disabled = itemsCreated >= maxPosItems;
        removeItemButton.disabled = itemsCreated <= minPosItems;
        
        if (hit === true) {
            const posItem1 = document.getElementById(groupID + '1') as HTMLInputElement;
            if (posItem1) {
                posItem1.innerHTML = renderHitLocationOptions().join();
                posItem1.value = useEvalStore().getPosSelection(groupID)[0];
            }
        }
        
        if (fc === true) {
            const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement;
            if (posItem2) {
                posItem2.innerHTML = renderFCLocationOptions().join();
                posItem2.value = useEvalStore().getPosSelection(groupID)[1];
            }
        }

        const runTypeSelect = document.getElementById(input_b + input_runtype) as HTMLInputElement;
        if (runTypeSelect) {
            runTypeSelect.disabled = runTypeSelectDisabled;
        }
    }
}

// ajdust 'specific' action according to selected 'base' action
function changeRunnerBaseAction(group: string) {
    const runnerBaseAction = document.getElementById(group + input_base_action) as HTMLInputElement;
    const actionOptions = renderRunnerSpecificActionOptions(runnerBaseAction.value, group);
    const specificActionDisabled = actionOptions.length < 1;;

    const specificAction = document.getElementById(group + input_spec_action) as HTMLInputElement;
    specificAction.innerHTML = actionOptions.join();
    specificAction.disabled = specificActionDisabled;
    
    changeRunnerSpecificAction(group);
}

// adjust 'involved' inputs according to selected 'specific' action
function changeRunnerSpecificAction(group: string) {
    let throwing = false;
    let minPosItems = 1;
    let targetPosItems = 1;
    let maxPosItems = 4;
    
    const runnerSpecificAction = document.getElementById(group + input_spec_action) as HTMLInputElement;
    const runnerSpecificActionValue = runnerSpecificAction.value;
    switch (runnerSpecificActionValue) {
        case 'ADV':
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
        case 'NADV':
            minPosItems = targetPosItems = maxPosItems = 0;
            break;
        case 'O/':
        case 'POE':
        case 'ob':
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
        case 'et':
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

    useEvalStore().minPosItems.push({inputGroup: input_b, limit: minPosItems})
    useEvalStore().targetPosItems.push({inputGroup: input_b, limit: targetPosItems})
    useEvalStore().maxPosItems.push({inputGroup: input_b, limit: maxPosItems})
    
    const groupID = group + input_position;
    
    const container = document.getElementById(groupID);
    if (container) {

        const addItemButton = document.getElementById(groupID + input_add) as HTMLInputElement;
        const removeItemButton = document.getElementById(groupID + input_remove) as HTMLInputElement;
        
        let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
        while (itemsCreated > 0) {
            const posItemN = document.getElementById(groupID + itemsCreated); 
            if (posItemN) {
                container.removeChild(posItemN);
                itemsCreated -= 1;
            }
        }
        
        while (itemsCreated < targetPosItems) {
            itemsCreated += 1;
            const posItemN = getPosSelectionSelect(group, itemsCreated);
            container.insertBefore(posItemN, addItemButton);
        }
        
        addItemButton.disabled = itemsCreated >= maxPosItems;
        removeItemButton.disabled = itemsCreated <= minPosItems;
        
        if (throwing === true) {
            const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement;
            posItem2.innerHTML = renderFCLocationOptions().join();
            posItem2.value = useEvalStore().getPosSelection(groupID)[1];
        }
    }
}

// allows to select run type when home base is selected
function changeBase(group: string) {
    const baseSelect = document.getElementById(group + input_base) as HTMLInputElement;
    const baseSelectValue = baseSelect.value;
    
    const runTypeSelect = document.getElementById(group + input_runtype) as HTMLInputElement;
    runTypeSelect.disabled = baseSelectValue !== '4';
}

// enhance user's input with output instructions
function processInput(input: WBSCInput, batter: string, origBase: number) {
    const output: WBSCOutput = {}
    output.origBase = origBase;
    output.player = batter;
    output.base = parseInt(input.base ? input.base : '-1');
    output.run = input.runtype;
    output.out = false;
    output.hit = false;
    output.na = false;
    output.errorTarget = null;
    output.text1 = ''; // to avoid undefined refference later
    
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
    
    let possibleConcurrentPlay = false;
    const action = input[input_spec_action];
    switch (action) {
        case 'EDFB':
            input[output_base] = 0;
            input[output_text_1] = 'E' + pos + ' DF';
            input[output_na] = true;
            break;
        case 'KST':
        case 'KLT':
            input[output_text_2] = pos;
        case 'KS':
        case 'KL':
            input[output_base] = 0;
            input[output_text_1] = action.substring(0, 2);
            input[output_sub] = '1';
            input[output_out] = true;
            possibleConcurrentPlay = true;
            break;
        case 'F':
        case 'P':
        case 'L':
        case 'FF':
        case 'FP':
        case 'FL':
        case 'IF':
        case 'SF':
            input[output_base] = 0;
            input[output_text_1] = action + pos;
            input[output_out] = true;
            break;
        case 'FB':
        case 'FFB':
            let pref = 'F';
            if (action.includes('FF')) {
                pref += 'F';
            }
            input[output_text_1] = pref + pos + 'B';
            input[output_base] = 0;
            input[output_out] = true;
            break;
        case 'GDP':
        case 'SH':
        case 'FSF':
            input[output_text_2] = pos;
        case 'LT':
            input[output_base] = 0;
            input[output_text_1] = action;
            input[output_out] = true;
            break;
        case 'OBR1_':
        case 'OBR2_':
        case 'OBR3_':
        case 'OBR4_':
        case 'OBR6_':
            input[output_base] = 0;
            input[output_text_1] = 'OBR';
            if (action.includes('2')) {
                input[output_text_2] = 'KS';
                input[output_sub] = '1';
            } else {
                input[output_text_2] = '2';
            }
            input[output_out] = true;
            input[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case 'OBR5_':    
        case 'OBR8_':
        case 'OBR14_':
            input[output_base] = 0;
            input[output_text_1] = 'OBR';
            if (pos === '') {
                input[output_text_2] = '2';
            } else {
                input[output_text_2] = pos;
            }
            input[output_out] = true;
            input[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case '1B':
        case '1BB':
            input[output_text_1] = pos;
            if (action.endsWith('BB')) {
                input[output_text_1] += 'B';
            }
            input[output_hit] = true;
            break;
        case 'O':
            input[output_text_1] = action + pos;
            break;
        case 'FC':
            input[output_text_1] = action;
            input[output_text_2] = pos;
            break;
        case 'KSWP':
        case 'KSPB':
        case 'KLWP':
        case 'KLPB':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = action.substring(2);
            input[output_sub] = '1';
            possibleConcurrentPlay = true;
            break;
        case 'KSO':    
        case 'KLO':
            input[output_sub] = '1';
            possibleConcurrentPlay = true;
        case 'SHFC':
        case 'SFO':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = action.substring(2) + pos;
            break;
        case 'KSET':
        case 'KSE':
        case 'KLET':
        case 'KLE':
            input[output_sub] = '1';
            possibleConcurrentPlay = true;
        case 'SHE':
        case 'SHET':
        case 'SHEF':
        case 'SFE':
        case 'SFO':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (action.length > 3) {
                input[output_text_2] += action.substring(3);
            }
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            break;
        case 'INT':
            input[output_text_1] = action;
            break;
        case '2B':
        case '2BG':
            input[output_base] = 2;
            input[output_text_1] = pos;
            if (action.endsWith('G')) {
                input[output_text_2] = 'GR';
            }
            input[output_hit] = true;
            break;
        case '3B':
            input[output_base] = 3;
            input[output_text_1] = pos;
            input[output_hit] = true;
            break;
        case 'HR':
        case 'IHR':
            input[output_base] = 4;
            input[output_text_1] = action;
            input[output_text_2] = pos;
            input[output_hit] = true;
            break;
        case 'BB1':
        case 'IBB1':
            input[output_sub] = '1';
        case 'HP':
            if (action.length > 2) {
                input[output_text_1] = action.substring(0, action.length - 1);
            } else {
                input[output_text_1] = action;
            }
            possibleConcurrentPlay = true;
            break;
        case 'WP':
        case 'PB':
        case 'SB':
            possibleConcurrentPlay = true;
        case 'wp':
        case 'pb':
        case 'BK':
        case 'bk':
        case 'IP':
        case 'ip':
            input[output_text_1] = action + '#b#';
            break;
        case 'ADV':
            input[output_text_1] = '#b#';
            break;
        case 'se0':
            input[output_text_1] = '(' + '#b#' + ')' ;
            break;
        case 'se1':
            battingOrder = 1;
            battingOrder += document.getElementById(input_r2) !== null ? 1 : 0;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            input[output_text_1] = '(' + battingOrder + ')' ;
            break;
        case 'se2':
            battingOrder = 1;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            input[output_text_1] = '(' + battingOrder + ')' ;
        case 'se3':
            input[output_text_1] = '(1)' ;
            break;
        case 'GO':
        case 'GOB':
        case 'A':
            if (input[output_base] === 1) {
                input[output_base] = 0; 
            }
            input[output_text_1] = pos;
            if (action.startsWith('A')) {
                input[output_text_1] = 'A' + pos;
            } else if (action.endsWith('B')) {
                input[output_text_1] += 'B';
            }
            input[output_out] = true;
            break;
        case 'O/':
            input[output_num] = true;
            possibleConcurrentPlay = true;
        case 'T':
        case 'OB':
        case 'ob':
            input[output_text_1] = action + pos;
            break;
        case 'CSO':
        case 'PO':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = pos;
            input[output_out] = true;
            input[output_num] = true;
            possibleConcurrentPlay = true;
            break;
        case 'CSN':
        case 'CSNT':
            input[output_na] = true;
            input[output_base] -= 1;
        case 'CSE':
        case 'CSET':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = pos.substring(0, pos.length - 1) + 'E' + pos.substring(pos.length - 1);
            if (action.endsWith('T')) {
                input[output_text_2] += 'T';
            }
            input[output_num] = true;
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            possibleConcurrentPlay = true;
            break;
        case 'POE':
            input[output_text_1] = action.substring(0, 2);
            input[output_text_2] = 'e' + pos + 'T';
            input[output_num] = true;
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            possibleConcurrentPlay = true;
            break;
        case 'OBR7_':
        case 'OBR9_':
        case 'OBR10_':
        case 'OBR11_':
        case 'OBR12_':
        case 'OBR13_':
        case 'OBR15_':
            input[output_text_1] = 'OBR';
            if (action.includes('7')) {
                input[output_text_2] = '2';
            } else {
                input[output_text_2] = pos;
            }
            input[output_out] = true;
            input[output_sup] = action.substring(3, action.indexOf('_'));
            break;
        case 'ENT':
        case 'ENF':
                input[output_na] = true;
                input[output_base] -= 1;
        case 'EF':
        case 'ET':
        case 'EM':
        case 'eF':
        case 'et':
            input[output_text_1] = pos.substring(0, pos.length - 1) + action.substring(0, 1) + pos.substring(pos.length - 1);
            if (!action.endsWith('F')) {
                input[output_text_1] += action.substring(action.length - 1);
            }
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            break;
        case 'EDF':
        case 'EDL':
        case 'EDP':
            input[output_text_1] = pos.substring(0, pos.length - 1) + "E" + pos.substring(pos.length - 1) + action.substring(action.length - 1);
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            break;
        case 'GDPE':
            input[output_text_1] = "GDP";
            input[output_text_2] = pos.substring(0, pos.length - 1) + "E" + pos.substring(pos.length - 1);          
            input[output_errorTarget] = input[output_base];
            input[output_base] = input[output_origBase] + 1;
            break;
        case 'NADV':
            input[output_text_1] = "*";
            input[output_base] -= 1;
            break;
    }

    if (possibleConcurrentPlay) {
        let notAddedYet = true;
        for (let i = 0; i < window.concurrentPlays.length; i += 1) {
            if (window.concurrentPlays[i].batter === batter) {
                notAddedYet = false;
                break;
            }
        }
        if (notAddedYet) {
            window.concurrentPlays.push({batter:batter, base:input[output_base], out:input[output_out], na:input[output_na]});
        }
    }
}

export {
    changeBaseAction, changeSpecificAction, changeBase, processInput
}