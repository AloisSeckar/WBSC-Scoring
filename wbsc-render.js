function renderActionButtons() {
	var actionButtonsContainer = document.createElement("div");
	actionButtonsContainer.setAttribute('id', "wbsc-toolbar");
	actionButtonsContainer.setAttribute('class', "wbsc-buttons");
	
	var generateButton = document.createElement("button");
	generateButton.setAttribute('id', "generate-button");
	generateButton.setAttribute('type', "button");
	generateButton.setAttribute('class', "btn btn-primary wbsc-action-button");
	generateButton.setAttribute('onclick', "drawAction()");
	generateButton.innerHTML = "Generate action";
	actionButtonsContainer.appendChild(generateButton);
	
	var renderBatterButton = document.createElement("button");
	renderBatterButton.setAttribute('id', "batter-button");
	renderBatterButton.setAttribute('type', "button");
	renderBatterButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBatterButton.setAttribute('onclick', "renderInputsForBatter()");
	renderBatterButton.innerHTML = " +B ";
	actionButtonsContainer.appendChild(renderBatterButton);
	
	var renderBRButton = document.createElement("button");
	renderBRButton.setAttribute('id', "batter-runner-button");
	renderBRButton.setAttribute('type', "button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBRButton.setAttribute('onclick', "renderInputsForRunningBatter()");
	renderBRButton.innerHTML = " +BR ";
	actionButtonsContainer.appendChild(renderBRButton);
	
	var renderRunner1Button = document.createElement("button");
	renderRunner1Button.setAttribute('id', "runner-1-button");
	renderRunner1Button.setAttribute('type', "button");
	renderRunner1Button.setAttribute('class', "btn btn-info wbsc-render-button");
	renderRunner1Button.setAttribute('onclick', "renderInputsForRunner1()");
	renderRunner1Button.innerHTML = " +R1 ";
	actionButtonsContainer.appendChild(renderRunner1Button);
	
	var renderRunner2Button = document.createElement("button");
	renderRunner2Button.setAttribute('id', "runner-2-button");
	renderRunner2Button.setAttribute('type', "button");
	renderRunner2Button.setAttribute('class', "btn btn-info wbsc-render-button");
	renderRunner2Button.setAttribute('onclick', "renderInputsForRunner2()");
	renderRunner2Button.innerHTML = " +R2 ";
	actionButtonsContainer.appendChild(renderRunner2Button);
	
	var renderRunner3Button = document.createElement("button");
	renderRunner3Button.setAttribute('id', "runner-3-button");
	renderRunner3Button.setAttribute('type', "button");
	renderRunner3Button.setAttribute('class', "btn btn-info wbsc-render-button");
	renderRunner3Button.setAttribute('onclick', "renderInputsForRunner3()");
	renderRunner3Button.innerHTML = " +R3 ";
	actionButtonsContainer.appendChild(renderRunner3Button);
	
	var container = document.getElementById("wbsc-inputs");
	container.appendChild(actionButtonsContainer);
}

function renderInputsForBatter() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var batterInputsContainer = document.createElement("div");
	batterInputsContainer.setAttribute('id', "batter-inputs");
	batterInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var batterLabel = document.createElement("label");
	batterLabel.innerHTML = "<strong>Batter:<strong>";
	batterInputsContainer.appendChild(batterLabel);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var actionLabel = document.createElement("label");
	actionLabel.innerHTML = "Action:";
	batterInputsContainer.appendChild(actionLabel);
	
	var baseAction = document.createElement("select");
	baseAction.setAttribute('id', "baseAction");
	baseAction.setAttribute('class', "wbsc-action-select");
	baseAction.setAttribute('onchange', "changeBaseAction()");
	baseAction.innerHTML = renderDefaultBaseAction();
	batterInputsContainer.appendChild(baseAction);
	
	var specificAction = document.createElement("select");
	specificAction.setAttribute('id', "specificAction");
	specificAction.setAttribute('class', "wbsc-action-select");
	specificAction.setAttribute('onchange', "changeSpecificAction()");
	specificAction.innerHTML = '<option class="blank" />';
	specificAction.disabled = true;
	batterInputsContainer.appendChild(specificAction);
	
	container.insertBefore(batterInputsContainer, toolbar);
	
	renderInvolvedPlayersSelection("batter-inputs");
	
	var renderBRButton = document.getElementById("batter-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	renderBRButton.setAttribute('onclick', "unRenderInputsForBatter()");
	renderBRButton.innerHTML = " -B ";
}

function unRenderInputsForBatter() {
    var batterInputsContainer = document.getElementById("batter-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(batterInputsContainer);
	
	var renderBRButton = document.getElementById("batter-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBRButton.setAttribute('onclick', "renderInputsForBatter()");
	renderBRButton.innerHTML = " +B ";
}

function renderInputsForRunningBatter() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var batterRunnerInputsContainer = document.createElement("div");
	batterRunnerInputsContainer.setAttribute('id', "batter-runner-inputs");
	batterRunnerInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var brBaseLabel = document.createElement("label");
	brBaseLabel.innerHTML = "Base:";
	batterRunnerInputsContainer.appendChild(brBaseLabel);
	
	var brBase = document.createElement("select");
	brBase.setAttribute('id', "brBase");
	brBase.innerHTML = renderDefaultBrBase(1);
	batterRunnerInputsContainer.appendChild(brBase);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brActionResultLabel = document.createElement("label");
	brActionResultLabel.innerHTML = "Action:";
	batterRunnerInputsContainer.appendChild(brActionResultLabel);
	
	var brActionResult = document.createElement("select");
	brActionResult.setAttribute('id', "brActionResult");
	brActionResult.setAttribute('class', "wbsc-action-select");
	brActionResult.setAttribute('onchange', "changeBrActionResult()");
	brActionResult.innerHTML = renderDefaultBrActionResult();
	batterRunnerInputsContainer.appendChild(brActionResult);
	
	var brSpecificAction = document.createElement("select");
	brSpecificAction.setAttribute('id', "brSpecificAction");
	brSpecificAction.setAttribute('class', "wbsc-action-select");
	brSpecificAction.disabled = true;
	batterRunnerInputsContainer.appendChild(brSpecificAction);
	
	container.insertBefore(batterRunnerInputsContainer, toolbar);
	
	renderInvolvedPlayersSelection("batter-runner-inputs");
	
	var renderBRButton = document.getElementById("batter-runner-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	renderBRButton.setAttribute('onclick', "unRenderInputsForRunningBatter()");
	renderBRButton.innerHTML = " -BR ";
}

function unRenderInputsForRunningBatter() {
    var batterRunnerInputsContainer = document.getElementById("batter-runner-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(batterRunnerInputsContainer);
	
	var renderBRButton = document.getElementById("batter-runner-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBRButton.setAttribute('onclick', "renderInputsForRunningBatter()");
	renderBRButton.innerHTML = " +BR ";
}

function renderInputsForRunner1() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var r1InputsContainer = document.createElement("div");
	r1InputsContainer.setAttribute('id', "runner-1-inputs");
	r1InputsContainer.setAttribute('class', "wbsc-inputs");
	
	var r1Label = document.createElement("label");
	r1Label.innerHTML = "<strong>Runner at 1st:<strong>";
	r1InputsContainer.appendChild(r1Label);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1BaseLabel = document.createElement("label");
	r1BaseLabel.innerHTML = "Base:";
	r1InputsContainer.appendChild(r1BaseLabel);
	
	var r1Base = document.createElement("select");
	r1Base.setAttribute('id', "r1Base");
	r1Base.innerHTML = renderDefaultBrBase(1);
	r1InputsContainer.appendChild(r1Base);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1ActionResultLabel = document.createElement("label");
	r1ActionResultLabel.innerHTML = "Action:";
	r1InputsContainer.appendChild(r1ActionResultLabel);
	
	var r1ActionResult = document.createElement("select");
	r1ActionResult.setAttribute('id', "r1ActionResult");
	r1ActionResult.setAttribute('class', "wbsc-action-select");
	r1ActionResult.addEventListener('click', function(){
		changeRunnerActionResult(1);
	});
	r1ActionResult.innerHTML = renderDefaultBrActionResult();
	r1InputsContainer.appendChild(r1ActionResult);
	
	var r1SpecificAction = document.createElement("select");
	r1SpecificAction.setAttribute('id', "r1SpecificAction");
	r1SpecificAction.setAttribute('class', "wbsc-action-select");
	r1SpecificAction.disabled = true;
	r1InputsContainer.appendChild(r1SpecificAction);
	
	container.insertBefore(r1InputsContainer, toolbar);
	
	renderInvolvedPlayersSelection("runner-1-inputs");
	
	var runnerButton = document.getElementById("runner-1-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner1()");
	runnerButton.innerHTML = " -R1 ";
}

function unRenderInputsForRunner1() {
    var runner1InputsContainer = document.getElementById("runner-1-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner1InputsContainer);
	
	var runnerButton = document.getElementById("runner-1-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner1()");
	runnerButton.innerHTML = " +R1 ";
}

function renderInputsForRunner2() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var r2InputsContainer = document.createElement("div");
	r2InputsContainer.setAttribute('id', "runner-2-inputs");
	r2InputsContainer.setAttribute('class', "wbsc-inputs");
	
	var r2Label = document.createElement("label");
	r2Label.innerHTML = "<strong>Runner at 2nd:<strong>";
	r2InputsContainer.appendChild(r2Label);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2BaseLabel = document.createElement("label");
	r2BaseLabel.innerHTML = "Base:";
	r2InputsContainer.appendChild(r2BaseLabel);
	
	var r2Base = document.createElement("select");
	r2Base.setAttribute('id', "r2Base");
	r2Base.innerHTML = renderDefaultBrBase(1);
	r2InputsContainer.appendChild(r2Base);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2ActionResultLabel = document.createElement("label");
	r2ActionResultLabel.innerHTML = "Action:";
	r2InputsContainer.appendChild(r2ActionResultLabel);
	
	var r2ActionResult = document.createElement("select");
	r2ActionResult.setAttribute('id', "r2ActionResult");
	r2ActionResult.setAttribute('class', "wbsc-action-select");
	r2ActionResult.addEventListener('click', function(){
		changeRunnerActionResult(2);
	});
	r2ActionResult.innerHTML = renderDefaultBrActionResult();
	r2InputsContainer.appendChild(r2ActionResult);
	
	var r2SpecificAction = document.createElement("select");
	r2SpecificAction.setAttribute('id', "r2SpecificAction");
	r2SpecificAction.setAttribute('class', "wbsc-action-select");
	r2SpecificAction.disabled = true;
	r2InputsContainer.appendChild(r2SpecificAction);
	
	container.insertBefore(r2InputsContainer, toolbar);
	
	renderInvolvedPlayersSelection("runner-2-inputs");
	
	var runnerButton = document.getElementById("runner-2-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner2()");
	runnerButton.innerHTML = " -R2 ";
}

function unRenderInputsForRunner2() {
    var runner2InputsContainer = document.getElementById("runner-2-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner2InputsContainer);
	
	var runnerButton = document.getElementById("runner-2-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner2()");
	runnerButton.innerHTML = " +R2 ";
}

function renderInputsForRunner3() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var r3InputsContainer = document.createElement("div");
	r3InputsContainer.setAttribute('id', "runner-3-inputs");
	r3InputsContainer.setAttribute('class', "wbsc-inputs");
	
	var r3Label = document.createElement("label");
	r3Label.innerHTML = "<strong>Runner at 3rd:<strong>";
	r3InputsContainer.appendChild(r3Label);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3BaseLabel = document.createElement("label");
	r3BaseLabel.innerHTML = "Base:";
	r3InputsContainer.appendChild(r3BaseLabel);
	
	var r3Base = document.createElement("select");
	r3Base.setAttribute('id', "r3Base");
	r3Base.innerHTML = renderDefaultBrBase(1);
	r3InputsContainer.appendChild(r3Base);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3ActionResultLabel = document.createElement("label");
	r3ActionResultLabel.innerHTML = "Action:";
	r3InputsContainer.appendChild(r3ActionResultLabel);
	
	var r3ActionResult = document.createElement("select");
	r3ActionResult.setAttribute('id', "r3ActionResult");
	r3ActionResult.setAttribute('class', "wbsc-action-select");
	r3ActionResult.addEventListener('click', function(){
		changeRunnerActionResult(3);
	});
	r3ActionResult.innerHTML = renderDefaultBrActionResult();
	r3InputsContainer.appendChild(r3ActionResult);
	
	var r3SpecificAction = document.createElement("select");
	r3SpecificAction.setAttribute('id', "r3SpecificAction");
	r3SpecificAction.setAttribute('class', "wbsc-action-select");
	r3SpecificAction.disabled = true;
	r3InputsContainer.appendChild(r3SpecificAction);
	
	container.insertBefore(r3InputsContainer, toolbar);
	
	renderInvolvedPlayersSelection("runner-3-inputs");
	
	var runnerButton = document.getElementById("runner-3-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner3()");
	runnerButton.innerHTML = " -R3 ";
}

function unRenderInputsForRunner3() {
    var runner3InputsContainer = document.getElementById("runner-3-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner3InputsContainer);
	
	var runnerButton = document.getElementById("runner-3-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner3()");
	runnerButton.innerHTML = " +R3 ";
}

function renderDefaultBaseAction() {
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


function renderInvolvedPlayersSelection(loc) {
	
	var sectionID = "involved-players-" + loc;
	
	var involvedPlayersInputsContainer = document.createElement("div");
	involvedPlayersInputsContainer.setAttribute('id', sectionID);
	
	var involvedPlayersLabel = document.createElement("label");
	involvedPlayersLabel.innerHTML = "Involved players:";
	involvedPlayersInputsContainer.appendChild(involvedPlayersLabel);
	
	var involvedPlayer1 = document.createElement("select");
	involvedPlayer1.setAttribute('id', sectionID + "-p1");
	involvedPlayer1.setAttribute('class', "wbsc-render-player");
	involvedPlayer1.innerHTML = renderDefaultPlayerSelection();
	involvedPlayersInputsContainer.appendChild(involvedPlayer1);
	
	var addInvolvedPlayerButton = document.createElement("button");
	addInvolvedPlayerButton.setAttribute('id', sectionID + "-add-button");
	addInvolvedPlayerButton.setAttribute('type', "button");
	addInvolvedPlayerButton.setAttribute('class', "btn btn-sm btn-info wbsc-small-button wbsc-render-button");
	addInvolvedPlayerButton.addEventListener('click', function(){
		renderInvolvedPlayerSelect(sectionID);
	});
    addInvolvedPlayerButton.disabled = true;
	addInvolvedPlayerButton.innerHTML = "+P";
	involvedPlayersInputsContainer.appendChild(addInvolvedPlayerButton);
	
	var removeInvolvedPlayerButton = document.createElement("button");
	removeInvolvedPlayerButton.setAttribute('id', sectionID + "-remove-button");
	removeInvolvedPlayerButton.setAttribute('type', "button");
	removeInvolvedPlayerButton.setAttribute('class', "btn btn-sm btn-info wbsc-small-button wbsc-unrender-button");
	removeInvolvedPlayerButton.addEventListener('click', function(){
		unRenderInvolvedPlayerSelect(sectionID);
	});
    removeInvolvedPlayerButton.disabled = true;
	removeInvolvedPlayerButton.innerHTML = "-P";
	involvedPlayersInputsContainer.appendChild(removeInvolvedPlayerButton);
	
	var container = document.getElementById(loc);
	container.appendChild(document.createElement("br"));
	container.appendChild(involvedPlayersInputsContainer);
}

function renderInvolvedPlayerSelect(loc) {
	
	var container = document.getElementById(loc);
	
	var inputsCreated = container.getElementsByClassName("wbsc-render-player").length;
	if (inputsCreated < 5) {
		inputsCreated++;
		var involvedPlayerN = document.createElement("select");
		involvedPlayerN.setAttribute('id', loc + "-p" + inputsCreated);
		involvedPlayerN.setAttribute('class', "wbsc-render-player");
		involvedPlayerN.innerHTML = renderDefaultPlayerSelection();
		
		var addButton = document.getElementById(loc + "-add-button");
		container.insertBefore(involvedPlayerN, addButton);
	} else {
		alert("Currently only situations with up to 4 assists are supported");
	}
}

function unRenderInvolvedPlayerSelect(loc) {
	var container = document.getElementById(loc);
	
	var inputsCreated = container.getElementsByClassName("wbsc-render-player").length;
	if (inputsCreated > 1) {
		var involvedPlayerN = document.getElementById(loc + "-p" + inputsCreated);
		container.removeChild(involvedPlayerN);		
	} else {
		alert("There has to be at least 1 player involved");
	}
}


function renderDefaultPlayerSelection() {
	var options = [];
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

function renderHitLocationSelection() {
	var options = renderDefaultPlayerSelection();
	options.push('<option value="LL">LL</option>');
	options.push('<option value="LS">LS</option>');
	options.push('<option value="LC">LC</option>');
	options.push('<option value="MI">MI</option>');
	options.push('<option value="RC">RC</option>');
	options.push('<option value="RS">RS</option>');
	options.push('<option value="RL">RL</option>');
	return options;
}

function renderFCLocationSelection() {
	var options = [];
	options.push('<option value="4">2nd</option>');
	options.push('<option value="5">3rd</option>');
	options.push('<option value="2">HP</option>');
	return options;
}

function renderDefaultBrBase(base) {
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

function renderDefaultBrActionResult() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="safe">Safe</option>');
	options.push('<option value="out">Out</option>');
	return options;
}