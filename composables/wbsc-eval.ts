/* *************************************** */
/* wbsc-eval.js                            */
/* CORE file with input evaluation methods */
/* *************************************** */

import { useEvalStore } from './useEvalStore';
import { WBSCInput, WBSCOutput } from './useInputStore';

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
    
    useEvalStore().setMinPosItems(input_b, minPosItems);
    useEvalStore().setTargetPosItems(input_b, targetPosItems);
    useEvalStore().setMaxPosItems(input_b, maxPosItems);
    
    const groupID = input_b + input_position;
    
    const container = document.getElementById(groupID) as HTMLElement;
    const addItemButton = document.getElementById(groupID + input_add) as HTMLInputElement;
    const removeItemButton = document.getElementById(groupID + input_remove) as HTMLInputElement;

    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    while (itemsCreated > 0) {
        const posItemN = document.getElementById(groupID + itemsCreated) as HTMLElement;
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
        const posItem1 = document.getElementById(groupID + '1') as HTMLInputElement;
        posItem1.innerHTML = renderHitLocationOptions().join();
        
        const posSelection = useEvalStore().getPosSelection(groupID)
        if (isNaN(Number(posSelection[0]))) {
            posItem1.value = posSelection;
        } else {
            posItem1.value = posSelection[0];
        }
    }
    
    if (fc === true) {
        const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement;
        posItem2.innerHTML = renderFCLocationOptions().join();
        posItem2.value = useEvalStore().getPosSelection(groupID)[1];
    }

    const runTypeSelect = document.getElementById(input_b + input_runtype) as HTMLInputElement;
    runTypeSelect.disabled = runTypeSelectDisabled;
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
    
    useEvalStore().setMinPosItems(input_b, minPosItems);
    useEvalStore().setTargetPosItems(input_b, targetPosItems);
    useEvalStore().setMaxPosItems(input_b, maxPosItems);
    
    const groupID = group + input_position;
    
    const container = document.getElementById(groupID) as HTMLElement;
    const addItemButton = document.getElementById(groupID + input_add) as HTMLInputElement;
    const removeItemButton = document.getElementById(groupID + input_remove) as HTMLInputElement;
    
    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    while (itemsCreated > 0) {
        const posItemN = document.getElementById(groupID + itemsCreated) as HTMLElement; 
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
        const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement;
        posItem2.innerHTML = renderFCLocationOptions().join();
        posItem2.value = useEvalStore().getPosSelection(groupID)[1];
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
function processInput(input: WBSCInput, batter: number, origBase: number): WBSCOutput {
    const output: WBSCOutput = getEmptyOutput();
    output.batter = batter;
    output.origBase = origBase;
    output.base = input.base;
    output.run = input.runtype;
    output.errorTarget = input.base;
    
    let pos = input.pos;
    if (pos) {
        const lastPos = pos[pos.length - 1];
        if (lastPos === 'X') {
            pos = pos.substring(0, pos.length - 1) + '4';
        } else if (lastPos === 'Y') {
            pos = pos.substring(0, pos.length - 1) + '5';
        } else if (lastPos === 'Z') {
            pos = pos.substring(0, pos.length - 1) + '2';
        }
    } else {
        pos = ''
    }
    
    let possibleConcurrentPlay = false;
    const action = input.specAction;
    switch (action) {
        case 'EDFB':
            output.base = 0;
            output.text1 = 'E' + pos + ' DF';
            output.na = true;
            break;
        case 'KST':
        case 'KLT':
            output.text2 = pos;
        case 'KS':
        case 'KL':
            output.base = 0;
            output.text1 = action.substring(0, 2);
            output.sub = '1';
            output.out = true;
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
            output.base = 0;
            output.text1 = action + pos;
            output.out = true;
            break;
        case 'FB':
        case 'FFB':
            let pref = 'F';
            if (action.includes('FF')) {
                pref += 'F';
            }
            output.text1 = pref + pos + 'B';
            output.base = 0;
            output.out = true;
            break;
        case 'GDP':
        case 'SH':
        case 'FSF':
            output.text2 = pos;
        case 'LT':
            output.base = 0;
            output.text1 = action;
            output.out = true;
            break;
        case 'OBR1_':
        case 'OBR2_':
        case 'OBR3_':
        case 'OBR4_':
        case 'OBR6_':
            output.base = 0;
            output.text1 = 'OBR';
            if (action.includes('2')) {
                output.text2 = 'KS';
                output.sub = '1';
            } else {
                output.text2 = '2';
            }
            output.out = true;
            output.sup = action.substring(3, action.indexOf('_'));
            break;
        case 'OBR5_':    
        case 'OBR8_':
        case 'OBR14_':
            output.base = 0;
            output.text1 = 'OBR';
            if (pos === '') {
                output.text2 = '2';
            } else {
                output.text2 = pos;
            }
            output.out = true;
            output.sup = action.substring(3, action.indexOf('_'));
            break;
        case '1B':
        case '1BB':
            output.text1 = pos;
            if (action.endsWith('BB')) {
                output.text1 += 'B';
            }
            output.hit = true;
            break;
        case 'O':
            output.text1 = action + pos;
            break;
        case 'FC':
            output.text1 = action;
            output.text2 = pos;
            break;
        case 'KSWP':
        case 'KSPB':
        case 'KLWP':
        case 'KLPB':
            output.text1 = action.substring(0, 2);
            output.text2 = action.substring(2);
            output.sub = '1';
            possibleConcurrentPlay = true;
            break;
        case 'KSO':    
        case 'KLO':
            output.sub = '1';
            possibleConcurrentPlay = true;
        case 'SHFC':
        case 'SFO':
            output.text1 = action.substring(0, 2);
            output.text2 = action.substring(2) + pos;
            break;
        case 'KSET':
        case 'KSE':
        case 'KLET':
        case 'KLE':
            output.sub = '1';
            possibleConcurrentPlay = true;
        case 'SHE':
        case 'SHET':
        case 'SHEF':
        case 'SFE':
            output.text1 = action.substring(0, 2);
            output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1);
            if (action.length > 3) {
                output.text2 += action.substring(3);
            }
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            break;
        case 'INT':
            output.text1 = action;
            break;
        case '2B':
        case '2BG':
            output.base = 2;
            output.text1 = pos;
            if (action.endsWith('G')) {
                output.text2 = 'GR';
            }
            output.hit = true;
            break;
        case '3B':
            output.base = 3;
            output.text1 = pos;
            output.hit = true;
            break;
        case 'HR':
        case 'IHR':
            output.base = 4;
            output.text1 = action;
            output.text2 = pos;
            output.hit = true;
            break;
        case 'BB1':
        case 'IBB1':
            output.sub = '1';
        case 'HP':
            if (action.length > 2) {
                output.text1 = action.substring(0, action.length - 1);
            } else {
                output.text1 = action;
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
            output.text1 = action + '#b#';
            break;
        case 'ADV':
            output.text1 = '#b#';
            break;
        case 'se0':
            output.text1 = '(' + '#b#' + ')' ;
            break;
        case 'se1':
            let battingOrder = 1;
            battingOrder += document.getElementById(input_r2) !== null ? 1 : 0;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            output.text1 = '(' + battingOrder + ')' ;
            break;
        case 'se2':
            battingOrder = 1;
            battingOrder += document.getElementById(input_r3) !== null ? 1 : 0;
            output.text1 = '(' + battingOrder + ')' ;
        case 'se3':
            output.text1 = '(1)' ;
            break;
        case 'GO':
        case 'GOB':
        case 'A':
            if (output.base === 1) {
                output.base = 0; 
            }
            output.text1 = pos;
            if (action.startsWith('A')) {
                output.text1 = 'A' + pos;
            } else if (action.endsWith('B')) {
                output.text1 += 'B';
            }
            output.out = true;
            break;
        case 'O/':
            output.num = true;
            possibleConcurrentPlay = true;
        case 'T':
        case 'OB':
        case 'ob':
            output.text1 = action + pos;
            break;
        case 'CSO':
        case 'PO':
            output.text1 = action.substring(0, 2);
            output.text2 = pos;
            output.out = true;
            output.num = true;
            possibleConcurrentPlay = true;
            break;
        case 'CSN':
        case 'CSNT':
            output.na = true;
            if (output.base) {
                output.base -= 1;
            }
        case 'CSE':
        case 'CSET':
            output.text1 = action.substring(0, 2);
            output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1);
            if (action.endsWith('T')) {
                output.text2 += 'T';
            }
            output.num = true;
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            possibleConcurrentPlay = true;
            break;
        case 'POE':
            output.text1 = action.substring(0, 2);
            output.text2 = 'e' + pos + 'T';
            output.num = true;
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            possibleConcurrentPlay = true;
            break;
        case 'OBR7_':
        case 'OBR9_':
        case 'OBR10_':
        case 'OBR11_':
        case 'OBR12_':
        case 'OBR13_':
        case 'OBR15_':
            output.text1 = 'OBR';
            if (action.includes('7')) {
                output.text2 = '2';
            } else {
                output.text2 = pos;
            }
            output.out = true;
            output.sup = action.substring(3, action.indexOf('_'));
            break;
        case 'ENT':
        case 'ENF':
                output.na = true;
                if (output.base) {
                    output.base -= 1;
                }
        case 'EF':
        case 'ET':
        case 'EM':
        case 'eF':
        case 'et':
            output.text1 = pos?.substring(0, pos.length - 1) + action.substring(0, 1) + pos?.substring(pos.length - 1);
            if (!action.endsWith('F')) {
                output.text1 += action.substring(action.length - 1);
            }
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            break;
        case 'EDF':
        case 'EDL':
        case 'EDP':
            output.text1 = pos?.substring(0, pos.length - 1) + "E" + pos?.substring(pos.length - 1) + action.substring(action.length - 1);
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            break;
        case 'GDPE':
            output.text1 = "GDP";
            output.text2 = pos?.substring(0, pos.length - 1) + "E" + pos?.substring(pos.length - 1);          
            output.errorTarget = output.base;
            output.base = output.origBase + 1;
            break;
        case 'NADV':
            output.text1 = "*";
            if (output.base) {
                output.base -= 1;
            }
            break;
    }

    if (possibleConcurrentPlay) {
        let notAddedYet = true;
        const concurrentPlays = useEvalStore().concurrentPlays;
        for (let i = 0; i < concurrentPlays.length; i += 1) {
            if (concurrentPlays[i].batter === batter) {
                notAddedYet = false;
                break;
            }
        }
        if (notAddedYet) {
            concurrentPlays.push({...output});
        }
    }

    return output;
}

export {
    changeBaseAction, changeSpecificAction, changeBase, processInput
}