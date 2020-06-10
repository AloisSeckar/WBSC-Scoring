function renderActionButtons() {
	var actionButtonsContainer = document.createElement("div");
	actionButtonsContainer.setAttribute('id', div_tools);
	actionButtonsContainer.setAttribute('class', "wbsc-buttons");
	
	var generateButton = document.createElement("button");
	generateButton.setAttribute('id', "generate-button");
	generateButton.setAttribute('type', "button");
	generateButton.setAttribute('class', "btn btn-primary wbsc-action-button");
	generateButton.setAttribute('onclick', "renderAction()");
	generateButton.innerHTML = "Generate action";
	actionButtonsContainer.appendChild(generateButton);
	
	var renderBatterButton = document.createElement("button");
	renderBatterButton.setAttribute('id', "button-" + input_b);
	renderBatterButton.setAttribute('type', "button");
	renderBatterButton.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderBatterButton.addEventListener('click', function(){
		renderInputs(input_b);
	});
	renderBatterButton.innerHTML = getLabelForRenderButton(input_b, true);
	actionButtonsContainer.appendChild(renderBatterButton);
	
	var renderBRButton = document.createElement("button");
	renderBRButton.setAttribute('id', "button-" + input_br);
	renderBRButton.setAttribute('type', "button");
	renderBRButton.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderBRButton.addEventListener('click', function(){
		renderInputs(input_br);
	});
	renderBRButton.innerHTML = getLabelForRenderButton(input_br, true);
	actionButtonsContainer.appendChild(renderBRButton);
	
	var renderRunner1Button = document.createElement("button");
	renderRunner1Button.setAttribute('id', "button-" + input_r1);
	renderRunner1Button.setAttribute('type', "button");
	renderRunner1Button.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderRunner1Button.addEventListener('click', function(){
		renderInputs(input_r1);
	});
	renderRunner1Button.innerHTML = getLabelForRenderButton(input_r1, true);
	actionButtonsContainer.appendChild(renderRunner1Button);
	
	var renderRunner2Button = document.createElement("button");
	renderRunner2Button.setAttribute('id', "button-" + input_r2);
	renderRunner2Button.setAttribute('type', "button");
	renderRunner2Button.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderRunner2Button.addEventListener('click', function(){
		renderInputs(input_r2);
	});
	renderRunner2Button.innerHTML = getLabelForRenderButton(input_r2, true);
	actionButtonsContainer.appendChild(renderRunner2Button);
	
	var renderRunner3Button = document.createElement("button");
	renderRunner3Button.setAttribute('id', "button-" + input_r3);
	renderRunner3Button.setAttribute('type', "button");
	renderRunner3Button.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderRunner3Button.addEventListener('click', function(){
		renderInputs(input_r3);
	});
	renderRunner3Button.innerHTML = getLabelForRenderButton(input_r3, true);
	actionButtonsContainer.appendChild(renderRunner3Button);
	
	var clearButton = document.createElement("button");
	clearButton.setAttribute('id', "clear-button");
	clearButton.setAttribute('type', "button");
	clearButton.setAttribute('class', "btn btn-primary wbsc-clear-button");
	clearButton.setAttribute('onclick', "clearInputs()");
	clearButton.innerHTML = "Clear";
	actionButtonsContainer.appendChild(clearButton);
	
	var container = document.getElementById(div_input);
	container.appendChild(actionButtonsContainer);
}

function clearInputs() {
	hideInputs(input_b);
	hideInputs(input_br);
	hideInputs(input_r1);
	hideInputs(input_r2);
	hideInputs(input_r3);
	
	showInputs(input_b);
}

function renderInputs(group) {
	var renderButton = document.getElementById("button-" + group);
	if (renderButton.innerHTML.includes("+")) {
		showInputs(group);
	} else {
		hideInputs(group);
	}
}
	
