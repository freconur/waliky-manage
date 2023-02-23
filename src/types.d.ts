import { Timestamp } from "firebase/firestore"

export interface Product {
  idProduct?: string
  image?: string
  marca?: string
  name?: string
  price?: string
  // state: boolean
  stock?: number
  state?: boolean
  id?:string
  option?: string
  cantidad?: number
  pathProduct?: string
  
}
export interface SearchById {
  id: string
}
export interface InputValueVentas {
  id?: string
  cantidad?: number,
  location?:string,
  newStock?: number
  pathProduct?: string
}

export interface Options{
  id?: string
  option?: string
  path?: string
  icon?:string
  image?:string
}
export interface ProductSold{
cantidad?: string
idProduct?:string
name?: string
price?:string
timestamp?: Date | string |toDate
date?:Date | string |toDate | Timestamp
id?: string
}

export interface ProductSoldPerMonth {
  cantidad?: string
idProduct?:string
name?: string
price?:string
timestamp?: Date | string |toDate
date?:Date | string |toDate | Timestamp
id?: string
}
export type MonthsAvialable = []