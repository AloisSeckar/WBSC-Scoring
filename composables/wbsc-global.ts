/* *************************************** */
/* wbsc-global.js                          */
/* Variable declarations + setting-up      */
/* *************************************** */

// prepare environment and render default state
export default function init() {
    useCanvasStore().init();
    
    renderActionButtons();
    renderInputs(input_b);
    drawBackground(1);
    
    // button for saving output as PNG
    const downloadButton = document.getElementById('download-link');
    downloadButton.addEventListener('click', function(ev) {
        downloadButton.href = canvas.toDataURL();
        downloadButton.download = 'wbsc-scoring.png';
    }, false);
}
