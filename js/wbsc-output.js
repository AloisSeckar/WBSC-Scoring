function drawAction() {
	drawBackground();
	
	var playersValue = getPlayersSelection("batter-inputs");
	var validation = checkPlayersSelection(playersValue);
	if (validation === "") {
	    var specificAction = document.getElementById("specificAction");
		var specificActionValue = specificAction.value;
		
		var outcome = "advance";
		var base = 0;
		
		switch (specificActionValue) {
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
				playersValue = "";
				break;
		}
		
		if (outcome == "advance") {
			drawAdvance(base, specificActionValue, playersValue);
		
			var brBaseValue = document.getElementById("brBase").value;
			if (brBaseValue != null) {
				brBaseValue = parseInt(brBaseValue);
				var brActionValue = document.getElementById("brAction").value;
				var brSpecificActionValue = document.getElementById("brSpecificAction").value;
				
				var brPlayersValue = getPlayersSelection("batter-runner-inputs");
				var brValidation = checkPlayersSelection(brPlayersValue);
				if (brValidation === "") {
					switch (brActionValue) {
						case "safe":
							drawAdvance(brBaseValue, brSpecificActionValue, brPlayersValue);
							break;
						case "out":
							drawOut(brBaseValue, brSpecificActionValue, brPlayersValue);
							break;
					}
					
					drawConnector(base, brBaseValue);
				} else {
					alert(brValidation);
				}
			}
		} else {
			drawOut(0, specificActionValue, playersValue);
		}
	
	
	} else {
		alert(validation);
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

function drawOut(base, situation, players) {
	ctx.lineWidth = 7;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (base) {
		case 0:
		case 1:
			ctx.arc(h2, h2, h2 - 20, 0, 2 * Math.PI);
			break;
		case 2:
			ctx.arc(h2 - 38, h2 - 38, h3 - 12, 0, 2 * Math.PI);
			break;
		case 3:
			ctx.arc(w4, h2, h5, 0, 2 * Math.PI);
			break;
		case 4:
			ctx.arc(w4, h4 * 3, h5, 0, 2 * Math.PI);
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
				ctx.moveTo(w - gap, h2 + length);
				ctx.lineTo(w - gap, h2 - length);
				if (base2 > 2) {
					ctx.lineTo(w - gap, gap);
					ctx.lineTo(w2 - length, gap);
				}
				if (base2 > 3) {
					ctx.lineTo(gap, gap);
					ctx.lineTo(gap, h2 + length - 10);
				}
				break;
			case 2:
				ctx.moveTo(w2 + length, gap);
				ctx.lineTo(w2 - length, gap);
				if (base2 > 3) {
					ctx.lineTo(gap, gap);
					ctx.lineTo(gap, h2 + length -10);
				}
				break;
			case 3:
				ctx.moveTo(gap, h2 - length);
			    ctx.lineTo(gap, h2 + length - 10);
				break;
		}
		ctx.stroke();
	}
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
			} else if (situation.match(/O\d+/)) {
			    ctx.font = "bold 56px Verdana";
				ctx.fillText(situation.substring(1), w2 * 0.7, h2 - offset);
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
			} else if (situation.match(/O\d+/)) {
			    ctx.font = "bold 48px Verdana";
				offset = 18;
				ctx.fillText(situation.substring(1), w2 * 0.5, h2 + offset);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 0.5 + offset);
			}
			break;
		case 4:
		    if (situation.match(/O\d+/)) {
			    ctx.font = "bold 48px Verdana";
				offset = 18;
				ctx.fillText(situation.substring(1), w2 * 0.5, h2 * 1.5 + offset);
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