function renderInputsForBatter() {
	var container = document.getElementById("wbsc-inputs");
	
	var baseActionLabel = document.createElement("label");
	baseActionLabel.setAttribute('for', "baseAction");
	baseActionLabel.innerHTML = "Base action:";
	container.appendChild(baseActionLabel);
	
	var baseAction = document.createElement("select");
	baseAction.setAttribute('id', "baseAction");
	baseAction.setAttribute('onchange', "changeBaseAction()");
	baseAction.innerHTML = renderDefaultBaseAction();
	container.appendChild(baseAction);
	
	container.appendChild(document.createElement("br"));
	
	var specificActionLabel = document.createElement("label");
	specificActionLabel.setAttribute('for', "specificAction");
	specificActionLabel.innerHTML = "Specific action:";
	container.appendChild(specificActionLabel);
	
	var specificAction = document.createElement("select");
	specificAction.setAttribute('id', "specificAction");
	specificAction.setAttribute('onchange', "changeSpecificAction()");
	specificAction.innerHTML = '<option class="blank"  />';
	container.appendChild(specificAction);
	
	container.appendChild(document.createElement("br"));
	
	var playerSelection1Label = document.createElement("label");
	playerSelection1Label.setAttribute('for', "playerSelection1");
	playerSelection1Label.innerHTML = "Player 1:";
	container.appendChild(playerSelection1Label);
	
	var playerSelection1 = document.createElement("select");
	playerSelection1.setAttribute('id', "playerSelection1");
	playerSelection1.setAttribute('onchange', "changePlayerSelection()");
	playerSelection1.innerHTML = '<option class="blank"  />';
	container.appendChild(playerSelection1);
	
	container.appendChild(document.createElement("br"));
	
	var playerSelection2Label = document.createElement("label");
	playerSelection2Label.setAttribute('for', "playerSelection2");
	playerSelection2Label.innerHTML = "Player 2:";
	container.appendChild(playerSelection2Label);
	
	var playerSelection2 = document.createElement("select");
	playerSelection2.setAttribute('id', "playerSelection2");
	playerSelection2.setAttribute('disabled', "disabled");
	container.appendChild(playerSelection2);
	
	container.appendChild(document.createElement("br"));
	
	var generateButton = document.createElement("button");
	generateButton.setAttribute('type', "button");
	generateButton.setAttribute('class', "btn btn-primary wbsc-button");
	generateButton.setAttribute('onclick', "drawAction()");
	generateButton.innerHTML = "Generate action";
	container.appendChild(generateButton);
}

function renderInputsForRunningBatter() {
}

/*
function renderInputsForRunner() {
}
*/

function renderDefaultBaseAction() {
	var options = [];
	options.push('<option class="blank" />');
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
	options.push('<option class="blank" />');
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