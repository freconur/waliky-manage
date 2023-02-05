import { Product } from "../types";
import { TYPES } from "./action";
// import { GET_PRODUCT_BY_ID } from "./action";

type lalala = {
  image?: string
  marca?: string
  name?: string
  price?: string
  // state: boolean
  id?:string
}

type State = {
  todos: lalala[]
}

type Estado = typeof initialStateProducts
type FormReducerAction = { 
  // type: typeof TYPES.GET_PRODUCT_BY_ID
  type: "getProductById"
  // payload:
  payload: lalala[]
};
export const initialStateProducts = {
  product: [] as lalala[],
  
};
export const searchIdReducer = (state:typeof initialStateProducts, action: FormReducerAction) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getProductById" : {
      console.log('action.payload',action.payload)
      return { 
        ...state.product, 
        product: action.payload, 
      };
    }

    default:
      return state;
  }
};
