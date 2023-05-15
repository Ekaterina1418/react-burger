export type TIngredient = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export interface ResponseToken {
  success: boolean
  accessToken: string
  refreshToken: string
}
export interface ResponseAuth extends ResponseToken {
  user: {
    email: string
    name: string
  }
}
export interface UpdateUser {
  success: boolean
  user: {
    email: string
    name: string
  }
}

export interface IResetPassword {
  password: string
  token: string
}
export interface IResponseReset {
  success: boolean
  message: string
}

//types for webSocket

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
export interface TableRow {
  orders: [
    {
      ingredients: string[]

      _id: string
      status: string
      number: number
      createdAt: string
      updatedAt: string
    }
  ]
  total: number
  totalToday: number
}

export type LiveTable = Array<TableRow>

export enum LiveTableActionType {
  DATA = 'data',
  INSERT = 'insert',
  DELETE = 'delete',
  UPDATE = 'update',
  MOVE = 'move',
}

export type Data = {
  type: LiveTableActionType.DATA
  data: LiveTable
}

export type Insert = {
  type: LiveTableActionType.INSERT
  data: {
    rows: Array<TableRow>
    pos: number
  }
}

export type Update = {
  type: LiveTableActionType.UPDATE
  data: LiveTable
}

export type Delete = {
  type: LiveTableActionType.DELETE
  data: Array<number>
}

export type Move = {
  type: LiveTableActionType.MOVE
  data: Array<{ from: number; to: number }>
}

export type LiveTableAction = Insert | Data | Delete | Update | Move

export type LiveTableActions = Array<LiveTableAction>
