/* *************************************** */
/* wbsc-constants.ts                       */
/* Single point for defining constants     */
/* *************************************** */

// TODO revision and cleanup

// DOM elements selectors

export const classWbsc = 'wbsc-inputs'
export const classWbscPos = 'wbsc-pos-select'
export const classTools = 'wbsc-toolbar'
export const classHidden = 'hidden'

export const inputGenerate = 'input-generate'
export const inputImport = 'input-import'
export const inputImportLib = 'input-import-lib'
export const inputImportFile = 'input-import-file'
export const inputExport = 'input-export'
export const inputClear = 'input-clear'
export const inputB = 'input-b'
export const inputB1 = 'input-b1'
export const inputB2 = 'input-b2'
export const inputB3 = 'input-b3'
export const inputR1 = 'input-r1'
export const inputR1a = 'input-r1a'
export const inputR1b = 'input-r1b'
export const inputR2 = 'input-r2'
export const inputR2a = 'input-r2a'
export const inputR3 = 'input-r3'

export const inputBaseAction = '-base-action'
export const inputSpecAction = '-spec-action'
export const inputBase = '-base'
export const inputTie = '-tie'
export const inputPosition = '-pos'
export const inputRuntype = '-run'
export const inputValidation = '-validation'
export const inputAdd = '-add'
export const inputRemove = '-remove'

// graphic helpers

const dim = 250

export const w1: number = dim
export const w2: number = dim / 2
export const w3: number = dim / 3
export const w4: number = dim / 4

export const h1: number = dim
export const h2: number = dim / 2
export const h3: number = dim / 3
export const h4: number = dim / 4
export const h5: number = dim / 5

// FONTS
// Font size+style constants to keep consistency inside the rendering func.

// general subset for situations at bases
export const FONT_BASE_XL = 'bold 56px Verdana'
export const FONT_BASE_LARGE = 'bold 44px Verdana'
export const FONT_BASE_MEDIUM = 'bold 38px Verdana'
export const FONT_BASE_SMALL = 'bold 32px Verdana'
export const FONT_BASE_TINY = 'bold 26px Verdana'

// subset for out-situations at (before) 1st base
export const FONT_B1_LARGE = 'bold 110px Verdana'
export const FONT_B1_MEDIUM = 'bold 90px Verdana'
export const FONT_B1_SMALL = 'bold 70px Verdana'
export const FONT_B1_TINY = 'bold 56px Verdana'

// subset for out-situations at 2nd base
export const FONT_B2_XL = 'bold 70px Verdana'
export const FONT_B2_LARGE = 'bold 56px Verdana'
export const FONT_B2_MEDIUM = 'bold 45px Verdana'
export const FONT_B2_SMALL = 'bold 36px Verdana'
export const FONT_B2_TINY = 'bold 27px Verdana'

// extra fonts
export const FONT_EXTRA_LARGE = 'bold 60px Verdana' // (blue) number of the batter
export const FONT_EXTRA_SMALL = 'bold 40px Verdana' // strikeout number indicator
export const FONT_EXTRA_TINY = '22px Verdana' // DF error + NA situations + batter indicators
