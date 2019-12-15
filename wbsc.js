function init() {
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	
	window.w = canvas.width;
	window.h = canvas.height;
	window.w2 = w / 2;
	window.w3 = w / 3;
	window.h2 = h / 2;
	window.h3 = h / 3;
	
	drawBackground();
	
	window.baseAction = document.getElementById("baseAction");
	window.specificAction = document.getElementById("specificAction");
}

function changeBaseAction() {
	
	var actionOptions = [];

	var baseActionValue = baseAction.value;
	switch (baseActionValue) {
		case "StrikeOut":
			actionOptions.push('<option value="Ks">Strike out swinging</option>');
			actionOptions.push('<option value="Kl">Strike out looking</option>');
			break;
		case "GroundOut":
			actionOptions.push('<option value="3">Ground out 1B unassisted</option>');
			actionOptions.push('<option value="13">Ground out P to 1B</option>');
			actionOptions.push('<option value="43">Ground out 2B to 1B</option>');
			actionOptions.push('<option value="53">Ground out 3B to 1B</option>');
			actionOptions.push('<option value="63">Ground out SS to 1B</option>');
			actionOptions.push('<option value="143">Ground out P to 2B to 1B</option>');
			break;
		case "FlyOut":
			actionOptions.push('<option value="L1">Line out to P</option>');
			actionOptions.push('<option value="F3">Fly out to 1B</option>');
			actionOptions.push('<option value="P4">Pop out to 2B</option>');
			actionOptions.push('<option value="FF2">Fouled fly out to C</option>');
			break;
		case "Single":
			actionOptions.push('<option value="1B4">Single to 2B</option>');
			actionOptions.push('<option value="1BLS">Single to left side</option>');
			actionOptions.push('<option value="1BRC">Single to right center</option>');
			break;
		case "Double":
			actionOptions.push('<option value="2B8">Double to center field</option>');
			actionOptions.push('<option value="2BLL">Double to left line</option>');
			actionOptions.push('<option value="2BRC">Double to right center</option>');
			break;
		case "Triple":
			actionOptions.push('<option value="3B8">Triple to center field</option>');
			actionOptions.push('<option value="3BLL">Triple to left line</option>');
			actionOptions.push('<option value="3BRC">Triple to right center</option>');
			break;
		case "Homerun":
			actionOptions.push('<option value="HR8">Homerun to center field</option>');
			actionOptions.push('<option value="HRLC">Homerun to left center</option>');
			actionOptions.push('<option value="HR9I">Inside the park homerun to right</option>');
			break;
		case "Advance":
			actionOptions.push('<option value="BB">Base on balls</option>');
			actionOptions.push('<option value="IBB">Intentional base on balls</option>');
			actionOptions.push('<option value="HP">Hit by pitch</option>');
			break;
			
	}
	
	specificAction.innerHTML = actionOptions;
}

function drawAction() {
	drawBackground();
	
	var specificActionValue = specificAction.value;
	switch (specificActionValue) {
		case "Ks":
		case "Kl":
		case "3":
		case "13":
		case "43":
		case "53":
		case "63":
		case "143":
		case "L1":
		case "F3":
		case "P4":
		case "FF2":
			drawOut(0, specificActionValue);
			break;
		case "1B4":
		case "1BLS":
		case "1BRC":
			drawAdvance(1, specificActionValue);
			break;
		case "2B8":
		case "2BLL":
		case "2BRC":
			drawAdvance(2, specificActionValue);
			break;
		case "3B8":
		case "3BLL":
		case "3BRC":
			drawAdvance(3, specificActionValue);
			break;
		case "HR8":
		case "HRLC":
		case "HR9I":
			drawAdvance(4, specificActionValue);
			break;
		case "BB":
		case "IBB":
		case "HP":
			drawAdvance(1, specificActionValue);
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

function drawOut(base, situation) {
	ctx.lineWidth = 8;
	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	switch (base) {
		case 0:
			ctx.arc(h2, h2, h2 - 20, 0, 2 * Math.PI);
			break;
	}
	ctx.stroke();
	
	writeSituation(base, situation);
}

function drawAdvance(base, situation) {
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
	
	writeSituation(base, situation);
}

function writeSituation(base, situation) {
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	
	ctx.font = "bold 48px Verdana";
	var offset = 20;
	
	switch (base) {
		case 0:
			if (situation.length < 3) {
				ctx.font = "bold 120px Verdana";
				offset = 46
			} else {
				ctx.font = "bold 90px Verdana";
				offset = 33;
				
			}
			ctx.fillText(situation, w2, h2 + offset);
			break;
		case 1:
			if (situation.startsWith("1B")) {
				drawHitSymbol(1);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
					offset = 25;
				}
				ctx.fillText(situation.substring(2), w2 * 1.5 + 12, h2 * 1.5 + offset);
			} else {
				ctx.fillText(situation, w2 * 1.5, h2 * 1.5 + offset);
			}
			break;
		case 2:
			if (situation.startsWith("2B")) {
				drawHitSymbol(2);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
					offset = 25;
				}
				ctx.fillText(situation.substring(2), w2 * 1.5 + 12, h2 * 0.5 + offset);
			} else {
				ctx.fillText(situation, w2 * 1.5, h2 * 0.5 + offset);
			}
			break;
		case 3:
			if (situation.startsWith("3B")) {
				drawHitSymbol(3);
				if (situation.substring(2).length > 1) {
					ctx.font = "bold 40px Verdana";
					offset = 25;
				}
				ctx.fillText(situation.substring(2), w2 * 0.5 + 20, h2 * 0.5 + offset);
			} else {
				ctx.fillText(situation, w2 * 0.5, h2 * 0.5 + offset);
			}
			break;
		case 4:
			ctx.fillText(situation, w2 * 0.5, h2 * 1.5 + offset);
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
			ctx.moveTo(25, h2 - 35);
			ctx.lineTo(50, 25);
			ctx.moveTo(30, 35);
			ctx.lineTo(58, 40);
			ctx.moveTo(28, 45);
			ctx.lineTo(56, 50);
			ctx.moveTo(26, 55);
			ctx.lineTo(54, 60);
			break;
	}
	ctx.stroke();
}