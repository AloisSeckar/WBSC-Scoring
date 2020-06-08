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
	
	setVariables();
	
	renderActionButtons();
	renderInputsForBatter();
	drawBackground();
}

function setVariables() {
	window.div_input = "wbsc-inputs";
	window.div_tools = "wbsc-toolbar";
	
	window.class_wbsc = "wbsc-inputs";
	
	window.input_b  = "input-b";
	window.input_br = "input-br";
	window.input_r1 = "input-r1";
	window.input_r2 = "input-r2";
	window.input_r3 = "input-r3";
}