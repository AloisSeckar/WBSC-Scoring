function renderAction() {
	var bInput = getInput(input_b);
	var brInput = getInput(input_br);
	var r1Input = getInput(input_r1);
	var r2Input = getInput(input_r2);
	var r3Input = getInput(input_r3);
	
	var playersInvolved = 0;
	var validation = "";
    if (bInput != null) {
		playersInvolved++;
		validation += attachValidation(validation, bInput[input_validation]);
	}
	if (brInput != null) {
		validation += attachValidation(validation, brInput[input_validation]);
	}
    if (r1Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r1Input[input_validation]);
	}
	if (r2Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r2Input[input_validation]);
	}
	if (r3Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r3Input[input_validation]);
	}
	
	if (validation == "") {
		window.canvas.height = playersInvolved * h - ((playersInvolved - 1) * 8);
        window.batter = playersInvolved;
		window.vOffset = 0;
		if (r3Input != null) {
			r3Input[input_origBase] = 3;
			drawAction(r3Input, null);
			window.vOffset += h - 8;
		}
		if (r2Input != null) {
			r2Input[input_origBase] = 2;
			drawAction(r2Input, null);
			window.vOffset += h - 8;
		}
		if (r1Input != null) {
			r1Input[input_origBase] = 1;
			drawAction(r1Input, null);
			window.vOffset += h - 8;
		}
		if (bInput != null) {
			drawAction(bInput, brInput);
			window.vOffset += h - 8;
		}
	} else {
		alert("The given input is invalid:\n" + validation);
	}
}

function drawAction(mainInput, extraInput) {
	drawBackground();
	
	if (mainInput[input_origBase] != null) {
		drawAdvance(mainInput[input_origBase], "*", "");
	}
	
	var outcome = "advance";
	var base = parseInt(mainInput[input_base]);
	switch (mainInput[input_spec_action]) {
		case "EDF":
			base = 0;
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
			outcome = "out";
			base = 0;
			break;
		case "1B":
		case "EF":
		case "ET":
		case "EM":
		case "ED":
		case "O":
		case "FC":
			base = 1;
			break;
		case "2B":
		case "2BG":
			base = 2;
			break;
		case "3B":
			base = 3;
			break;
		case "HR":
		case "HRI":
			base = 4;
			break;
		case "BB":
		case "IBB":
		case "HP":
			base = 1;
			mainInput[input_position] = "";
			break;
		case "A":
			mainInput[input_position] = "";
			break;
		case "TO":
		case "FO":
			outcome = "out";
			mainInput[input_spec_action] = "";
			break;
	}
	
	if (outcome == "advance") {
		drawAdvance(base, mainInput[input_spec_action], mainInput[input_position]);
	
		if (extraInput != null) {
			var extraBaseValue = parseInt(extraInput[input_base]);
			switch (extraInput[input_base_action]) {
				case "safe":
					drawAdvance(extraBaseValue, extraInput[input_spec_action], extraInput[input_position]);
					break;
				case "out":
					drawOut(extraBaseValue, extraInput[input_spec_action], extraInput[input_position]);
					break;
			}
			
			drawConnector(base, extraBaseValue);
		}
	} else {
		drawOut(base, mainInput[input_spec_action], mainInput[input_position]);
	}
}

