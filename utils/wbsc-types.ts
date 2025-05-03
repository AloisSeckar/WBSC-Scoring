export type GUIOption = {
  group?: string
  value: string | number
  label: string
  selected?: boolean
}

export type PositionType = 'player-locations' | 'hit-locations' | 'fc-locations'

export type LibraryItem = {
  file: string
  name: string
}

export type LibraryCategory = {
  cat: string
  items: LibraryItem[]
}

// limiting number to possible values where baseball/softball action may happen
// 0 - before reaching 1st base (outs)
// 1-4 - respective base (4 = HP)
export type WBSCBase = 0 | 1 | 2 | 3 | 4

// the fusion of former WBSCInput and WBSCOutput
// all fields are non-optional due to TS clash with Partial<WBSCAction> in vitestUtils.ts
export type WBSCAction = {
  // identification (one of 10 possible values - B, B1, B2, B3, R1, R1a, R1b, R2, R2a, R3)
  group: string
  // number in batting order (1-4, based on number of inputs)
  batter: number
  // group of actions selected in the first select
  baseAction: string
  // concrete action from options availabůe for selected `baseAction`
  specAction: string
  // base selected in the respective select
  base: WBSCBase
  // base player was holding before the action
  origBase: WBSCBase
  // base where the player finished after the action
  targetBase: WBSCBase
  // base where (error) action should be rendered (<= targetBase)
  // if targetBase > outputBase, an arrow will be rendered from `outputBase` to `targetBase`
  outputBase: WBSCBase
  // true if player was placed as TIEbreaker runner (only aplicable for R1 and R2 inputs)
  tie: boolean
  // true if multiple outs were interrupted with a misplay (and thus should not be considered DP)
  nodp: boolean
  // player / position selected in first `pos` select
  pos1: string
  // player / position selected in second `pos` select
  pos2: string
  // player selected in third `pos` select
  pos3: string
  // player selected in fourth `pos` select
  pos4: string
  // selected type of run (ER, UE, TU)
  runtype: string
  // output text row 1
  text1: string
  // output text row 2 (for longer plays)
  text2: string
  // optional text in bottom right corner (count of Ks and BBs)
  sub: string
  // true if batter-number indicator should be added in corner (for CSs, O/s etc.)
  num: boolean
  // true if result of the action is an out
  out: boolean
  // true if runner ended up at the same base (no advance)
  na: boolean
}

// special type for representing stored plays' definition in JSON files
// contains extra "pos" field which is a legacy from < v1.2
export type WBSCActionJson = WBSCAction & { pos?: string }
