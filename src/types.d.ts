export interface Product {
  // id: string
  image?: string
  marca?: string
  name?: string
  price?: string
  // state: boolean
  stock?: number
  state?: boolean
  id?:string
}
export interface SearchById {
  id: string
}
export interface InputValueVentas {
  id: string
  cantidad: number
}