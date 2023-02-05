import { Product } from "../types";
import { TYPES } from "./action";
// import { GET_PRODUCT_BY_ID } from "./action";

export const initialStateProducts = {
  product: [],
};
interface lalala {
  llll : Product[]
}
type FormReducerAction = { 
    // type: typeof TYPES.GET_PRODUCT_BY_ID
    type: "getProductById"
    payload:Product[]
};

export const searchIdReducer = (state:Product, action: FormReducerAction) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getProductById" :
      return { ...state, product: action.payload };

    default:
      return state;
  }
};
