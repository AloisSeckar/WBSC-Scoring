/* *************************************** */
/* wbsc-input.js                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

// create bar with action buttons
function renderActionButtons() {
    const actionButtonsContainer = document.createElement('div');
    actionButtonsContainer.setAttribute('id', div_tools);
    actionButtonsContainer.setAttribute('class', 'wbsc-buttons');
    
    const renderBatterButton = renderInputsButton(input_b, null);
    actionButtonsContainer.appendChild(renderBatterButton);
    
    const renderRunner1Button = renderInputsButton(input_r1, null);
    actionButtonsContainer.appendChild(renderRunner1Button);
    
    const renderRunner2Button = renderInputsButton(input_r2, null);
    actionButtonsContainer.appendChild(renderRunner2Button);
    
    const renderRunner3Button = renderInputsButton(input_r3, null);
    actionButtonsContainer.appendChild(renderRunner3Button);
    
    actionButtonsContainer.appendChild(document.createElement('br'));
    
    const generateButton = renderInputsButton(input_generate, null);
    generateButton.setAttribute('class', 'btn btn-primary wbsc-action-button');
    actionButtonsContainer.appendChild(generateButton);
    
    const clearButton = renderInputsButton(input_clear, null);
    clearButton.setAttribute('class', 'btn btn-primary wbsc-clear-button');
    actionButtonsContainer.appendChild(clearButton);
    
    const container = document.getElementById(div_input);
    container.appendChild(actionButtonsContainer);
}

// create action button
//   group - new element's DOM id
//   parentDiv - null for buttons on action bar
//             - inputs group for button to add/remove additional inputs for consecutive actions 
function renderInputsButton(group, parentDiv) {
    const renderButton = document.createElement('button');
    renderButton.setAttribute('id', 'button-' + group);
    renderButton.setAttribute('type', 'button');
    renderButton.setAttribute('class', 'btn btn-info wbsc-render-button');
    renderButton.addEventListener('click', function(){
        switch (group) {
            case input_generate:
                processAction();
                break;
            case input_clear:
                clearInputs();
                break;
            default:
                renderInputs(group, parentDiv);
        }
    });
    renderButton.innerHTML = getLabelForRenderButton(group, true);
    
    return renderButton;
}

// clear all user inputs and reset default state
function clearInputs() {
    hideInputs(input_b);
    hideInputs(input_r1);
    hideInputs(input_r2);
    hideInputs(input_r3);
    
    showInputs(input_b);
    
    window.posSelection = [];
}

// show or hide given input group
//   group - DOM id of encapsulating div
//   parentDiv - ancestor of encapsulating div in DOM hieararchy
function renderInputs(group, parentDiv) {
    const renderButton = document.getElementById('button-' + group);
    if (renderButton.innerHTML.includes('+')) {
        showInputs(group, parentDiv);
    } else {
        hideInputs(group);
    }
}

// show given input group
// fuction renders all required inputs and places them into new div
//   group - DOM id of encapsulating div
//   parentDiv - ancestor of encapsulating div in DOM hieararchy
function showInputs(group, parentDiv) {
    const inputsContainer = document.createElement('div');
    inputsContainer.setAttribute('id', group);
    
    if (parentDiv === null || parentDiv === undefined) {
        inputsContainer.setAttribute('class', class_wbsc);
        
        const container = document.getElementById(div_input);
        const hook = getProperLocationForInputs(group);
        container.insertBefore(inputsContainer, hook);
    } else {
        const parentDiv = getParentDiv(group, true);
        const container = document.getElementById(parentDiv);
        container.appendChild(inputsContainer);
    }
    
    if (parentDiv === null || parentDiv === undefined) {
        const batterLabel = document.createElement('label');
        batterLabel.innerHTML = getLabelForInputGroup(group);
        inputsContainer.appendChild(batterLabel);
        inputsContainer.appendChild(document.createElement('br'));
    }
    
    if (group !== input_b) {
        renderBaseSelection(group);
    } else {
        const runTypeLabel = document.createElement('label');
        runTypeLabel.innerHTML = 'Run:';
        inputsContainer.appendChild(runTypeLabel);

        const runTypeSelect = document.createElement('select');
        runTypeSelect.setAttribute('id', input_b + input_runtype);
        runTypeSelect.innerHTML = renderRunTypeOptions();
        runTypeSelect.disabled = true;
        inputsContainer.appendChild(runTypeSelect);
        inputsContainer.appendChild(document.createElement('br'));
    }
    
    const actionLabel = document.createElement('label');
    actionLabel.innerHTML = 'Action:';
    inputsContainer.appendChild(actionLabel);
    
    const baseActionSelect = document.createElement('select');
    baseActionSelect.setAttribute('id', group + input_base_action);
    baseActionSelect.setAttribute('class', 'wbsc-base-action-select');
    baseActionSelect.addEventListener('click', function(){
        changeBaseAction(group);
    });
    switch (group) {
        case input_b:
            baseActionSelect.innerHTML = renderBatterActionOptions();
            break;
        case input_b1:
        case input_b2:
        case input_b3:
            baseActionSelect.innerHTML = renderBatterRunnerActionOptions();
            break;
        case input_r1:
        case input_r1a:
        case input_r1b:
        case input_r2:
        case input_r2a:
        case input_r3:
            baseActionSelect.innerHTML = renderRunnerActionOptions();
            break;
    }
    inputsContainer.appendChild(baseActionSelect);

    inputsContainer.appendChild((document.createElement('br')));
    
    const specActionLabel = document.createElement('label');
    specActionLabel.innerHTML = 'Spec:';
    inputsContainer.appendChild(specActionLabel);
    
    const specificActionSelect = document.createElement('select');
    specificActionSelect.setAttribute('id', group + input_spec_action);
    specificActionSelect.setAttribute('class', 'wbsc-specific-action-select');
    specificActionSelect.addEventListener('click', function(){
        changeSpecificAction(group);
    });
    specificActionSelect.innerHTML = '<option class="blank" />';
    specificActionSelect.disabled = true;
    inputsContainer.appendChild(specificActionSelect);
    
    renderPosSelection(group);
    
    const additionalInputsGroup = getAdditionalInputsGroup(group);
    if (additionalInputsGroup !== null) {
        const renderExtraButton = renderInputsButton(additionalInputsGroup, inputsContainer);
        inputsContainer.appendChild(renderExtraButton);
        inputsContainer.appendChild(document.createElement('br'));
    }
    
    const renderButton = document.getElementById('button-' + group);
    renderButton.setAttribute('class', 'btn btn-info ' + class_wbsc_b_unrender);
    renderButton.innerHTML = getLabelForRenderButton(group, false);
    
    disableParentExtraInput(group, true);
}

// hide given input group
// function removes div with all contents from document
//   group - DOM id of encapsulating div
function hideInputs(group) {
    const parentDiv = getParentDiv(group, false);
    const container = document.getElementById(parentDiv);
    const inputsContainer = document.getElementById(group);
    if (inputsContainer !== null) {
        container.removeChild(inputsContainer);
    }
    
    const renderButton = document.getElementById('button-' + group);
    renderButton.setAttribute('class', 'btn btn-info ' + class_wbsc_b_render);
    renderButton.innerHTML = getLabelForRenderButton(group, true);
    
    disableParentExtraInput(group, false);
}

// render select with target base where the action happened
// + possible TIE checker
// inside given input group
function renderBaseSelection(group) {
    const inputsContainer = document.getElementById(group);
    
    if (group === input_r1 || group === input_r2) {
        const baseTIECheck = document.createElement('input');
        baseTIECheck.type = 'checkbox';
        baseTIECheck.setAttribute('class', 'wbsc-select');
        baseTIECheck.setAttribute('id', group + input_tie);
        inputsContainer.appendChild(baseTIECheck);
        
        const baseTIELabel = document.createElement('label');
        if (group === input_r1) {
            baseTIELabel.innerHTML = 'Tiebreak (baseball)';
        } else {
            baseTIELabel.innerHTML = 'Tiebreak (baseball/softball)';
        }
        inputsContainer.appendChild(baseTIELabel);
        
        inputsContainer.appendChild(document.createElement('br'));
    }
    
    const baseLabel = document.createElement('label');
    baseLabel.innerHTML = 'Base:';
    inputsContainer.appendChild(baseLabel);
    
    let runTypeSelectDisabled = true;
    const baseSelect = document.createElement('select');
    baseSelect.setAttribute('id', group + input_base);
    switch (group) {
        case input_b1:
        case input_r1:
            baseSelect.innerHTML = renderBaseOptions(1);
            break;
        case input_b2:
        case input_r1a:
        case input_r2:
            baseSelect.innerHTML = renderBaseOptions(2);
            break;
        case input_b3:
        case input_r1b:
        case input_r2a:
        case input_r3:
            baseSelect.innerHTML = renderBaseOptions(3);
            runTypeSelectDisabled = false;
            break;
    }
    baseSelect.addEventListener('click', function(){
        changeBase(group);
    });
    inputsContainer.appendChild(baseSelect);

    const runTypeLabel = document.createElement('label');
    runTypeLabel.innerHTML = '&nbsp;Run:';
    inputsContainer.appendChild(runTypeLabel);

    const runTypeSelect = document.createElement('select');
    runTypeSelect.setAttribute('id', group + input_runtype);
    runTypeSelect.innerHTML = renderRunTypeOptions();
    runTypeSelect.disabled = runTypeSelectDisabled;
    inputsContainer.appendChild(runTypeSelect);
    
    inputsContainer.appendChild(document.createElement('br'));
}

// render selects and buttons to adjust involved players/positions
// inside given input group
function renderPosSelection(group) {
    const groupID = group + input_position;
    
    const inputsContainer = document.createElement('div');
    inputsContainer.setAttribute('id', groupID);
    
    const involvedLabel = document.createElement('label');
    involvedLabel.innerHTML = 'Involved:';
    inputsContainer.appendChild(involvedLabel);
    
    const addItemButton = document.createElement('button');
    addItemButton.setAttribute('id', groupID + input_add);
    addItemButton.setAttribute('type', 'button');
    addItemButton.setAttribute('class', 'btn btn-sm btn-info wbsc-small-button ' + class_wbsc_b_render);
    addItemButton.addEventListener('click', function(){
        renderPosSelectItem(group);
    });
    addItemButton.disabled = true;
    addItemButton.innerHTML = '+P';
    inputsContainer.appendChild(addItemButton);
    
    const removeItemButton = document.createElement('button');
    removeItemButton.setAttribute('id', groupID + input_remove);
    removeItemButton.setAttribute('type', 'button');
    removeItemButton.setAttribute('class', 'btn btn-sm btn-info wbsc-small-button ' + class_wbsc_b_unrender);
    removeItemButton.addEventListener('click', function(){
        unRenderPosSelectItem(group);
    });
    removeItemButton.disabled = true;
    removeItemButton.innerHTML = '-P';
    inputsContainer.appendChild(removeItemButton);
    
    const container = document.getElementById(group);
    container.appendChild(document.createElement('br'));
    container.appendChild(inputsContainer);
}

// render one new select for players/locations inside given group
// select is added at the end if possible
function renderPosSelectItem(group) {
    const groupID = group + input_position;
    const container = document.getElementById(groupID);
    const renderButton = document.getElementById(groupID + input_add);
    const unRenderButton = document.getElementById(groupID + input_remove);
    
    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    if (itemsCreated < maxPosItems[group]) {
        itemsCreated += 1;
        const posItemN = getPosSelectionSelect(group, itemsCreated);        
        container.insertBefore(posItemN, renderButton);
    }
    
    renderButton.disabled = itemsCreated >= maxPosItems[group];
    unRenderButton.disabled = itemsCreated <= minPosItems[group];
}

// removes one select for players/locations from given group
// select is removed from the end if possible
function unRenderPosSelectItem(group) {
    const groupID = group + input_position;
    const container = document.getElementById(groupID);
    const renderButton = document.getElementById(groupID + input_add);
    const unRenderButton = document.getElementById(groupID + input_remove);
    
    let itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
    if (itemsCreated > minPosItems[group]) {
        const posItemN = document.getElementById(groupID + itemsCreated);    
        container.removeChild(posItemN);    
        itemsCreated--;
    }
    
    renderButton.disabled = itemsCreated >= maxPosItems[group];
    unRenderButton.disabled = itemsCreated <= minPosItems[group];
}

// physically creates new select for players/locations
//   group - target inputs group
//   ord - position inside the group
function getPosSelectionSelect(group, ord) {
    const groupID = group + input_position;
    
    const posItem = document.createElement('select');
    posItem.setAttribute('id', groupID + ord);
    posItem.setAttribute('class', class_wbsc_pos);
    posItem.innerHTML = renderPlayerOptions();
    
    if (posSelection[groupID]) {
        posItem.value = posSelection[groupID][ord - 1];
    }
    
    posItem.addEventListener('change', function() {
        getPosSelection(group);
    });
    
    return posItem;
}

// when there is more input groups for consecutive actions for one base
// (possible only for B or R1), only the last group can be removed
// therefore other removal buttons have to be disabled when new input group is added
//   group - target inputs group
//   disable - state of the button (true for 'disabled')
function disableParentExtraInput(group, disable) {
    let parentExtraButtonId = null;
    switch (group) {
        case input_b2:
            parentExtraButtonId = input_b1;
            break;
        case input_b3:
            parentExtraButtonId = input_b2;
            break;
        case input_r1b:
            parentExtraButtonId = input_r1a;
            break;
    }
    if (parentExtraButtonId !== null) {
        const parentExtraButton = document.getElementById('button-' + parentExtraButtonId);
        parentExtraButton.disabled = disable;
    }
}

// find encapsulating div when showing/hiding input groups
//   group - given input group
//   show - triggering action (showing or hiding)
function getParentDiv(group, show) {
    let parentDiv;
    switch (group) {
        case input_b1:
        case input_b2:
        case input_b3:
            parentDiv = input_b;
            break;
        case input_r1a:
        case input_r1b:
            parentDiv = input_r1;
            break;
        case input_r2a:
            parentDiv = input_r2;
            break;
        default:
            parentDiv = show ? group : div_input;
    }
    return parentDiv;
}

// find the next available input subgroup for consecutive actions
//   group - given input group
function getAdditionalInputsGroup(group) {
    let additionalInputsGroup;
    switch (group) {
        case input_b:
            additionalInputsGroup = input_b1;
            break;
        case input_b1:
            additionalInputsGroup = input_b2;
            break;
        case input_b2:
            additionalInputsGroup = input_b3;
            break;
        case input_r1:
            additionalInputsGroup = input_r1a;
            break;
        case input_r1a:
            additionalInputsGroup = input_r1b;
            break;
        case input_r2:
            additionalInputsGroup = input_r2a;
            break;
        default:
            additionalInputsGroup = null;
    }
    return additionalInputsGroup;
}

// helps maintaining correct order of input groups (HP - 1B - 2B - 3B)
function getProperLocationForInputs(group) {
    let hook = document.getElementById(div_tools);
    
    const r1inputs = document.getElementById(input_r1);
    const r2inputs = document.getElementById(input_r2);
    const r3inputs = document.getElementById(input_r3);
    
    switch (group) {
        case input_b:
        case input_b1:
        case input_b2:
        case input_b3:
            if (r1inputs !== null) {
                hook = r1inputs;
            } else if (r2inputs !== null) {
                hook = r2inputs;
            } else if (r3inputs !== null) {
                hook = r3inputs;
            }
            break;
        case input_r1:
        case input_r1a:
        case input_r1b:
            if (r2inputs !== null) {
                hook = r2inputs;
            } else if (r3inputs !== null) {
                hook = r3inputs;
            }
            break;
        case input_r2:
        case input_r2a:
            if (r3inputs !== null) {
                hook = r3inputs;
            }
            break;
    }
    
    return hook;
}