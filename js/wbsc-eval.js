function changeBaseAction(group) {
	switch (group) {
		case input_b:
			changeBatterBaseAction();
			break;
		case input_br:
			changeBrBaseAction();
			break;
		case input_r1:
		case input_r2:
		case input_r3:
			changeRunnerBaseResult(group);
			break;
	}
}

function changeSpecificAction(group) {
	switch (group) {
		case input_b:
			changeBatterSpecificAction();
			break;
		case input_br:
			changeBrSpecificAction();
			break;
		case input_r1:
		case input_r2:
		case input_r3:
			// NOTHING YET
			break;
	}
}

function changeBatterBaseAction() {
	
	var actionOptions = [];
	var specificActionDisabled = false;

	var baseAction = document.getElementById(input_b + input_base_action);
	var baseActionValue = baseAction.value;
	switch (baseActionValue) {
		case "StrikeOut":
			actionOptions.push('<option value="KS">Swinging</option>');
			actionOptions.push('<option value="KL">Looking</option>');
			actionOptions.push('<option value="KSO">Swinging with tag/throw out</option>');
			actionOptions.push('<option value="KSET">Swinging with throwing error</option>');
			actionOptions.push('<option value="KSEM">Swinging with muffled throw error</option>');
			actionOptions.push('<option value="KSWP">Swinging with wild pitch</option>');
			actionOptions.push('<option value="KSPB">Swinging with passed ball</option>');
			actionOptions.push('<option value="KLO">Looking with tag/throw out</option>');
			actionOptions.push('<option value="KLET">Looking with throwing error</option>');
			actionOptions.push('<option value="KLEM">Looking with muffled throw error</option>');
			actionOptions.push('<option value="KLWP">Looking with wild pitch</option>');
			actionOptions.push('<option value="KLPB">Looking with passed ball</option>');
			break;
		case "GroundOut":
			actionOptions.push('<option value="GO">Ground out</option>');
	        specificActionDisabled = true;
			break;
		case "FlyOut":
			actionOptions.push('<option value="F">Fly out</option>');
			actionOptions.push('<option value="P">Pop out</option>');
			actionOptions.push('<option value="L">Line out</option>');
			actionOptions.push('<option value="FF">Fouled fly out</option>');
			actionOptions.push('<option value="FP">Fouled pop out</option>');
			actionOptions.push('<option value="FL">Fouled line out</option>');
			break;
		case "Hit":
			actionOptions.push('<option value="1B">Single</option>');
			actionOptions.push('<option value="2B">Double</option>');
			actionOptions.push('<option value="3B">Triple</option>');
			actionOptions.push('<option value="HR">Homerun</option>');
			actionOptions.push('<option value="2BG">Double - ground rule</option>');
			actionOptions.push('<option value="HRI">Homerun - inside the park</option>');
			break;
		case "FC":
			actionOptions.push('<option value="O">Occupied</option>');
			actionOptions.push('<option value="FC">Fielder\'s choice</option>');
			break;
		case "Error":
			actionOptions.push('<option value="EF">Fielding error</option>');
			actionOptions.push('<option value="ET">Throwing error</option>');
			actionOptions.push('<option value="EM">Muffled throw</option>');
			actionOptions.push('<option value="ED">Dropped fly</option>');
			actionOptions.push('<option value="EDF">Dropped foul</option>');
			break;
		case "Advance":
			actionOptions.push('<option value="BB">Base on balls</option>');
			actionOptions.push('<option value="IBB">Intentional base on balls</option>');
			actionOptions.push('<option value="HP">Hit by pitch</option>');
			break;
		default:
	        specificActionDisabled = true;	
	}
	
	var specificAction = document.getElementById(input_b + input_spec_action);
	specificAction.innerHTML = actionOptions;
	specificAction.disabled = specificActionDisabled;
	
	changeBatterSpecificAction();
}