function drawBackground() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0 + vOffset, w, h);
	
	ctx.lineWidth = 8;
	ctx.strokeStyle = '#00a7d7';
	
	ctx.strokeRect(4, 4 + vOffset, w - 8, h - 8);
	
	ctx.lineWidth = 4;
	
	ctx.beginPath();
	ctx.moveTo(w2, 0 + vOffset);
	ctx.lineTo(w2, h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(w2, h + vOffset);
	ctx.lineTo(w2, h - h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(0, h2 + vOffset);
	ctx.lineTo(w3, h2 + vOffset);
	ctx.stroke();
	ctx.moveTo(w, h2 + vOffset);
	ctx.lineTo(w - h3, h2 + vOffset);
	ctx.stroke();
}

function drawOut(base, situation, players) {
	ctx.lineWidth = 7;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (base) {
		case 0:
		case 1:
			ctx.arc(h2, h2 + vOffset, h2 - 20, 0, 2 * Math.PI);
			break;
		case 2:
			ctx.arc(h2 - 38, h2 - 38 + vOffset, h3 - 12, 0, 2 * Math.PI);
			break;
		case 3:
			ctx.arc(w4, h2 + vOffset, h5, 0, 2 * Math.PI);
			break;
		case 4:
			ctx.arc(w4, h4 * 3 + vOffset, h5, 0, 2 * Math.PI);
			break;
	}
	ctx.stroke();
	
	situationToWrite = situation + players;	
	writeSituation(base, situationToWrite);
}

function drawAdvance(base, situation, players) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	if (base > 0) {
		ctx.moveTo(w2, h - h3 + vOffset);
		ctx.lineTo(w - w3, h2 + vOffset);
	}
	if (base > 1) {
		ctx.lineTo(w2, h3 + vOffset);
	}
	if (base > 2) {
		ctx.lineTo(w3, h2 + vOffset);
	}
	if (base > 3) {
		ctx.lineTo(w2 + 3, h - h3 + 3 + vOffset);
	}
	ctx.stroke();
	
	situationToWrite = situation + players;
	writeSituation(base, situationToWrite);
}

function drawConnector(base1, base2) {
	if (base1 < 1 || base1 > 3 || base2 < 1 || base2 > 4 || base1 >= base2) {
		alert("Invalid input for consecutive action!");
	} else {
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		
		var gap = 16;
		var length = 35;
		
		ctx.beginPath();
		switch (base1) {
			case 1:
				ctx.moveTo(w - gap, h2 + length + vOffset);
				ctx.lineTo(w - gap, h2 - length + vOffset);
				if (base2 > 2) {
					ctx.lineTo(w - gap, gap + vOffset);
					ctx.lineTo(w2 - length, gap + vOffset);
				}
				if (base2 > 3) {
					ctx.lineTo(gap, gap + vOffset);
					ctx.lineTo(gap, h2 + length - 10 + vOffset);
				}
				break;
			case 2:
				ctx.moveTo(w2 + length, gap + vOffset);
				ctx.lineTo(w2 - length, gap + vOffset);
				if (base2 > 3) {
					ctx.lineTo(gap, gap + vOffset);
					ctx.lineTo(gap, h2 + length - 10 + vOffset);
				}
				break;
			case 3:
				ctx.moveTo(gap, h2 - length + vOffset);
			    ctx.lineTo(gap, h2 + length - 10 + vOffset);
				break;
		}
		ctx.stroke();
	}
}

