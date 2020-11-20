function renderAction() {
	var bInput = getInput(input_b);
	var b1Input = getInput(input_b1);
	var b2Input = getInput(input_b2);
	var b3Input = getInput(input_b3);
	var r1Input = getInput(input_r1);
	var r1aInput = getInput(input_r1a);
	var r1bInput = getInput(input_r1b);
	var r2Input = getInput(input_r2);
	var r2aInput = getInput(input_r2a);
	var r3Input = getInput(input_r3);
	
	var playersInvolved = 0;
	var validation = "";
	
    if (bInput != null) {
		playersInvolved++;
		validation += attachValidation(validation, bInput[input_validation]);
	}
	
	var extraBatterInput = [];
	if (b1Input != null) {
		validation += attachValidation(validation, b1Input[input_validation]);
		extraBatterInput.push(b1Input);
	}
	if (b2Input != null) {
		validation += attachValidation(validation, b2Input[input_validation]);
		extraBatterInput.push(b2Input);
	}
	if (b3Input != null) {
		validation += attachValidation(validation, b3Input[input_validation]);
		extraBatterInput.push(b3Input);
	}
	
    if (r1Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r1Input[input_validation]);
	}
	
	var extraR1Input = [];
    if (r1aInput != null) {
		validation += attachValidation(validation, r1aInput[input_validation]);
		extraR1Input.push(r1aInput);
	}
    if (r1bInput != null) {
		validation += attachValidation(validation, r1bInput[input_validation]);
		extraR1Input.push(r1bInput);
	}
	
	if (r2Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r2Input[input_validation]);
	}
	
	var extraR2Input = [];
    if (r2aInput != null) {
		validation += attachValidation(validation, r2aInput[input_validation]);
		extraR2Input.push(r2aInput);
	}
	
	if (r3Input != null) {
		playersInvolved++;
		validation += attachValidation(validation, r3Input[input_validation]);
	}
	
	if (validation == "") {
		window.canvas.height = playersInvolved * h - ((playersInvolved - 1) * 8);
        window.batter = playersInvolved;
		window.vOffset = 0;
		window.hOffset = 75;
		var displayed = 1;
		if (r3Input != null) {
			r3Input[input_origBase] = 3;
			drawAction(displayed++, r3Input, null, true);
			window.vOffset += h - 8;
		}
		if (r2Input != null) {
			r2Input[input_origBase] = 2;
			drawAction(displayed++, r2Input, extraR2Input, true);
			window.vOffset += h - 8;
		}
		if (r1Input != null) {
			r1Input[input_origBase] = 1;
			drawAction(displayed++, r1Input, extraR1Input, true);
			window.vOffset += h - 8;
		}
		if (bInput != null) {
			drawAction(displayed++, bInput, extraBatterInput, true);
			window.vOffset += h - 8;
		}
	} else {
		alert("The given input is invalid:\n" + validation);
	}
}

function drawAction(battingOrder, mainInput, extraInput, clear) {
	if (clear) {
		drawBackground(battingOrder);
	}
	
	if (mainInput[input_origBase] != null) {
		
		output = [];
		output[output_base] = mainInput[input_origBase];
		if (mainInput[input_tie] == true) {
			output[output_text_1] = "TIE";
		} else {
			output[output_text_1] = "*";
		}
		
		drawAdvance(output);
	}
	
	var output = processInput(mainInput);
	if (output[output_out] == true) {
		drawOut(output);
	} else {
		drawAdvance(output);
		
		if (extraInput != null) {
			for (i = 0; i < extraInput.length; i++) {
				drawAction(battingOrder, extraInput[i], null, false);
				drawConnector(parseInt(mainInput[input_base]), parseInt(extraInput[i][input_base]));
			}
		}
	}
}

