function init() {
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	
	window.w = canvas.width;
	window.h = canvas.height;
	window.w2 = w / 2;
	window.w3 = w / 3;
	window.h2 = h / 2;
	window.h3 = h / 3;
	
	renderInputsForBatter();
	drawBackground();
	
	window.baseAction = document.getElementById("baseAction");
	window.specificAction = document.getElementById("specificAction");
	window.playerSelection1 = document.getElementById("playerSelection1");
	window.playerSelection2 = document.getElementById("playerSelection2");
}

function changeBaseAction() {
	
	var actionOptions = [];

	var baseActionValue = baseAction.value;
	switch (baseActionValue) {
		case "StrikeOut":
			actionOptions.push('<option value="KS">Strike out swinging</option>');
			actionOptions.push('<option value="KL">Strike out looking</option>');
			break;
		case "GroundOut":
			actionOptions.push('<option value="GOU">Ground out (unassisted)</option>');
			actionOptions.push('<option value="GO">Ground out</option>');
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
	
	specificAction.innerHTML = actionOptions;
	
	changeSpecificAction();
}

function changeSpecificAction() {
	var enable1 = "disabled";
	var enable2 = "disabled";
	var enhance = false;
	var fc = false;
	
	var specificActionValue = specificAction.value;
	switch (specificActionValue) {
		case "FC":
			fc = true;
		case "GO":
		case "EM":
			enable1 = "";
			enable2 = "";
			break;
		case "1B":
		case "2B":
		case "3B":
		case "HR":
		case "2BG":
		case "HRI":
			enhance = true;
		case "GOU":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
		case "O":
		case "EF":
		case "ET":
		case "ED":
		case "EDF":
			enable1 = "";
			break;
	}
	
	enhancePlayerSelection(enhance, fc);
	enablePlayerSelection(enable1, enable2);
	changePlayerSelection(fc);
}	

function changePlayerSelection(fc) {
	if (fc === false && !playerSelection2.disabled) {
		var player1Value = playerSelection1.value;
		var playerOptions = [];
		
		if (player1Value != 1) {
			playerOptions.push('<option value="1">Pitcher (P)</option>');
		}
		if (player1Value != 2) {
			playerOptions.push('<option value="2">Catcher (C)</option>');
		}
		if (player1Value != 3) {
			playerOptions.push('<option value="3">1st Baseman (1B)</option>');
		}
		if (player1Value != 4) {
			playerOptions.push('<option value="4">2nd Baseman (2B)</option>');
		}
		if (player1Value != 5) {
			playerOptions.push('<option value="5">3rd Baseman (3B)</option>');
		}
		if (player1Value != 6) {
			playerOptions.push('<option value="6">Shortstop (SS)</option>');
		}
		if (player1Value != 7) {
			playerOptions.push('<option value="7">Left Fielder (LF)</option>');
		}
		if (player1Value != 8) {
			playerOptions.push('<option value="8">Center Fielder (CF)</option>');
		}
		if (player1Value != 9) {
			playerOptions.push('<option value="9">Right Fielder (RF)</option>');
		}
		
		playerSelection2.innerHTML = playerOptions;
	}
}

function enablePlayerSelection(enable1, enable2) {
	playerSelection1.disabled = enable1;
	if (enable1 === "disabled") {
		playerSelection1.value = '';
	}
	
	playerSelection2.disabled = enable2;
	if (enable2 === "disabled") {
		playerSelection2.value = '';
	}
}

function enhancePlayerSelection(enhance, fc) {
	
	var playerOptions = [];
	
	playerOptions.push('<option value="1">Pitcher (P)</option>');
	playerOptions.push('<option value="2">Catcher (C)</option>');
	playerOptions.push('<option value="3">1st Baseman (1B)</option>');
	playerOptions.push('<option value="4">2nd Baseman (2B)</option>');
	playerOptions.push('<option value="5">3rd Baseman (3B)</option>');
	playerOptions.push('<option value="6">Shortstop (SS)</option>');
	playerOptions.push('<option value="7">Left Fielder (LF)</option>');
	playerOptions.push('<option value="8">Center Fielder (CF)</option>');
	playerOptions.push('<option value="9">Right Fielder (RF)</option>');
	
	
	if (fc === true) {
		var player2Options = [];
		
		player2Options.push('<option value="4">2nd base</option>');
		player2Options.push('<option value="5">3rd base</option>');
		player2Options.push('<option value="2">Home plate</option>');
		
		playerSelection2.innerHTML = player2Options;
	} else {
		playerSelection2.innerHTML = playerOptions;
	}
	
	if (enhance === true) {
		playerOptions.push('<option value="LL">Left line (LL)</option>');
		playerOptions.push('<option value="LS">Left side (LS)</option>');
		playerOptions.push('<option value="LC">Left center (LC)</option>');
		playerOptions.push('<option value="MI">Middle inside (MI)</option>');
		playerOptions.push('<option value="RC">Right center (RC)</option>');
		playerOptions.push('<option value="RS">Right side (RS)</option>');
		playerOptions.push('<option value="RL">Right line (RL)</option>');
	}
	
	playerSelection1.innerHTML = playerOptions;
}

function drawAction() {
	drawBackground();
	
	var specificActionValue = specificAction.value;
	var player1Value = playerSelection1.value;
	var player2Value = playerSelection2.value;
	
	switch (specificActionValue) {
		case "EDF":
			drawAdvance(0, specificActionValue, player1Value, player2Value);
			break;
		case "KS":
		case "KL":
		case "GO":
		case "GOU":
		case "F":
		case "P":
		case "L":
		case "FF":
		case "FP":
		case "FL":
			drawOut(0, specificActionValue, player1Value, player2Value);
			break;
		case "1B":
		case "EF":
		case "ET":
		case "EM":
		case "ED":
		case "O":
		case "FC":
			drawAdvance(1, specificActionValue, player1Value, player2Value);
			break;
		case "2B":
		case "2BG":
			drawAdvance(2, specificActionValue, player1Value, player2Value);
			break;
		case "3B":
			drawAdvance(3, specificActionValue, player1Value, player2Value);
			break;
		case "HR":
		case "HRI":
			drawAdvance(4, specificActionValue, player1Value, player2Value);
			break;
		case "BB":
		case "IBB":
		case "HP":
			drawAdvance(1, specificActionValue, "", "");
			break;
	}
}

function drawBackground() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	
	ctx.lineWidth = 8;
	ctx.strokeStyle = '#00a7d7';
	
	ctx.strokeRect(4, 4, w - 8, h - 8);
	
	ctx.lineWidth = 4;
	
	ctx.beginPath();
	ctx.moveTo(w2, 0);
	ctx.lineTo(w2, h3);
	ctx.stroke();
	ctx.moveTo(w2, h);
	ctx.lineTo(w2, h - h3);
	ctx.stroke();
	ctx.moveTo(0, h2);
	ctx.lineTo(w3, h2);
	ctx.stroke();
	ctx.moveTo(w, h2);
	ctx.lineTo(w - h3, h2);
	ctx.stroke();
}

