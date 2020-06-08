function init() {
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	
	window.w = canvas.width;
	window.h = canvas.height;
	window.w2 = w / 2;
	window.w3 = w / 3;
	window.w4 = w / 4;
	window.h2 = h / 2;
	window.h3 = h / 3;
	window.h4 = h / 4;
	window.h5 = h / 5;
	
	renderActionButtons();
	renderInputsForBatter();
	drawBackground();
}

function changeBaseAction() {
	
	var actionOptions = [];
	var specificActionDisabled = false;

	var baseAction = document.getElementById("baseAction");
	var baseActionValue = baseAction.value;
	switch (baseActionValue) {
		case "StrikeOut":
			actionOptions.push('<option value="KS">Swinging</option>');
			actionOptions.push('<option value="KL">Looking</option>');
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
			
	}
	
	var specificAction = document.getElementById("specificAction");
	specificAction.innerHTML = actionOptions;
	specificAction.disabled = specificActionDisabled;
	
	changeSpecificAction();
}

function changeSpecificAction() {
	var fc = false;
	var hit = false;
	var allowedPlayerInputs = 5;
	
	var specificAction = document.getElementById("specificAction");
	var specificActionValue = specificAction.value;
	switch (specificActionValue) {
		case "FC":
			fc = true;
			allowedPlayerInputs = 2;
			break;
	    case "BB":
	    case "IBB":
	    case "HP":
			allowedPlayerInputs = 0;
			break;
		case "1B":
		case "2B":
		case "3B":
		case "HR":
		case "2BG":
		case "HRI":
			hit = true;
			allowedPlayerInputs = 1;
			break;
		case "O":
		case "EDF":
			allowedPlayerInputs = 1;
			break;
		case "GO":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
		case "EF":
		case "ET":
		case "EM":
		case "ED":
			// no adjustments
			break;
	}
	
	var loc = "involved-players-batter-inputs";
	var addInvolvedPlayerButton = document.getElementById(loc + "-add-button");
	var removeInvolvedPlayerButton = document.getElementById(loc + "-remove-button");
	if (allowedPlayerInputs < 5) {
		addInvolvedPlayerButton.disabled = true;
		removeInvolvedPlayerButton.disabled = true;
		
		var container = document.getElementById(loc);
		var inputsCreated = container.getElementsByClassName("wbsc-render-player").length;
	    while (inputsCreated != allowedPlayerInputs) {
			if (inputsCreated > allowedPlayerInputs) {
				var involvedPlayerN = document.getElementById(loc + "-p" + inputsCreated);
				container.removeChild(involvedPlayerN);
				inputsCreated--;
			} else {
				inputsCreated++;
				var involvedPlayerN = document.createElement("select");
				involvedPlayerN.setAttribute('id', loc + "-p" + inputsCreated);
				involvedPlayerN.setAttribute('class', "wbsc-render-player");
				involvedPlayerN.innerHTML = renderDefaultPlayerSelection();		
				container.insertBefore(involvedPlayerN, addInvolvedPlayerButton);
			}
		}
		
		if (hit == true) {
			var involvedPlayer1 = document.getElementById(loc + "-p1");
			involvedPlayer1.innerHTML = renderHitLocationSelection();
		}
		
		if (fc == true) {
			var involvedPlayer2 = document.getElementById(loc + "-p2");
			involvedPlayer2.innerHTML = renderFCLocationSelection();
		}
	} else {
		addInvolvedPlayerButton.disabled = false;
		removeInvolvedPlayerButton.disabled = false;
		
		var involvedPlayer1 = document.getElementById(loc + "-p1");
		if (involvedPlayer1 != null) {
			involvedPlayer1.innerHTML = renderDefaultPlayerSelection();
		}
		
		var involvedPlayer2 = document.getElementById(loc + "-p2");
		if (involvedPlayer2 != null) {
			involvedPlayer2.innerHTML = renderDefaultPlayerSelection();
		}
	}
}

function changeBrAction() {
	var actionOptions = [];

	var brAction = document.getElementById("brAction");
	switch (brAction.value) {
		case "safe":
			actionOptions.push('<option value="T">Advanced on the throw</option>');
			actionOptions.push('<option value="E">Advanced on decisive error</option>');
			actionOptions.push('<option value="e">Advanced on extra-base error</option>');
			break;
		case "out":
			actionOptions.push('<option value="O">Tagged out</option>');
			break;
	}
	
	var brSpecificAction = document.getElementById("brSpecificAction");
	brSpecificAction.innerHTML = actionOptions;
	
	changeBrSpecificAction();
}

