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
