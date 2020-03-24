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
	var batterInputsContainer = document.createElement("div");
	batterInputsContainer.setAttribute('id', "batter-inputs");
	batterInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var batterLabel = document.createElement("label");
	batterLabel.innerHTML = "<strong>Batter:<strong>";
	batterInputsContainer.appendChild(batterLabel);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var baseActionLabel = document.createElement("label");
	baseActionLabel.setAttribute('for', "baseAction");
	baseActionLabel.innerHTML = "Base action:";
	batterInputsContainer.appendChild(baseActionLabel);
	
	var baseAction = document.createElement("select");
	baseAction.setAttribute('id', "baseAction");
	baseAction.setAttribute('onchange', "changeBaseAction()");
	baseAction.innerHTML = renderDefaultBaseAction();
	batterInputsContainer.appendChild(baseAction);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var specificActionLabel = document.createElement("label");
	specificActionLabel.setAttribute('for', "specificAction");
	specificActionLabel.innerHTML = "Specific action:";
	batterInputsContainer.appendChild(specificActionLabel);
	
	var specificAction = document.createElement("select");
	specificAction.setAttribute('id', "specificAction");
	specificAction.setAttribute('onchange', "changeSpecificAction()");
	specificAction.innerHTML = '<option class="blank" />';
	batterInputsContainer.appendChild(specificAction);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var playerSelection1Label = document.createElement("label");
	playerSelection1Label.setAttribute('for', "playerSelection1");
	playerSelection1Label.innerHTML = "Player 1:";
	batterInputsContainer.appendChild(playerSelection1Label);
	
	var playerSelection1 = document.createElement("select");
	playerSelection1.setAttribute('id', "playerSelection1");
	playerSelection1.setAttribute('disabled', "disabled");
	playerSelection1.setAttribute('onchange', "changePlayerSelection()");
	batterInputsContainer.appendChild(playerSelection1);
	
	batterInputsContainer.appendChild(document.createElement("br"));
	
	var playerSelection2Label = document.createElement("label");
	playerSelection2Label.setAttribute('for', "playerSelection2");
	playerSelection2Label.innerHTML = "Player 2:";
	batterInputsContainer.appendChild(playerSelection2Label);
	
	var playerSelection2 = document.createElement("select");
	playerSelection2.setAttribute('id', "playerSelection2");
	playerSelection2.setAttribute('disabled', "disabled");
	batterInputsContainer.appendChild(playerSelection2);
	
	var container = document.getElementById("wbsc-inputs");
	container.appendChild(batterInputsContainer);
}

