/* *************************************** */
/* wbsc-global.js                          */
/* Variable declarations + setting-up      */
/* *************************************** */

window.onload = function() {
    init();
  
    // button for saving output as PNG
    const downloadButton = document.getElementById('download-link');
    downloadButton.addEventListener('click', function(ev) {
        downloadButton.href = canvas.toDataURL();
        downloadButton.download = 'wbsc-scoring.png';
    }, false);
};

// prepare environment and render default state
function init() {
    setInputVariables();
    setOutputVariables();
    setTextConstants();
    
    renderActionButtons();
    renderInputs(input_b);
    drawBackground(1);
}

// initial declaring of arrays used to collect user input
function setInputVariables() {
    window.minPosItems = [];
    window.targetPosItems = [];
    window.maxPosItems = [];
    window.posSelection = [];
}

// setting affecting placement of texts in situation rendering
function setOutputVariables() {
    window.canvas = document.getElementById('canvas');
    window.ctx = canvas.getContext('2d');
    
    window.vOffset = 0;
    window.hOffset = 75;
    window.w = canvas.width - hOffset;
    window.h = canvas.height;
    window.w2 = w / 2;
    window.w3 = w / 3;
    window.w4 = w / 4;
    window.h2 = h / 2;
    window.h3 = h / 3;
    window.h4 = h / 4;
    window.h5 = h / 5;
}

// values used for identifying the DOM elements
function setTextConstants() {
    window.div_input = 'wbsc-inputs';
    window.div_tools = 'wbsc-toolbar';
    
    window.class_wbsc = 'wbsc-inputs';
    window.class_wbsc_b_render = 'wbsc-render-button';
    window.class_wbsc_b_unrender = 'wbsc-unrender-button';
    window.class_wbsc_pos = 'wbsc-pos-select form-control';
    
    window.input_generate = 'input-generate';
    window.input_clear  = 'input-clear';
    window.input_b  = 'input-b';
    window.input_b1 = 'input-b1';
    window.input_b2 = 'input-b2';
    window.input_b3 = 'input-b3';
    window.input_r1 = 'input-r1';
    window.input_r1a = 'input-r1a';
    window.input_r1b = 'input-r1b';
    window.input_r2 = 'input-r2';
    window.input_r2a = 'input-r2a';
    window.input_r3 = 'input-r3';
    
    window.input_base_action = '-base-action';
    window.input_spec_action = '-spec-action';
    window.input_base = '-base';
    window.input_tie = '-tie';
    window.input_origBase = '-orig-base';
    window.input_position = '-pos';
    window.input_runtype = '-run';
    window.input_validation = '-validation';
    window.input_add = '-add';
    window.input_remove = '-remove';
    
    window.output_base = 'base';
    window.output_text_1 = 'text-1';
    window.output_text_2 = 'text-2';
    window.output_out = 'out';
    window.output_hit = 'hit';
    window.output_sub = 'sub';
    window.output_sup = 'sup';
    window.output_num = 'num';
    window.output_run = 'run';
    window.output_na = 'no-advance';
}