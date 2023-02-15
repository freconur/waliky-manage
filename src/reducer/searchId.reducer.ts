import { funcionDate } from "../date/date";
import { Options, Product, ProductSold } from "../types";
import { TYPES } from "./action";
// import { GET_PRODUCT_BY_ID } from "./action";

type FormReducerAction =
  | { type: "getProductById"; payload: Product; payload2: string }
  | { type: "getCartucherasBts"; payload: Product[] }
  // | { type: "getOptions", payload: Product[]}
  | { type: "getOptions"; payload: Options[] }
  | { type: "getProductsSold"; payload: ProductSold[] }
  | { type: "getCurrentProductSell"; payload: Product[] }
  | { type: "plus"; payload: number, payload2:number}
  | { type: "less"; payload: number, payload2:number}
  | { type: "getAllProducts"; payload: Product[]}
export const initialStateProducts = {
  product: [] as Product,
  prueba: [] as Product[],
  pathProduct: "" as string,
  options: {} as Options[],
  productsSold: [] as ProductSold[],
  currentProductSell: [] as Product[],
  cantidadProduct: 1 as number,
  warningStockCantidad: '' as string,
  allProducts: [] as Product[],
  dailySales: 0 as number,
  salesMonth: 0 as number,
  currentDate: '' as string
};
export const searchIdReducer = (
  state: typeof initialStateProducts,
  action: FormReducerAction
) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getProductById":
      return {
        ...state,
        product: action.payload,
        pathProduct: action.payload2,
      };
    case "getCartucherasBts":
      return {
        ...state,
        prueba: action.payload,
      };
    case "getOptions":
      return {
        ...state,
        options: action.payload,
      };
    case "getProductsSold":
      let ventaTotalMes = 0
      let date = funcionDate()
      action.payload.map(item => {
        ventaTotalMes = ventaTotalMes + parseInt(`${item.price}`,10)
      })
      const rtaaa = action.payload.map((item) => {
        return {
          ...item,
          date: item.timestamp.toDate().toString().slice(0, 21),
        };
      });
      return {
        ...state,
        productsSold: rtaaa,
        salesMonth: ventaTotalMes,
        currentDate: date
      };
    case "getCurrentProductSell":
      return {
        ...state,
        currentProductSell: action.payload,
      };
    case "plus":
      if(action.payload >= action.payload2) return {...state, warningStockCantidad: "no puedes agregar mas cantidad ya que no hay suficiente stock"}
      return {
        ...state,
        cantidadProduct: action.payload + 1,
        warningStockCantidad: ''
      };
      case "less":
        if(action.payload === 1) return {...state, cantidadProduct: 1}
          
      return {
        ...state,
        cantidadProduct: action.payload - 1,
        warningStockCantidad:''
      };
      case "getAllProducts":
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};