function showInputs(group) {
	var container = document.getElementById(div_input);
	var toolbar = document.getElementById(div_tools);
	
	var inputsContainer = document.createElement("div");
	inputsContainer.setAttribute('id', group);
	inputsContainer.setAttribute('class', class_wbsc);
	
	container.insertBefore(inputsContainer, toolbar);
	
	if (group != input_br) {
		var batterLabel = document.createElement("label");
		batterLabel.innerHTML = getLabelForInputGroup(group);
		inputsContainer.appendChild(batterLabel);
		inputsContainer.appendChild(document.createElement("br"));
	}
	
	if (group != input_b) {
		renderBaseSelection(group);
	}
	
	var actionLabel = document.createElement("label");
	actionLabel.innerHTML = "Action:";
	inputsContainer.appendChild(actionLabel);
	
	var baseActionSelect = document.createElement("select");
	baseActionSelect.setAttribute('id', group + input_base_action);
	baseActionSelect.setAttribute('class', class_wbsc_action);
	baseActionSelect.addEventListener('click', function(){
		changeBaseAction(group);
	});
	switch (group) {
		case input_b:
			baseActionSelect.innerHTML = renderBatterActionOptions();
			break;
		case input_br:
			baseActionSelect.innerHTML = renderBatterRunnerActionOptions();
			break;
		case input_r1:
		case input_r2:
		case input_r3:
			baseActionSelect.innerHTML = renderRunnerActionOptions();
			break;
	}
	inputsContainer.appendChild(baseActionSelect);
	
	var specificActionSelect = document.createElement("select");
	specificActionSelect.setAttribute('id', group + input_spec_action);
	specificActionSelect.setAttribute('class', class_wbsc_action);
	specificActionSelect.addEventListener('click', function(){
		changeSpecificAction(group);
	});
	specificActionSelect.innerHTML = '<option class="blank" />';
	specificActionSelect.disabled = true;
	inputsContainer.appendChild(specificActionSelect);
	
	renderPosSelection(group);
	
	var renderButton = document.getElementById("button-" + group);
	renderButton.setAttribute('class', "btn btn-info " + class_wbsc_b_unrender);
	renderButton.innerHTML = getLabelForRenderButton(group, false);
}
	
function hideInputs(group) {
	var container = document.getElementById(div_input);
	var inputsContainer = document.getElementById(group);
	if (inputsContainer != null) {
		container.removeChild(inputsContainer);
	}
	
	var renderButton = document.getElementById("button-" + group);
	renderButton.setAttribute('class', "btn btn-info " + class_wbsc_b_render);
	renderButton.innerHTML = getLabelForRenderButton(group, true);
}

function getLabelForInputGroup(group) {
	var label = "<strong>";
	
	switch (group) {
		case input_b:
			label += "Batter";
			break;
		case input_r1:
			label += "Runner at 1st";
			break;
		case input_r2:
			label += "Runner at 2nd";
			break;
		case input_r3:
			label += "Runner at 3rd";
			break;
	}
	
	label += "</strong>";
	
	return label;
}

function getLabelForRenderButton(group, render) {
	var label = "";
	
	if (render == true) {
		label += "+";
	} else {
		label += "-";
	}
	
	switch (group) {
		case input_b:
			label += "B";
			break;
		case input_br:
			label += "BR";
			break;
		case input_r1:
			label += "R1";
			break;
		case input_r2:
			label += "R2";
			break;
		case input_r3:
			label += "R3";
			break;
	}
	
	return label;
}

function renderBaseSelection(group) {
	var inputsContainer = document.getElementById(group);
	
	var baseSelect = document.createElement("select");
	baseSelect.setAttribute('id', group + input_base);
	
	var baseLabel = document.createElement("label");
	baseLabel.innerHTML = "Base:";
	inputsContainer.appendChild(baseLabel);
	
	switch (group) {
		case input_br:
		case input_r1:
			baseSelect.innerHTML = renderBaseOptions(1);
			break;
		case input_r2:
			baseSelect.innerHTML = renderBaseOptions(2);
			break;
		case input_r3:
			baseSelect.innerHTML = renderBaseOptions(3);
			break;
	}
	
	inputsContainer.appendChild(baseSelect);
	inputsContainer.appendChild(document.createElement("br"));
}