function drawBackground(battingOrder) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0 + vOffset, w + hOffset, h);
	
	ctx.lineWidth = 8;
	ctx.strokeStyle = '#00a7d7';
	
	ctx.strokeRect(4, 4 + vOffset, hOffset, h - 8);
	
	ctx.font = "bold 60px Verdana";
	ctx.textAlign = "center";
	ctx.fillStyle = '#00a7d7';
	ctx.fillText(battingOrder, 40,  h2 + 25 + vOffset);
	
	ctx.strokeRect(4 + hOffset, 4 + vOffset, w - 8, h - 8);
	
	ctx.lineWidth = 4;
	
	ctx.beginPath();
	ctx.moveTo(w2 + hOffset, 0 + vOffset);
	ctx.lineTo(w2 + hOffset, h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(w2 + hOffset, h + vOffset);
	ctx.lineTo(w2 + hOffset, h - h3 + vOffset);
	ctx.stroke();
	ctx.moveTo(0 + hOffset, h2 + vOffset);
	ctx.lineTo(w3 + hOffset, h2 + vOffset);
	ctx.stroke();
	ctx.moveTo(w + hOffset, h2 + vOffset);
	ctx.lineTo(w - h3 + hOffset, h2 + vOffset);
	ctx.stroke();
}

function drawOut(output) {
	ctx.lineWidth = 7;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (output[output_base]) {
		case 0:
		case 1:
			if (output[output_text_1] != "LT") {
				ctx.arc(h2 + hOffset, h2 + vOffset, h2 - 15, 0, 2 * Math.PI);
			}
			break;
		case 2:
			drawAdvanceLine(1);
			ctx.moveTo(h2 - 38 + hOffset + h3 - 12, h2 - 38 + vOffset);
			ctx.arc(h2 - 38 + hOffset, h2 - 38 + vOffset, h3 - 12, 0, 2 * Math.PI);
			break;
		case 3:
			drawAdvanceLine(2);
			ctx.moveTo(w4 + hOffset + h5, h2 + vOffset);
			ctx.arc(w4 + hOffset, h2 + vOffset, h5, 0, 2 * Math.PI);
			break;
		case 4:
			drawAdvanceLine(3);
			ctx.moveTo(w4 + hOffset + h5, h4 * 3 + vOffset);
			ctx.arc(w4 + hOffset, h4 * 3 + vOffset, h5, 0, 2 * Math.PI);
			break;
	}
	ctx.stroke();
	
	writeSituation(output);
}

function drawAdvance(output) {
	drawAdvanceLine(output[output_base]);
	writeSituation(output);
}

function drawAdvanceLine(base) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	if (base > 0) {
		ctx.moveTo(w2 + hOffset, h - h3 + vOffset);
		ctx.lineTo(w - w3 + hOffset, h2 + vOffset);
	}
	if (base > 1) {
		ctx.lineTo(w2 + hOffset, h3 + vOffset);
	}
	if (base > 2) {
		ctx.lineTo(w3 + hOffset, h2 + vOffset);
	}
	if (base > 3) {
		ctx.lineTo(w2 + 3 + hOffset, h - h3 + 3 + vOffset);
	}
	ctx.stroke();
}

function drawConnector(base1, base2) {
	if (base1 < 1 || base1 > 3 || base2 < 1 || base2 > 4 || base1 >= base2) {
		alert("Invalid input for consecutive action!");
	} else {
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		
		var gap = 16;
		var length = 35;
		var arc = 20;
		
		ctx.beginPath();
		switch (base1) {
			case 1:
				ctx.moveTo(w - gap + hOffset, h2 + length + vOffset);
				ctx.lineTo(w - gap + hOffset, h2 - length + vOffset);
				if (base2 > 2) {
					ctx.lineTo(w - gap + hOffset, gap + vOffset + arc);
					ctx.moveTo(w - gap + hOffset - arc, gap + vOffset);
					ctx.lineTo(w2 - length + hOffset, gap + vOffset);
					ctx.arc(w - gap + hOffset - arc, gap + vOffset + arc, arc, 1.5*Math.PI, 0);
				}
				if (base2 > 3) {
					ctx.moveTo(w2 - length + hOffset, gap + vOffset);
					ctx.lineTo(gap + hOffset + arc, gap + vOffset);
					ctx.moveTo(gap + hOffset, gap + vOffset + arc);
					ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
					ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
				}
				break;
			case 2:
				ctx.moveTo(w2 + length + hOffset, gap + vOffset);
				ctx.lineTo(w2 - length + hOffset, gap + vOffset);
				if (base2 > 3) {
					ctx.moveTo(w2 - length + hOffset, gap + vOffset);
					ctx.lineTo(gap + hOffset + arc, gap + vOffset);
					ctx.moveTo(gap + hOffset, gap + vOffset + arc);
					ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
					ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
				}
				break;
			case 3:
				ctx.moveTo(gap + hOffset, h2 - length + vOffset);
			    ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
				break;
		}
		ctx.stroke();
	}
}

