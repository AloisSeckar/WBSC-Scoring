/* *************************************** */
/* wbsc-global.js                          */
/* Variable declarations + setting-up      */
/* *************************************** */

// prepare environment and render default state
export default function init () {
  useCanvasStore().init()
  renderActionButtons()
  renderInputs(input_b)
  drawBackground(1)
  extendDownloadButton()
}

// button for saving output as PNG
function extendDownloadButton () {
  const downloadButton = document.getElementById('download-link') as HTMLAnchorElement
  downloadButton.addEventListener('click', function () {
    const canvas = useCanvasStore().canvas
    if (canvas) {
      downloadButton.href = canvas.toDataURL()
      downloadButton.download = 'wbsc-scoring.png'
    } else {
      useEvalStore().setError('Canvas not defined')
    }
  }, false)
}
