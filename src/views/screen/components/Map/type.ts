export interface Scatter {
  name: string
  value: (number | string)[]
}

export type ScatterData = Scatter[]

export interface Line {
  coords: (string | number)[][]
  lineStyle: {
    curveness: number
    width: number
  }
  fromName: string
  toName: string
  fromValue: string | number
}

export type LineData = Line[]