function changeBatterSpecificAction() {
	var fc = false;
	var hit = false;
	var allowedPosItems = 5;
	
	var specificAction = document.getElementById(input_b + input_spec_action);
	var specificActionValue = specificAction.value;
	switch (specificActionValue) {
		case "FC":
			fc = true;
			allowedPosItems = 2;
			break;
	    case "BB":
	    case "IBB":
	    case "HP":
	    case "KS":
	    case "KSWP":
	    case "KSPB":
	    case "KL":
	    case "KLWP":
	    case "KLPB":
			allowedPosItems = 0;
			break;
		case "1B":
		case "2B":
		case "3B":
		case "HR":
		case "2BG":
		case "HRI":
			hit = true;
			allowedPosItems = 1;
			break;
		case "O":
		case "EF":
		case "ED":
		case "EDF":
		case "KSET":
		case "KLET":
			allowedPosItems = 1;
			break;
		case "GO":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
		case "ET":
		case "EM":
			// no adjustments
			break;
	}
	
	var groupID = input_b + input_position;
	var container = document.getElementById(groupID);
	var addItemButton = document.getElementById(groupID + input_add);
	var removeItemButton = document.getElementById(groupID + input_remove);
	if (allowedPosItems < 5) {
		addItemButton.disabled = true;
		removeItemButton.disabled = true;
		
		var itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
	    while (itemsCreated != allowedPosItems) {
			if (itemsCreated > allowedPosItems) {
				var posItemN = document.getElementById(groupID + itemsCreated);
				container.removeChild(posItemN);
				itemsCreated--;
			} else {
				itemsCreated++;
				var posItemN = document.createElement("select");
				posItemN.setAttribute('id', groupID + itemsCreated);
				posItemN.setAttribute('class', class_wbsc_pos);
				posItemN.innerHTML = renderPlayerOptions();		
				container.insertBefore(posItemN, addItemButton);
			}
		}
		
		if (hit == true) {
			var posItem1 = document.getElementById(groupID + "1");
			posItem1.innerHTML = renderHitLocationOptions();
		}
		
		if (fc == true) {
			var posItem2 = document.getElementById(groupID + "2");
			posItem2.innerHTML = renderFCLocationOptions();
		}
	} else {
		addItemButton.disabled = false;
		removeItemButton.disabled = false;
		
		var posItem1 = document.getElementById(groupID + "1");
		if (posItem1 != null) {
			posItem1.innerHTML = renderPlayerOptions();
		} else {
			var posItem1 = document.createElement("select");
			posItem1.setAttribute('id', groupID + "1");
			posItem1.setAttribute('class', class_wbsc_pos);
			posItem1.innerHTML = renderPlayerOptions();		
			container.insertBefore(posItem1, addItemButton);
		}
		
		var posItem2 = document.getElementById(groupID + "2");
		if (posItem2 != null) {
			posItem2.innerHTML = renderPlayerOptions();
		}
	}
}

function changeBrBaseAction() {
	var actionOptions = [];
	var specificActionDisabled = false;

	var brAction = document.getElementById(input_br + input_base_action);
	switch (brAction.value) {
		case "safe":
			actionOptions.push('<option value="T">On the throw</option>');
			actionOptions.push('<option value="E">Decisive error</option>');
			actionOptions.push('<option value="e">Extra-base error</option>');
			break;
		case "out":
			actionOptions.push('<option value="TO">Tagged out</option>');
			break;
		default:
			specificActionDisabled = true;
	}
	
	var brSpecificAction = document.getElementById(input_br + input_spec_action);
	brSpecificAction.innerHTML = actionOptions;
	brSpecificAction.disabled = specificActionDisabled;
	
	changeBrSpecificAction();
}

