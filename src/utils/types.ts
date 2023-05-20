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

export type TOrderInfo = {
  ingredients: string[]
  _id: string
  status: string
  name: string
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrdersResponse = {
  orders: Array<TOrderInfo>
  total: number
  totalToday: number
}