function drawOut(base, situation, player1, player2) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (base) {
		case 0:
			ctx.arc(h2, h2, h2 - 20, 0, 2 * Math.PI);
			break;
	}
	ctx.stroke();
	
	situationToWrite = situation + player1 + player2;	
	writeSituation(base, situationToWrite);
}

function drawAdvance(base, situation, player1, player2) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	if (base > 0) {
		ctx.moveTo(w2, h - h3);
		ctx.lineTo(w - w3, h2);
	}
	if (base > 1) {
		ctx.lineTo(w2, h3);
	}
	if (base > 2) {
		ctx.lineTo(w3, h2);
	}
	if (base > 3) {
		ctx.lineTo(w2 + 3, h - h3 + 3);
	}
	ctx.stroke();
	
	situationToWrite = situation + player1 + player2;
	writeSituation(base, situationToWrite);
}

function writeSituation(base, situation) {
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	
	ctx.font = "bold 48px Verdana";
	var offset = 20;
	
	switch (base) {
		case 0:
			if (situation.startsWith("EDF")) {
				esituation = "E" + situation.substring(3) + " DF";
				ctx.font = "bold 20px Verdana";
				ctx.fillText(esituation, w2 * 1.5 + 18, h2 * 1.5 + 50);
			} else {
				if (situation.startsWith("GO")) {
					if (situation.startsWith("GOU")) {
						situation = situation.substring(3);
					} else {
						situation = situation.substring(2);
					}
				}
				if (situation.length < 3) {
					ctx.font = "bold 120px Verdana";
					offset = 46
				} else {
					ctx.font = "bold 90px Verdana";
					offset = 33;
				}
				ctx.fillText(situation, w2, h2 + offset);
			}
			break;
		case 1:
			if (situation.startsWith("1B")) {
				drawHitSymbol(1);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 35px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 1.5 + 12, h2 * 1.5 + 25);
			} else if (situation.startsWith("E")) {
				if (situation.startsWith("EM")) {
					esituation = situation.substring(2, 3) + "E" + situation.substring(3);
				} else if (situation.startsWith("EF")) {
					esituation = "E" + situation.substring(2);
					ctx.font = "bold 56px Verdana";
					offset = 25;
				} else if (situation.startsWith("ED")) {
					esituation = "E" + situation.substring(2) + "F";
				} else {
					esituation = "E" + situation.substring(2) + situation.substring(1, 2);
				}
				ctx.fillText(esituation, w2 * 1.5, h2 * 1.5 + offset);
			} else {
				if (situation.length > 3) {
					ctx.font = "bold 36px Verdana";
				} 
				ctx.fillText(situation, w2 * 1.5, h2 * 1.5 + offset);
			}
			break;
		case 2:
			if (situation.startsWith("2B")) {
				drawHitSymbol(2);
				if (situation.startsWith("2BG")) {
					ctx.font = "bold 35px Verdana";
					ctx.fillText(situation.substring(3), w2 * 1.5 + 22, h2 * 0.5);
					ctx.fillText("GR", w2 * 1.5 + 22, h2 * 0.5 + 35);
				} else {
					if (situation.substring(2).length > 1) {
						ctx.font = "bold 40px Verdana";
					}
					ctx.fillText(situation.substring(2), w2 * 1.5 + 15, h2 * 0.5 + 25);
				}
			} else {
				ctx.fillText(situation, w2 * 1.5, h2 * 0.5 + offset);
			}
			break;
		case 3:
			if (situation.startsWith("3B")) {
				drawHitSymbol(3);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + 15, h2 * 0.5 + 25);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 0.5 + offset);
			}
			break;
		case 4:
			if (situation.length > 3) {
				if (situation.startsWith("HRI")) {
					ipr = "I";
					situation = "HR" + situation.substring(3);
				} else {
					ipr = "";
				}
				if (situation.substring(2).length > 4) {
					ctx.font = "bold 35px Verdana";
					var lOffset = 65;
				} else if (situation.substring(2).length > 3) {
					ctx.font = "bold 40px Verdana";
					var lOffset = 60;
				} else {
					ctx.font = "bold 40px Verdana";
					var lOffset = 55;
				}
				ctx.fillText(ipr + "HR", lOffset, h2 * 1.5 - 5);
				ctx.fillText(situation.substring(2), lOffset, h2 * 1.5 + 40);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 1.5 + offset);
			}
			break;
	}
}

function drawHitSymbol(base) {
	ctx.lineWidth = 6;
	ctx.beginPath();
	switch (base) {
		case 1:
			ctx.moveTo(w2 + 25, h - 35);
			ctx.lineTo(w2 + 50, h2 + 25);
			ctx.moveTo(w2 + 30, h2 + 40);
			ctx.lineTo(w2 + 58, h2 + 45);
			break;
		case 2:
			ctx.moveTo(w2 + 25, h2 - 35);
			ctx.lineTo(w2 + 50, 25);
			ctx.moveTo(w2 + 30, 35);
			ctx.lineTo(w2 + 58, 40);
			ctx.moveTo(w2 + 28, 45);
			ctx.lineTo(w2 + 56, 50);
			break;
		case 3:
			ctx.moveTo(20, h2 - 35);
			ctx.lineTo(45, 25);
			ctx.moveTo(25, 35);
			ctx.lineTo(53, 40);
			ctx.moveTo(23, 45);
			ctx.lineTo(51, 50);
			ctx.moveTo(21, 55);
			ctx.lineTo(49, 60);
			break;
	}
	ctx.stroke();
}