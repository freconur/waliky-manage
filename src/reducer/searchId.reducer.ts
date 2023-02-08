import { Options, Product } from "../types";
import { TYPES } from "./action";
// import { GET_PRODUCT_BY_ID } from "./action";

type FormReducerAction = 
| { type: "getProductById", payload: Product, payload2: string}
| { type: "getCartucherasBts", payload: Product[]}
// | { type: "getOptions", payload: Product[]}
| { type: "getOptions", payload: Options[]}
export const initialStateProducts = {
  product: [] as Product,
  prueba: [] as Product[],
  pathProduct: '' as string,
  options: {} as Options[]
};
export const searchIdReducer = (state:typeof initialStateProducts, action: FormReducerAction) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getProductById" : 
      return { 
        ...state, 
        product: action.payload, 
        pathProduct: action.payload2, 
      }
      case "getCartucherasBts" : 
      return { 
        ...state, 
        prueba: action.payload, 
      }
      case "getOptions" : 
      const aaaaa = [...action.payload]
      return { 
        ...state, 
        options: aaaaa 
      }
    default:
      return state;
  }
};
