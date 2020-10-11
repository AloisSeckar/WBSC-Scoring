function changeBaseAction(group) {
	if (group == input_b) {
		changeBatterBaseAction();
	} else {
		changeRunnerBaseAction(group);
	}
}

function changeSpecificAction(group) {
	if (group == input_b) {
		changeBatterSpecificAction();
	} else {
		changeRunnerSpecificAction(group);
	}
}

function changeBatterBaseAction() {
	
	var actionOptions = [];
	var specificActionDisabled = false;

	var baseAction = document.getElementById(input_b + input_base_action);
	var baseActionValue = baseAction.value;
	switch (baseActionValue) {
		case "StrikeOut":
			actionOptions.push('<optgroup label="Batter is out">');
			actionOptions.push('<option value="KS">Swinging</option>');
			actionOptions.push('<option value="KL">Looking</option>');
			actionOptions.push('<option value="KSO">Swinging with tag/throw out</option>');
			actionOptions.push('<option value="KLO">Looking with tag/throw out</option>');
			actionOptions.push('</optgroup>');
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="KSET">Swinging with throwing error</option>');
			actionOptions.push('<option value="KSEM">Swinging with muffled throw error</option>');
			actionOptions.push('<option value="KSWP">Swinging with wild pitch</option>');
			actionOptions.push('<option value="KSPB">Swinging with passed ball</option>');
			actionOptions.push('<option value="KSFC">Swinging with putting out runner</option>');
			actionOptions.push('<option value="KLET">Looking with throwing error</option>');
			actionOptions.push('<option value="KLEM">Looking with muffled throw error</option>');
			actionOptions.push('<option value="KLWP">Looking with wild pitch</option>');
			actionOptions.push('<option value="KLPB">Looking with passed ball</option>');
			actionOptions.push('<option value="KLFC">Looking with putting out runner</option>');
			actionOptions.push('</optgroup>');
			break;
		case "GroundOut":
			actionOptions.push('<optgroup label="Batter is out">');
			actionOptions.push('<option value="GO">Ground out</option>');
			actionOptions.push('<option value="GOB">Ground out - bunt</option>');
			actionOptions.push('</optgroup>');
			break;
		case "FlyOut":
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
		case "Hit":
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="1B">Single</option>');
			actionOptions.push('<option value="2B">Double</option>');
			actionOptions.push('<option value="3B">Triple</option>');
			actionOptions.push('<option value="HR">Homerun</option>');
			actionOptions.push('<option value="1BB">Single - bunt</option>');
			actionOptions.push('<option value="2BG">Double - ground rule</option>');
			actionOptions.push('<option value="HRI">Homerun - inside the park</option>');
			actionOptions.push('</optgroup>');
			break;
		case "Sacrifice":
			actionOptions.push('<optgroup label="Batter is out">');
			actionOptions.push('<option value="SH">Sacrifice bunt</option>');
			actionOptions.push('<option value="SF">Sacrifice fly</option>');
			actionOptions.push('</optgroup>');
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="SHE">Sacrifice bunt with error</option>');
			actionOptions.push('<option value="SHFC">Sacrifice bunt with FC</option>');
			actionOptions.push('<option value="FSF">Sacrifice fly in foul territory</option>');
			actionOptions.push('<option value="SFE">Sacrifice fly with error</option>');
			actionOptions.push('<option value="SFO">Dropped sacrifice fly + forced out</option>');
			actionOptions.push('</optgroup>');
			break;
		case "FC":
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="O">Occupied</option>');
			actionOptions.push('<option value="FC">Fielder\'s choice</option>');
			actionOptions.push('</optgroup>');
			break;
		case "Error":
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="EF">Fielding error</option>');
			actionOptions.push('<option value="ET">Throwing error</option>');
			actionOptions.push('<option value="EM">Muffled throw</option>');
			actionOptions.push('<option value="ED">Dropped fly</option>');
			actionOptions.push('<option value="EDF">Dropped foul</option>');
			actionOptions.push('</optgroup>');
			break;
		case "Advance":
			actionOptions.push('<optgroup label="Batter is safe">');
			actionOptions.push('<option value="BB">Base on balls</option>');
			actionOptions.push('<option value="IBB">Intentional base on balls</option>');
			actionOptions.push('<option value="HP">Hit by pitch</option>');
			actionOptions.push('</optgroup>');
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
		case "SHFC":
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
		case "1BB":
		case "2BG":
		case "HRI":
			hit = true;
			allowedPosItems = 1;
			break;
		case "KSET":
		case "KLET":
		case "KSFC":
		case "KLFC":
		case "O":
		case "EF":
		case "ED":
		case "EDF":
		case "SF":
		case "SFE":
		case "FSF":
		case "IF":
			allowedPosItems = 1;
			break;
		case "KSO":
		case "KLO":
		case "KSEM":
		case "KLEM":
		case "GO":
		case "GOB":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
		case "ET":
		case "EM":
		case "SH":
		case "SHE":
			// no adjustments
			break;
		default:
			allowedPosItems = 1;
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

function changeRunnerBaseAction(group) {
	var actionOptions = [];
	var specificActionDisabled = false;
	
	var runnerBaseAction = document.getElementById(group + input_base_action);
	switch (runnerBaseAction.value) {
		case "adv":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="A">Advanced by batter</option>');
			actionOptions.push('</optgroup>');
			break;
		case "exbb":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="bb">Base on balls</option>');
			actionOptions.push('<option value="ibb">Intentional base on balls</option>');
			actionOptions.push('<option value="hp">Hit by pitch</option>');
			actionOptions.push('</optgroup>');
			break;
		case "exb":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="WP">Wild pitch</option>');
			actionOptions.push('<option value="PB">Passed ball</option>');
			actionOptions.push('<option value="BK">Balk</option>');
			actionOptions.push('<option value="IP">Illegal pitch</option>');
			actionOptions.push('</optgroup>');
			break;
		case "ste":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="SB">Stolen base</option>');
			actionOptions.push('<option value="CSE">Caught stealing with error</option>');
			actionOptions.push('</optgroup>');
			actionOptions.push('<optgroup label="Runner is out">');
			actionOptions.push('<option value="CSO">Caught stealing</option>');
			actionOptions.push('</optgroup>');
			break;
		case "fdc":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="T">On the throw</option>');
			actionOptions.push('<option value="O/">Indifference</option>');
			actionOptions.push('</optgroup>');
			break;
		case "err":
			actionOptions.push('<optgroup label="Runner is safe">');
			actionOptions.push('<option value="EF">Decessive fielding</option>');
			actionOptions.push('<option value="ET">Decessive throwing</option>');
			actionOptions.push('<option value="EM">Decessive muffled throw</option>');
			actionOptions.push('<option value="eF">Extra base fielding</option>');
			actionOptions.push('<option value="eT">Extra base throwing</option>');
			actionOptions.push('</optgroup>');
			break;
		case "out":
			actionOptions.push('<optgroup label="Runner is out">');
			actionOptions.push('<option value="GO">Force out</option>');
			actionOptions.push('<option value="GO">Tag out</option>');
			actionOptions.push('</optgroup>');
			break;
	    default:
			specificActionDisabled = true;
	}
	
	var runnerSpecificAction = document.getElementById(group + input_spec_action);
	runnerSpecificAction.innerHTML = actionOptions;
	runnerSpecificAction.disabled = specificActionDisabled;
	
	changeRunnerSpecificAction(group);
}

function changeRunnerSpecificAction(group) {
	var throwing = false;
	var allowedPosItems = 5;
	
	var runnerSpecificAction = document.getElementById(group + input_spec_action);
	var runnerSpecificActionValue = runnerSpecificAction.value;
	switch (runnerSpecificActionValue) {
		case "A":
	    case "bb":
	    case "ibb":
	    case "hp":
		case "WP":
		case "PB":
		case "BK":
		case "IP":
		case "SB":
			allowedPosItems = 0;
			break;
		case "O/":
		case "EF":
		case "eF":
			allowedPosItems = 1;
			break;
		case "T":
			allowedPosItems = 2;
			throwing = true;
			break;
	    case "CSO":
	    case "CSE":
	    case "ET":
	    case "EM":
	    case "eT":
	    case "GO":
			// no adjustments
			break;
		default:
			allowedPosItems = 1;
	}
	
	var groupID = group + input_position;
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
		
		if (throwing == true) {
			var posItem2 = document.getElementById(groupID + "2");
			posItem2.innerHTML = renderFCLocationOptions();
		}
	} else {
		addItemButton.disabled = false;
		removeItemButton.disabled = false;
		
		var posItem1 = document.getElementById(groupID + "1");
		if (posItem1 == null) {
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

function getBaseSelection(group) {
	var base = "1";
	
	var baseSelect = document.getElementById(group + input_base);
	if (baseSelect != null) {
		base = baseSelect.value;
	}
	
	return base;
}

function getTIESelection(group) {
	var tie = false;
	
	var tieCheck = document.getElementById(group + input_tie);
	if (tieCheck != null) {
		tie = tieCheck.checked;
	}
	
	return tie;
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
	
	if (selection.length > 1) {
		if (!selection.endsWith("LL") && selection[selection.length - 2] == selection[selection.length - 1]) {
			validation = "A player cannot assist directly to self";
		}
	}
	if (selection.length > 2) {
		var alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false];
		for (var i = 0; i < selection.length - 1; i++) {
			if (alreadyEncounteredPositions[selection.substr(i,1)] == true) {
				if (validation != "") {
					validation += "\n- ";
				}
				validation += "A player cannot have more than 1 assist in a play";
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
		values[input_tie] = getTIESelection(group);
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