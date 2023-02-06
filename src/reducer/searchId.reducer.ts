import { Product } from "../types";
import { TYPES } from "./action";
// import { GET_PRODUCT_BY_ID } from "./action";

type lalala = {
  image?: string
  marca?: string
  name?: string
  price?: string
  id?:string
}
type FormReducerAction = 
| { type: "getProductById", payload: Product}
| { type: "getCartucherasBts", payload: Product[]}
export const initialStateProducts = {
  product: [] as Product,
  prueba: [] as Product[]
};
export const searchIdReducer = (state:typeof initialStateProducts, action: FormReducerAction) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getProductById" : 
      return { 
        ...state, 
        product: action.payload, 
      }
      case "getCartucherasBts" : 
      return { 
        ...state, 
        prueba: action.payload, 
      }
    default:
      return state;
  }
};