function renderPosSelection(group) {
	
	var groupID = group + input_position;
	
	var inputsContainer = document.createElement("div");
	inputsContainer.setAttribute('id', groupID);
	
	var involvedLabel = document.createElement("label");
	involvedLabel.innerHTML = "Involved:";
	inputsContainer.appendChild(involvedLabel);
	
	var posItem1 = document.createElement("select");
	posItem1.setAttribute('id', groupID + "1");
	posItem1.setAttribute('class', class_wbsc_pos);
	posItem1.innerHTML = renderPlayerOptions();
	inputsContainer.appendChild(posItem1);
	
	var addItemButton = document.createElement("button");
	addItemButton.setAttribute('id', groupID + input_add);
	addItemButton.setAttribute('type', "button");
	addItemButton.setAttribute('class', "btn btn-sm btn-info wbsc-small-button " + class_wbsc_b_render);
	addItemButton.addEventListener('click', function(){
		renderPosSelectItem(groupID);
	});
    addItemButton.disabled = true;
	addItemButton.innerHTML = "+P";
	inputsContainer.appendChild(addItemButton);
	
	var removeItemButton = document.createElement("button");
	removeItemButton.setAttribute('id', groupID + input_remove);
	removeItemButton.setAttribute('type', "button");
	removeItemButton.setAttribute('class', "btn btn-sm btn-info wbsc-small-button " + class_wbsc_b_unrender);
	removeItemButton.addEventListener('click', function(){
		unRenderPosSelectItem(groupID);
	});
    removeItemButton.disabled = true;
	removeItemButton.innerHTML = "-P";
	inputsContainer.appendChild(removeItemButton);
	
	var container = document.getElementById(group);
	container.appendChild(document.createElement("br"));
	container.appendChild(inputsContainer);
}

function renderPosSelectItem(group) {
	
	var container = document.getElementById(group);
	
	var itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
	if (itemsCreated < 5) {
		itemsCreated++;
		var posItemN = document.createElement("select");
		posItemN.setAttribute('id', group + itemsCreated);
		posItemN.setAttribute('class', class_wbsc_pos);
		posItemN.innerHTML = renderPlayerOptions();
		
		var addButton = document.getElementById(group + input_add);
		container.insertBefore(posItemN, addButton);
	} else {
		alert("Currently only situations with up to 4 assists are supported");
	}
}

function unRenderPosSelectItem(group) {
	var container = document.getElementById(group);
	
	var itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
	if (itemsCreated > 1) {
		var posItemN = document.getElementById(group + itemsCreated);
		container.removeChild(posItemN);		
	} else {
		alert("There has to be at least 1 player involved");
	}
}

function renderPlayerOptions() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="1">P</option>');
	options.push('<option value="2">C</option>');
	options.push('<option value="3">1B</option>');
	options.push('<option value="4">2B</option>');
	options.push('<option value="5">3B</option>');
	options.push('<option value="6">SS</option>');
	options.push('<option value="7">LF</option>');
	options.push('<option value="8">CF</option>');
	options.push('<option value="9">RF</option>');
	return options;
}

function renderHitLocationOptions() {
	var options = renderPlayerOptions();
	options.push('<option value="LL">LL</option>');
	options.push('<option value="LS">LS</option>');
	options.push('<option value="LC">LC</option>');
	options.push('<option value="MI">MI</option>');
	options.push('<option value="RC">RC</option>');
	options.push('<option value="RS">RS</option>');
	options.push('<option value="RL">RL</option>');
	return options;
}

function renderFCLocationOptions() {
	var options = [];
	options.push('<option value="4">2nd</option>');
	options.push('<option value="5">3rd</option>');
	options.push('<option value="2">HP</option>');
	return options;
}

function renderBaseOptions(base) {
	var options = [];
	options.push('<option value=""></option>');
	if (base < 2) {
		options.push('<option value="2">2nd</option>');
	}
	if (base < 3) {
		options.push('<option value="3">3rd</option>');
	}
	options.push('<option value="4">Home</option>');
	return options;
}

function renderBatterActionOptions() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="StrikeOut">Strike out</option>');
	options.push('<option value="GroundOut">Ground out</option>');
	options.push('<option value="FlyOut">Fly out</option>');
	options.push('<option value="Hit">Hit</option>');
	options.push('<option value="FC">Fielder\'s choice</option>');
	options.push('<option value="Error">Error</option>');
	options.push('<option value="Advance">Advance to 1st</option>');
	return options;
}

function renderBatterRunnerActionOptions() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="fdc">Fielder\'s choice</option>');
	options.push('<option value="err">Error</option>');
	options.push('<option value="out">Out</option>');
	return options;
}

function renderRunnerActionOptions() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="adv">Advanced by batter</option>');
	options.push('<option value="exb">Extra base</option>');
	options.push('<option value="ste">Steal</option>');
	options.push('<option value="fdc">Fielder\'s choice</option>');
	options.push('<option value="err">Error</option>');
	options.push('<option value="out">Out</option>');
	return options;
}