function changeBrSpecificAction() {
	var throwing = false;
	var allowedPlayerInputs = 5;
	
	var brSpecificAction = document.getElementById("brSpecificAction");
	var brSpecificActionValue = brSpecificAction.value;
	switch (brSpecificActionValue) {
		case "e":
			allowedPlayerInputs = 2;
			break;
		case "T":
			allowedPlayerInputs = 2;
			throwing = true;
			break;
	    case "E":
	    case "O":
			// no adjustments
			break;
	}
	
	brSpecificAction.disabled = false;
	
	var loc = "involved-players-batter-runner-inputs";
	var addInvolvedPlayerButton = document.getElementById(loc + "-add-button");
	var removeInvolvedPlayerButton = document.getElementById(loc + "-remove-button");
	if (allowedPlayerInputs < 5) {
		addInvolvedPlayerButton.disabled = true;
		removeInvolvedPlayerButton.disabled = true;
		
		var container = document.getElementById(loc);
		var inputsCreated = container.getElementsByClassName("wbsc-render-player").length;
	    while (inputsCreated != allowedPlayerInputs) {
			if (inputsCreated > allowedPlayerInputs) {
				var involvedPlayerN = document.getElementById(loc + "-p" + inputsCreated);
				container.removeChild(involvedPlayerN);
				inputsCreated--;
			} else {
				inputsCreated++;
				var involvedPlayerN = document.createElement("select");
				involvedPlayerN.setAttribute('id', loc + "-p" + inputsCreated);
				involvedPlayerN.setAttribute('class', "wbsc-render-player");
				involvedPlayerN.innerHTML = renderDefaultPlayerSelection();		
				container.insertBefore(involvedPlayerN, addInvolvedPlayerButton);
			}
		}
		
		if (throwing == true) {
			var involvedPlayer2 = document.getElementById(loc + "-p2");
			involvedPlayer2.innerHTML = renderFCLocationSelection();
		}
	} else {
		addInvolvedPlayerButton.disabled = false;
		removeInvolvedPlayerButton.disabled = false;
		
		var involvedPlayer2 = document.getElementById(loc + "-p2");
		if (involvedPlayer2 != null) {
			involvedPlayer2.innerHTML = renderDefaultPlayerSelection();
		}
	}
}

function changeRunnerActionResult(base) {
	var actionOptions = [];
	
	var runnerActionResult;
	var runnerSpecificAction;
	switch (base) {
		case 1:
			runnerActionResult = document.getElementById("r1ActionResult");	
			runnerSpecificAction = document.getElementById("r1SpecificAction");
			break;
		case 2:
			runnerActionResult = document.getElementById("r2ActionResult");	
			runnerSpecificAction = document.getElementById("r2SpecificAction");
			break;
		case 2:
			runnerActionResult = document.getElementById("r3ActionResult");	
			runnerSpecificAction = document.getElementById("r3SpecificAction");
			break;
	}

	switch (runnerActionResult.value) {
		case "safe":
			actionOptions.push('<option value="A">Advanced by batter</option>');
			actionOptions.push('<option value="E">Advanced on decisive error</option>');
			actionOptions.push('<option value="e">Advanced on extra-base error</option>');
			break;
		case "out":
			actionOptions.push('<option value="O">Tagged out</option>');
			break;
	}
	
	runnerSpecificAction.innerHTML = actionOptions;
}

function getPlayersSelection(loc) {
	var selection = "";
	
	var sectionID = "involved-players-" + loc;
	var container = document.getElementById(sectionID);
	
	var players = container.getElementsByClassName("wbsc-render-player");
	for (var i = 0; i < players.length; i++) {
		selection += players.item(i).value;
	}
	
	return selection;
}

function checkPlayersSelection(selection) {
	var validation = "";
	
	if (selection.length == 2) {
		if (selection.substr(0,1) == selection.substr(1)) {
			validation = "A player cannot assist directly to self";
		}
	} else if (selection.length > 2) {
		var alreadyEncounteredPlayers = [false, false, false, false, false, false, false, false, false, false];
		for (var i = 0; i < selection.length - 1; i++) {
			if (alreadyEncounteredPlayers[selection.substr(i,1)] == true) {
				validation = "A player cannot have more than 1 assist in a play";
				break;
			}
			alreadyEncounteredPlayers[selection.substr(i,i+1)] = true;
		}
	}
	
	return validation;
}