function writeSituation(base, situation) {
	ctx.textAlign = "center";
	
	if (situation == "*") {
		ctx.fillStyle = "red";
	} else {
		ctx.fillStyle = "black";
	}
	
	ctx.font = "bold 48px Verdana";
	var offset = 20;
	
	switch (base) {
		case 0:
			if (situation.startsWith("EDF")) {
				esituation = "E" + situation.substring(3) + " DF";
				ctx.font = "bold 20px Verdana";
				ctx.fillText(esituation, w2 * 1.5 + 18, h2 * 1.5 + 50 + vOffset);
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
				ctx.fillText(situation, w2, h2 + offset + vOffset);
			}
			break;
		case 1:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 1.5 + 12, h2 * 1.5 + 25 + vOffset);
			} else if (situation.startsWith("1B")) {
				drawHitSymbol(1);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 35px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 1.5 + 12, h2 * 1.5 + 25 + vOffset);
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
				ctx.fillText(esituation, w2 * 1.5, h2 * 1.5 + offset + vOffset);
			} else {
				if (situation.length > 3) {
					ctx.font = "bold 36px Verdana";
				} 
				ctx.fillText(situation, w2 * 1.5, h2 * 1.5 + offset + vOffset);
			}
			break;
		case 2:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 1.5, h2 * 0.5 + offset + vOffset);
			} else if (situation.startsWith("2B")) {
				drawHitSymbol(2);
				if (situation.startsWith("2BG")) {
					ctx.font = "bold 35px Verdana";
					ctx.fillText(situation.substring(3), w2 * 1.5 + 22, h2 * 0.5 + vOffset);
					ctx.fillText("GR", w2 * 1.5 + 22, h2 * 0.5 + 35 + vOffset);
				} else {
					if (situation.substring(2).length > 1) {
						ctx.font = "bold 40px Verdana";
					}
					ctx.fillText(situation.substring(2), w2 * 1.5 + 15, h2 * 0.5 + 25 + vOffset);
				}
			} else if (situation.match(/O\d+/)) {
			    ctx.font = "bold 56px Verdana";
				ctx.fillText(situation.substring(1), w2 * 0.7, h2 - offset + vOffset);
			} else {
				ctx.fillText(situation, w2 * 1.5, h2 * 0.5 + offset + vOffset);
			}
			break;
		case 3:
			if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 0.5 + 15, h2 * 0.5 + 25 + vOffset);
			} else if (situation.startsWith("3B")) {
				drawHitSymbol(3);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + 15, h2 * 0.5 + 25 + vOffset);
			} else if (situation.match(/O\d+/)) {
			    ctx.font = "bold 48px Verdana";
				offset = 18;
				ctx.fillText(situation.substring(1), w2 * 0.5, h2 + offset + vOffset);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 0.5 + offset + vOffset);
			}
			break;
		case 4:
		    if (situation.startsWith("A")) {
				ctx.fillText(window.batter, w2 * 0.5, h2 * 1.5 + offset + vOffset);
			} else if (situation.match(/O\d+/)) {
			    ctx.font = "bold 48px Verdana";
				offset = 18;
				ctx.fillText(situation.substring(1), w2 * 0.5, h2 * 1.5 + offset + vOffset);
			} else if (situation.length > 3) {
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
				ctx.fillText(ipr + "HR", lOffset, h2 * 1.5 - 5 + vOffset);
				ctx.fillText(situation.substring(2), lOffset, h2 * 1.5 + 40 + vOffset);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 1.5 + offset + vOffset);
			}
			break;
	}
}

function drawHitSymbol(base) {
	ctx.lineWidth = 6;
	ctx.beginPath();
	switch (base) {
		case 1:
			ctx.moveTo(w2 + 25, h - 35 + vOffset);
			ctx.lineTo(w2 + 50, h2 + 25 + vOffset);
			ctx.moveTo(w2 + 30, h2 + 40 + vOffset);
			ctx.lineTo(w2 + 58, h2 + 45 + vOffset);
			break;
		case 2:
			ctx.moveTo(w2 + 25, h2 - 35 + vOffset);
			ctx.lineTo(w2 + 50, 25 + vOffset);
			ctx.moveTo(w2 + 30, 35 + vOffset);
			ctx.lineTo(w2 + 58, 40 + vOffset);
			ctx.moveTo(w2 + 28, 45 + vOffset);
			ctx.lineTo(w2 + 56, 50 + vOffset);
			break;
		case 3:
			ctx.moveTo(20, h2 - 35 + vOffset);
			ctx.lineTo(45, 25 + vOffset);
			ctx.moveTo(25, 35 + vOffset);
			ctx.lineTo(53, 40 + vOffset);
			ctx.moveTo(23, 45 + vOffset);
			ctx.lineTo(51, 50 + vOffset);
			ctx.moveTo(21, 55 + vOffset);
			ctx.lineTo(49, 60 + vOffset);
			break;
	}
	ctx.stroke();
}