function writeSituation(output) {
    text1 = output[output_text_1];
	text2 = output[output_text_2];
	out = output[output_out];
	hit = output[output_hit];
	sub = output[output_sub];
	sup = output[output_sup];
	
	if (text1 == "*") {
		ctx.fillStyle = "red";
	} else {
		ctx.fillStyle = "black";
	}
	
	ctx.font = "bold 45px Verdana";
	offset = 20;
	
	switch (output[output_base]) {
		case 0:
			if (text1.endsWith("DF")) {
				ctx.font = "bold 20px Verdana";
				ctx.fillText(text1, w2 * 1.5 + 18 + hOffset, h2 * 1.5 + 50 + vOffset);
			} else {
				if (text2 != null) {
					ctx.font = "bold 75px Verdana";
					offset = -5;
					ctx.fillText(text1, w2 + hOffset, h2 + offset + vOffset);
				
					if (text2.length > 3) {
						ctx.font = "bold 60px Verdana";
						offset = 60;
					} else if (text2.length > 2) {
						ctx.font = "bold 72px Verdana";
						offset = 65;
					} else {
						ctx.font = "bold 90px Verdana";
						offset = 70;
					}
					ctx.fillText(text2, w2 + hOffset, h2 + offset + vOffset);	
				} else {
					if (text1.length > 5) {
						ctx.font = "bold 45px Verdana";
						offset = 16;
					} else if (text1.length > 4) {
						ctx.font = "bold 52px Verdana";
						offset = 20;
					} else if (text1.length > 3) {
						ctx.font = "bold 68px Verdana";
						offset = 26;
					} else if (text1.length > 2) {
						ctx.font = "bold 90px Verdana";
						offset = 34;
					} else {
						ctx.font = "bold 110px Verdana";
						offset = 42
					}
					ctx.fillText(text1, w2 + hOffset, h2 + offset + vOffset);
				}
			}
			if (sub != null) {
				ctx.font = "bold 40px Verdana";
				ctx.fillText(sub, w + hOffset - 30, h - 20 + vOffset);
			}
			if (sup != null) {
				if (sup == "14") {
					ctx.font = "bold 28px Verdana";
					ctx.fillText(sup, w + hOffset - 32, 38 + vOffset);
				} else {
					ctx.font = "bold 40px Verdana";
					ctx.fillText(sup, w + hOffset - 30, 42 + vOffset);
				}
			}
			break;
		case 1:
			if (hit) {
				drawHitSymbol(1);
				hitOffset = 15;
			} else {
				hitOffset = 0;
			}
			if (text2 != null) {
				offset = -5;
				ctx.fillText(text1, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
				
				if (text2.length > 4) {
					ctx.font = "bold 28px Verdana";
					offset = 36;
				} else if (text2.length > 3) {
					ctx.font = "bold 36px Verdana";
					offset = 38;
				} else {
					offset = 40;
				}
				ctx.fillText(text2, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
			} else {
				if (text1.length > 5) {
					ctx.font = "bold 24px Verdana";
					offset = 12;
				} else if (text1.length > 4) {
					ctx.font = "bold 30px Verdana";
					offset = 16;
				} else if (text1.length > 3) {
					ctx.font = "bold 38px Verdana";
					offset = 18;
				}
				ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 1.5 + offset + vOffset);
			}
			if (sub != null) {
				ctx.font = "bold 30px Verdana";
				ctx.fillText(sub, w + hOffset - 20, h - 62 + vOffset);
			}
			break;
		case 2:
			if (hit) {
				drawHitSymbol(1);
				hitOffset = 15;
			} else {
				hitOffset = 0;
			}
			if (out) {
				if (text2 != null) {
					row1font = "bold 56px Verdana";
					row2font = "bold 56px Verdana";
					row1offset = 45;
					row2offset = 6;
					if (text2.length > 3) {
						row1offset = 35;
						row2offset = 2;
						row2font = "bold 28px Verdana";
					} else if (text2.length > 2) {
						row1offset = 40;
						row2offset = 4;
						row2font = "bold 36px Verdana";
					}
					ctx.font = row1font;
					ctx.fillText(text1, w2 * 0.7 + hOffset, h2 - row1offset + vOffset);
					ctx.font = row2font;
					ctx.fillText(text2, w2 * 0.7 + hOffset, h2 + row2offset + vOffset);
				} else {
					if (text1.length > 4) {
						ctx.font = "bold 32px Verdana";
						offset = 26;
					} else if (text1.length > 3) {
						ctx.font = "bold 40px Verdana";
						offset = 23;
					}
					ctx.fillText(text1, w2 * 0.7 + hOffset, h2 - offset + vOffset);
					}
			} else {
				if (text2 != null) {
					row1font = "bold 40px Verdana";
					row1offset = 8;
					row2font = "bold 40px Verdana";
					row2offset = 30;
					if (text2.length > 4) {
						row1offset = 3;
						row2offset = 26;
						row2font = "bold 24px Verdana";
					} else if (text2.length > 3) {
						row1offset = 5;
						row2offset = 28;
						row2font = "bold 30px Verdana";
					}
					ctx.font = row1font;
					ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 - row1offset + vOffset);
					ctx.font = row2font;
					ctx.fillText(text2, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 + row2offset + vOffset);
				} else {
					if (text1.length > 5) {
						ctx.font = "bold 32px Verdana";
						offset = 12;
					} else if (text1.length > 4) {
						ctx.font = "bold 40px Verdana";
						offset = 14;
					} else {
						ctx.font = "bold 48px Verdana";
						offset = 18;
					}
					ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
				}
			}
			if (sup != null) {
				ctx.font = "bold 28px Verdana";
				ctx.fillText(sup, w2 * 2 - 15, 35 + vOffset);
			}
			break;
		case 3:
			if (hit) {
				drawHitSymbol(1);
				hitOffset = 15;
			} else {
				hitOffset = 0;
			}
			if (out) {
				if (text2 != null) {
					row1font = "bold 40px Verdana";
					row2font = "bold 40px Verdana";
					row1offset = 5;
					row2offset = 35;
					if (text2.length > 3) {
						row1offset = 4;
						row2offset = 26;
						row2font = "bold 28px Verdana";
					} else if (text2.length > 2) {
						row1offset = 3;
						row2offset = 28;
						row2font = "bold 34px Verdana";
					}
					ctx.font = row1font;
					ctx.fillText(text1, w2 * 0.5 + hOffset, h2 - offset + vOffset);
					ctx.font = row2font;
					ctx.fillText(text2, w2 * 0.5 + hOffset, h2 + row2offset + vOffset);
				} else {
					if (text1.length > 4) {
						ctx.font = "bold 24px Verdana";
						offset = 10;
					} else if (text1.length > 3) {
						ctx.font = "bold 30px Verdana";
						offset = 12;
					} else if (text1.length > 2) {
						ctx.font = "bold 38px Verdana";
						offset = 14;
					} else {
						ctx.font = "bold 48px Verdana";
						offset = 18;
					}
					ctx.fillText(text1, w2 * 0.5 + hOffset, h2 + offset + vOffset);
				}
			} else {
				if (text2 != null) {
					row1font = "bold 40px Verdana";
					row1offset = 8;
					row2font = "bold 40px Verdana";
					row2offset = 30;
					if (text2.length > 4) {
						row1offset = 3;
						row2offset = 26;
						row2font = "bold 24px Verdana";
					} else if (text2.length > 3) {
						row1offset = 5;
						row2offset = 28;
						row2font = "bold 30px Verdana";
					}
					ctx.font = row1font;
					ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 0.5 - offset + vOffset);
					ctx.font = row2font;
					ctx.fillText(text2, w2 * 0.5 + hOffset, h2 * 0.5 + row2offset + vOffset);
				} else {
					if (text1.length > 5) {
						ctx.font = "bold 32px Verdana";
						offset = 12;
					} else if (text1.length > 4) {
						ctx.font = "bold 40px Verdana";
						offset = 14;
					} else {
						ctx.font = "bold 48px Verdana";
						offset = 18;
					}
					ctx.fillText(text1, w2 * 0.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
				}
			}
			if (sup != null) {
				ctx.font = "bold 28px Verdana";
				ctx.fillText(sup, w2 * 1.5 - 5, h2 * 0.5 + 12 + vOffset);
			}
			break;
		case 4:
			if (text2 != null) {
				row1font = "bold 40px Verdana";
				row1offset = 8;
				row2font = "bold 40px Verdana";
				row2offset = 30;
				if (text2.length > 4) {
					row1offset = 3;
					row2offset = 26;
					row2font = "bold 24px Verdana";
				} else if (text2.length > 3) {
					row1offset = 5;
					row2offset = 28;
					row2font = "bold 30px Verdana";
				}
				ctx.font = row1font;
				ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 - offset + vOffset);
				ctx.font = row2font;
				ctx.fillText(text2, w2 * 0.5 + hOffset, h2 * 1.5 + row2offset + vOffset);
			} else {
				if (text1.length > 4) {
					ctx.font = "bold 24px Verdana";
					offset = 10;
				} else if (text1.length > 3) {
					ctx.font = "bold 30px Verdana";
					offset = 12;
				} else if (text1.length > 2) {
					ctx.font = "bold 38px Verdana";
					offset = 14;
				} else {
					ctx.font = "bold 48px Verdana";
					offset = 18;
				}
				ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
			}
			if (sup != null) {
				ctx.font = "bold 28px Verdana";
				ctx.fillText(sup, w2 * 1.5 + 2, h2 + 20 + vOffset);
			}
			break;
	}
}