function renderInputsForRunningBatter() {
	var container = document.getElementById("wbsc-inputs");
	var toolbar = document.getElementById("wbsc-toolbar");
	
	var batterRunnerInputsContainer = document.createElement("div");
	batterRunnerInputsContainer.setAttribute('id', "batter-runner-inputs");
	batterRunnerInputsContainer.setAttribute('class', "wbsc-inputs");
	
	var brBaseLabel = document.createElement("label");
	brBaseLabel.setAttribute('for', "brBase");
	brBaseLabel.innerHTML = "Base:";
	batterRunnerInputsContainer.appendChild(brBaseLabel);
	
	var brBase = document.createElement("select");
	brBase.setAttribute('id', "brBase");
	brBase.innerHTML = renderDefaultBrBase(1);
	batterRunnerInputsContainer.appendChild(brBase);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brActionResultLabel = document.createElement("label");
	brActionResultLabel.setAttribute('for', "brActionResult");
	brActionResultLabel.innerHTML = "Action result:";
	batterRunnerInputsContainer.appendChild(brActionResultLabel);
	
	var brActionResult = document.createElement("select");
	brActionResult.setAttribute('id', "brActionResult");
	brActionResult.setAttribute('onchange', "changeBrActionResult()");
	brActionResult.innerHTML = renderDefaultBrActionResult();
	batterRunnerInputsContainer.appendChild(brActionResult);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brSpecificActionLabel = document.createElement("label");
	brSpecificActionLabel.setAttribute('for', "brSpecificAction");
	brSpecificActionLabel.innerHTML = "Specific action:";
	batterRunnerInputsContainer.appendChild(brSpecificActionLabel);
	
	var brSpecificAction = document.createElement("select");
	brSpecificAction.setAttribute('id', "brSpecificAction");
	batterRunnerInputsContainer.appendChild(brSpecificAction);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brPlayer1Label = document.createElement("label");
	brPlayer1Label.setAttribute('for', "brPlayer1");
	brPlayer1Label.innerHTML = "Player 1:";
	batterRunnerInputsContainer.appendChild(brPlayer1Label);
	
	var brPlayer1 = document.createElement("select");
	brPlayer1.setAttribute('id', "brPlayer1");
	brPlayer1.innerHTML = renderDefaultPlayerSelection();
	batterRunnerInputsContainer.appendChild(brPlayer1);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	var brPlayer2Label = document.createElement("label");
	brPlayer2Label.setAttribute('for', "brPlayer2");
	brPlayer2Label.innerHTML = "Player 2:";
	batterRunnerInputsContainer.appendChild(brPlayer2Label);
	
	var brPlayer2 = document.createElement("select");
	brPlayer2.setAttribute('id', "brPlayer2");
	brPlayer2.innerHTML = renderDefaultPlayerSelection();
	batterRunnerInputsContainer.appendChild(brPlayer2);
	
	batterRunnerInputsContainer.appendChild(document.createElement("br"));
	
	container.insertBefore(batterRunnerInputsContainer, toolbar);
	
	var renderBRButton = document.getElementById("batter-runner-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	renderBRButton.setAttribute('onclick', "unRenderInputsForRunningBatter()");
	renderBRButton.innerHTML = "- BR";
}

function unRenderInputsForRunningBatter() {
    var batterRunnerInputsContainer = document.getElementById("batter-runner-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(batterRunnerInputsContainer);
	
	var renderBRButton = document.getElementById("batter-runner-button");
	renderBRButton.setAttribute('class', "btn btn-info wbsc-render-button");
	renderBRButton.setAttribute('onclick', "renderInputsForRunningBatter()");
	renderBRButton.innerHTML = "+ BR";
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
	r1BaseLabel.setAttribute('for', "r1Base");
	r1BaseLabel.innerHTML = "Base:";
	r1InputsContainer.appendChild(r1BaseLabel);
	
	var r1Base = document.createElement("select");
	r1Base.setAttribute('id', "r1Base");
	r1Base.innerHTML = renderDefaultBrBase(1);
	r1InputsContainer.appendChild(r1Base);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1ActionResultLabel = document.createElement("label");
	r1ActionResultLabel.setAttribute('for', "r1ActionResult");
	r1ActionResultLabel.innerHTML = "Action result:";
	r1InputsContainer.appendChild(r1ActionResultLabel);
	
	var r1ActionResult = document.createElement("select");
	r1ActionResult.setAttribute('id', "r1ActionResult");
	r1ActionResult.setAttribute('onchange', "changeRunnerActionResult()");
	r1ActionResult.innerHTML = renderDefaultBrActionResult();
	r1InputsContainer.appendChild(r1ActionResult);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1SpecificActionLabel = document.createElement("label");
	r1SpecificActionLabel.setAttribute('for', "r1SpecificAction");
	r1SpecificActionLabel.innerHTML = "Specific action:";
	r1InputsContainer.appendChild(r1SpecificActionLabel);
	
	var r1SpecificAction = document.createElement("select");
	r1SpecificAction.setAttribute('id', "r1SpecificAction");
	r1InputsContainer.appendChild(r1SpecificAction);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1Player1Label = document.createElement("label");
	r1Player1Label.setAttribute('for', "r1Player1");
	r1Player1Label.innerHTML = "Player 1:";
	r1InputsContainer.appendChild(r1Player1Label);
	
	var r1Player1 = document.createElement("select");
	r1Player1.setAttribute('id', "r1Player1");
	r1Player1.innerHTML = renderDefaultPlayerSelection();
	r1InputsContainer.appendChild(r1Player1);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	var r1Player2Label = document.createElement("label");
	r1Player2Label.setAttribute('for', "r1Player2");
	r1Player2Label.innerHTML = "Player 2:";
	r1InputsContainer.appendChild(r1Player2Label);
	
	var r1Player2 = document.createElement("select");
	r1Player2.setAttribute('id', "r1Player2");
	r1Player2.innerHTML = renderDefaultPlayerSelection();
	r1InputsContainer.appendChild(r1Player2);
	
	r1InputsContainer.appendChild(document.createElement("br"));
	
	container.insertBefore(r1InputsContainer, toolbar);
	
	var runnerButton = document.getElementById("runner-1-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner1()");
	runnerButton.innerHTML = "- R1";
}

function unRenderInputsForRunner1() {
    var runner1InputsContainer = document.getElementById("runner-1-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner1InputsContainer);
	
	var runnerButton = document.getElementById("runner-1-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner1()");
	runnerButton.innerHTML = "+ R1";
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
	r2BaseLabel.setAttribute('for', "r2Base");
	r2BaseLabel.innerHTML = "Base:";
	r2InputsContainer.appendChild(r2BaseLabel);
	
	var r2Base = document.createElement("select");
	r2Base.setAttribute('id', "r2Base");
	r2Base.innerHTML = renderDefaultBrBase(1);
	r2InputsContainer.appendChild(r2Base);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2ActionResultLabel = document.createElement("label");
	r2ActionResultLabel.setAttribute('for', "r2ActionResult");
	r2ActionResultLabel.innerHTML = "Action result:";
	r2InputsContainer.appendChild(r2ActionResultLabel);
	
	var r2ActionResult = document.createElement("select");
	r2ActionResult.setAttribute('id', "r2ActionResult");
	r2ActionResult.setAttribute('onchange', "changeRunnerActionResult()");
	r2ActionResult.innerHTML = renderDefaultBrActionResult();
	r2InputsContainer.appendChild(r2ActionResult);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2SpecificActionLabel = document.createElement("label");
	r2SpecificActionLabel.setAttribute('for', "r2SpecificAction");
	r2SpecificActionLabel.innerHTML = "Specific action:";
	r2InputsContainer.appendChild(r2SpecificActionLabel);
	
	var r2SpecificAction = document.createElement("select");
	r2SpecificAction.setAttribute('id', "r2SpecificAction");
	r2InputsContainer.appendChild(r2SpecificAction);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2Player2Label = document.createElement("label");
	r2Player2Label.setAttribute('for', "r2Player2");
	r2Player2Label.innerHTML = "Player 1:";
	r2InputsContainer.appendChild(r2Player2Label);
	
	var r2Player2 = document.createElement("select");
	r2Player2.setAttribute('id', "r2Player2");
	r2Player2.innerHTML = renderDefaultPlayerSelection();
	r2InputsContainer.appendChild(r2Player2);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	var r2Player2Label = document.createElement("label");
	r2Player2Label.setAttribute('for', "r2Player2");
	r2Player2Label.innerHTML = "Player 2:";
	r2InputsContainer.appendChild(r2Player2Label);
	
	var r2Player2 = document.createElement("select");
	r2Player2.setAttribute('id', "r2Player2");
	r2Player2.innerHTML = renderDefaultPlayerSelection();
	r2InputsContainer.appendChild(r2Player2);
	
	r2InputsContainer.appendChild(document.createElement("br"));
	
	container.insertBefore(r2InputsContainer, toolbar);
	
	var runnerButton = document.getElementById("runner-2-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner2()");
	runnerButton.innerHTML = "- R2";
}

function unRenderInputsForRunner2() {
    var runner2InputsContainer = document.getElementById("runner-2-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner2InputsContainer);
	
	var runnerButton = document.getElementById("runner-2-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner2()");
	runnerButton.innerHTML = "+ R2";
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
	r3BaseLabel.setAttribute('for', "r3Base");
	r3BaseLabel.innerHTML = "Base:";
	r3InputsContainer.appendChild(r3BaseLabel);
	
	var r3Base = document.createElement("select");
	r3Base.setAttribute('id', "r3Base");
	r3Base.innerHTML = renderDefaultBrBase(1);
	r3InputsContainer.appendChild(r3Base);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3ActionResultLabel = document.createElement("label");
	r3ActionResultLabel.setAttribute('for', "r3ActionResult");
	r3ActionResultLabel.innerHTML = "Action result:";
	r3InputsContainer.appendChild(r3ActionResultLabel);
	
	var r3ActionResult = document.createElement("select");
	r3ActionResult.setAttribute('id', "r3ActionResult");
	r3ActionResult.setAttribute('onchange', "changeRunnerActionResult()");
	r3ActionResult.innerHTML = renderDefaultBrActionResult();
	r3InputsContainer.appendChild(r3ActionResult);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3SpecificActionLabel = document.createElement("label");
	r3SpecificActionLabel.setAttribute('for', "r3SpecificAction");
	r3SpecificActionLabel.innerHTML = "Specific action:";
	r3InputsContainer.appendChild(r3SpecificActionLabel);
	
	var r3SpecificAction = document.createElement("select");
	r3SpecificAction.setAttribute('id', "r3SpecificAction");
	r3InputsContainer.appendChild(r3SpecificAction);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3Player3Label = document.createElement("label");
	r3Player3Label.setAttribute('for', "r3Player3");
	r3Player3Label.innerHTML = "Player 1:";
	r3InputsContainer.appendChild(r3Player3Label);
	
	var r3Player3 = document.createElement("select");
	r3Player3.setAttribute('id', "r3Player3");
	r3Player3.innerHTML = renderDefaultPlayerSelection();
	r3InputsContainer.appendChild(r3Player3);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	var r3Player3Label = document.createElement("label");
	r3Player3Label.setAttribute('for', "r3Player3");
	r3Player3Label.innerHTML = "Player 2:";
	r3InputsContainer.appendChild(r3Player3Label);
	
	var r3Player3 = document.createElement("select");
	r3Player3.setAttribute('id', "r3Player3");
	r3Player3.innerHTML = renderDefaultPlayerSelection();
	r3InputsContainer.appendChild(r3Player3);
	
	r3InputsContainer.appendChild(document.createElement("br"));
	
	container.insertBefore(r3InputsContainer, toolbar);
	
	var runnerButton = document.getElementById("runner-3-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-unrender-button");
	runnerButton.setAttribute('onclick', "unRenderInputsForRunner3()");
	runnerButton.innerHTML = "- R3";
}

function unRenderInputsForRunner3() {
    var runner3InputsContainer = document.getElementById("runner-3-inputs");
	
	var container = document.getElementById("wbsc-inputs");
    container.removeChild(runner3InputsContainer);
	
	var runnerButton = document.getElementById("runner-3-button");
	runnerButton.setAttribute('class', "btn btn-info wbsc-render-button");
	runnerButton.setAttribute('onclick', "renderInputsForRunner3()");
	runnerButton.innerHTML = "+ R3";
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

function renderDefaultPlayerSelection() {
	var options = [];
	options.push('<option value=""></option>');
	options.push('<option value="1">Pitcher (P)</option>');
	options.push('<option value="2">Catcher (C)</option>');
	options.push('<option value="3">1st Baseman (1B)</option>');
	options.push('<option value="4">2nd Baseman (2B)</option>');
	options.push('<option value="5">3rd Baseman (3B)</option>');
	options.push('<option value="6">Shortstop (SS)</option>');
	options.push('<option value="7">Left Fielder (LF)</option>');
	options.push('<option value="8">Center Fielder (CF)</option>');
	options.push('<option value="9">Right Fielder (RF)</option>');
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