function changeBrSpecificAction() {
	var throwing = false;
	var allowedPosItems = 5;
	
	var brSpecificAction = document.getElementById(input_br + input_spec_action);
	var brSpecificActionValue = brSpecificAction.value;
	switch (brSpecificActionValue) {
		case "T":
			allowedPosItems = 2;
			throwing = true;
			break;
	    case "E":
		case "e":
	    case "O":
			// no adjustments
			break;
	}
	
	var groupID = input_br + input_position;
	var addItemButton = document.getElementById(groupID + input_add);
	var removeItemButton = document.getElementById(groupID + input_remove);
	if (allowedPosItems < 5) {
		addItemButton.disabled = true;
		removeItemButton.disabled = true;
		
		var container = document.getElementById(groupID);
		var itemsCreated = container.getElementsByClassName(class_wbsc_pos).length;
	    while (itemsCreated != allowedPosItems) {
			if (itemsCreated > allowedPosItems) {
				var posItemN = document.getElementById(groupID + itemsCreated);
				container.removeChild(posItemN);
				itemsCreated--;
			} else {
				itemsCreated++;
				var posItemN = document.createElement("select");
				posItemN.setAttribute('id', groupID + itemsCreated);
				posItemN.setAttribute('class', class_wbsc_pos);
				posItemN.innerHTML = renderPlayerOptions();		
				container.insertBefore(posItemN, addItemButton);
			}
		}
		
		if (throwing == true) {
			var posItem2 = document.getElementById(groupID + "2");
			posItem2.innerHTML = renderFCLocationOptions();
		}
	} else {
		addItemButton.disabled = false;
		removeItemButton.disabled = false;
		
		var posItem2 = document.getElementById(groupID + "2");
		if (posItem2 != null) {
			posItem2.innerHTML = renderPlayerOptions();
		}
	}
}

function changeRunnerBaseResult(group) {
	var actionOptions = [];
	var specificActionDisabled = false;
	
	var runnerBaseAction = document.getElementById(group + input_base_action);
	switch (runnerBaseAction.value) {
		case "safe":
			actionOptions.push('<option value="A">Advanced by batter</option>');
			actionOptions.push('<option value="E">Decisive error</option>');
			actionOptions.push('<option value="e">Extra-base error</option>');
			break;
		case "out":
			actionOptions.push('<option value="TO">Tagged out</option>');
			actionOptions.push('<option value="FO">Forced out</option>');
			break;
	    default:
			specificActionDisabled = true;
	}
	
	var runnerSpecificAction = document.getElementById(group + input_spec_action);
	runnerSpecificAction.innerHTML = actionOptions;
	runnerSpecificAction.disabled = specificActionDisabled;
	
	var groupID = group + input_position;
	var addItemButton = document.getElementById(groupID + input_add);
	var removeItemButton = document.getElementById(groupID + input_remove);
	addItemButton.disabled = false;
	removeItemButton.disabled = false;
}

function getBaseSelection(group) {
	var base = "0";
	
	var baseSelect = document.getElementById(group + input_base);
	if (baseSelect != null) {
		base = baseSelect.value;
	}
	
	return base;
}

function getPosSelection(group) {
	var selection = "";
	
	var container = document.getElementById(group + input_position);
	var posCount = container.getElementsByClassName(class_wbsc_pos);
	for (var i = 0; i < posCount.length; i++) {
		selection += posCount.item(i).value;
	}
	
	return selection;
}

function checkPosSelection(selection) {
	var validation = "";
	
	if (selection.length == 2) {
		if (selection.substr(0,1) == selection.substr(1)) {
			validation = "A player cannot assist directly to self";
		}
	} else if (selection.length > 2) {
		var alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false];
		for (var i = 0; i < selection.length - 1; i++) {
			if (alreadyEncounteredPositions[selection.substr(i,1)] == true) {
				validation = "A player cannot have more than 1 assist in a play";
				break;
			}
			alreadyEncounteredPositions[selection.substr(i,i+1)] = true;
		}
	}
	
	return validation;
}

function getInput(group) {
	var values = null;
	
	var container = document.getElementById(group);
	if (container != null) {
		values = [];
		values[input_base_action] = document.getElementById(group + input_base_action).value;
		values[input_spec_action] = document.getElementById(group + input_spec_action).value;
		values[input_base] = getBaseSelection(group);
		values[input_position] = getPosSelection(group);
		values[input_validation] = checkPosSelection(values[input_position]);
	}
	
	return values;
}

function attachValidation(input, validation) {
	
	if (input != "") {
		input += "\n";
	}
	
	if (validation != "") {
		input += "- ";
	}
	
	input += validation;
	
	return input;
}