function drawHitSymbol(base) {
	ctx.lineWidth = 6;
	ctx.beginPath();
	switch (base) {
		case 1:
			ctx.moveTo(w2 + 25 + hOffset, h - 35 + vOffset);
			ctx.lineTo(w2 + 50 + hOffset, h2 + 25 + vOffset);
			ctx.moveTo(w2 + 30 + hOffset, h2 + 40 + vOffset);
			ctx.lineTo(w2 + 58 + hOffset, h2 + 45 + vOffset);
			break;
		case 2:
			ctx.moveTo(w2 + 25 + hOffset, h2 - 35 + vOffset);
			ctx.lineTo(w2 + 50 + hOffset, 25 + vOffset);
			ctx.moveTo(w2 + 30 + hOffset, 35 + vOffset);
			ctx.lineTo(w2 + 58 + hOffset, 40 + vOffset);
			ctx.moveTo(w2 + 28 + hOffset, 45 + vOffset);
			ctx.lineTo(w2 + 56 + hOffset, 50 + vOffset);
			break;
		case 3:
			ctx.moveTo(20 + hOffset, h2 - 35 + vOffset);
			ctx.lineTo(45 + hOffset, 25 + vOffset);
			ctx.moveTo(25 + hOffset, 35 + vOffset);
			ctx.lineTo(53 + hOffset, 40 + vOffset);
			ctx.moveTo(23 + hOffset, 45 + vOffset);
			ctx.lineTo(51 + hOffset, 50 + vOffset);
			ctx.moveTo(21 + hOffset, 55 + vOffset);
			ctx.lineTo(49 + hOffset, 60 + vOffset);
			break;
	}
	ctx.stroke();
}