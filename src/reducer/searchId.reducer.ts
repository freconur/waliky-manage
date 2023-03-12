import { currentYear, funcionDate, functionDateConvert } from "../date/date";
import {
  Brands,
  Categories,
  DataForCard,
  DataPerYear,
  Options,
  Product,
  ProductSold,
  ProductSoldPerMonth,
  ProductsPerMonth,
  ProductsPerMonthPromise,
  TotalSalesPerMarca,
} from "../types";
import { TYPES } from "./action";

type FormReducerAction =
  | { type: "getProductById"; payload: Product; payload2: string }
  | { type: "getCartucherasBts"; payload: Product[] }
  | { type: "getOptions"; payload: Options[] }
  | { type: "getProductsSold"; payload: ProductSold[]; payload2: string }
  | { type: "getCurrentProductSell"; payload: Product[] }
  | { type: "plus"; payload: number; payload2: number }
  | { type: "less"; payload: number; payload2: number }
  | { type: "getAllProducts"; payload: Product[] }
  | { type: "warningStock"; payload: string }
  | { type: "getSoldProductsPerMoth"; payload: ProductSoldPerMonth[] }
  | { type: "monthsAvailable"; payload: string[] }
  | { type: "optionsSort"; payload: string; payload2: ProductSold[] }
  | { type: "getCagories"; payload: Categories[] }
  | { type: "getSubcategories"; payload: Categories[] }
  | {
      type: "filterCategory";
      payload: Product[];
      payload2: string;
      payload3: Product[];
    }
  | { type: "getBrands"; payload: Brands[] }
  | { type: "warningFile"; payload: string }
  | { type: "getErrorProducts"; payload: string }
  | { type: "addProductWarning"; payload: string }
  | { type: "dataForGraphics"; payload: number[]; payload2: string[], payload3: ProductsPerMonth[] }
  | { type: "getDataPerYear"; payload: DataPerYear[], payload2: number }
  | { type: "filterProductSoldByMarca"; payload: ProductSold[]}
  | { type: "selectMonth"; payload: string}
  | {type:"getSalesPerMarca", payload:TotalSalesPerMarca[]}
export const initialStateProducts = {
  product: [] as Product,
  prueba: [] as Product[],
  pathProduct: "" as string,
  options: {} as Options[],
  productsSold: [] as ProductSold[],
  currentProductSell: [] as Product[],
  cantidadProduct: 1 as number,
  warningStockCantidad: "" as string,
  allProducts: [] as Product[],
  copyAllProducts: [] as Product[],
  dailySales: 0 as number,
  salesMonth: 0 as number,
  currentDate: "" as string,
  currentMonth: "" as string,
  warningStock: "" as string,
  productVentas: [] as ProductSoldPerMonth[],
  monthsAvailable: [] as string[],
  numberOfItems: 0 as number,
  allCategories: [] as Categories[],
  allSubcategories: [] as Categories[],
  allBrands: [] as Brands[],
  warningFile: "" as string,
  warningGetErrorProducts: "" as string,
  addProductWarning: "" as string,
  totalSales: [] as number[],
  monthAvailableGraphics: [] as string[],
  dataForCard: [] as DataForCard[],
  currentYear: '' as string,
  totalSalesPerYear: 0  as number,
  dataPerYear: [] as DataPerYear[],
  utilidad2022: 0 as number,
  warningProductsSold: '' as string,
  selectMonth: '' as string,
  salesPerMarca: [] as TotalSalesPerMarca[]
};
export const searchIdReducer = (
  state: typeof initialStateProducts,
  action: FormReducerAction
) => {
  switch (action.type) {
    // case TYPES.GET_PRODUCT_BY_ID:
    case "getSalesPerMarca":
      console.log('action.payload',action.payload)
      return {
        ...state,
        salesPerMarca: action.payload
      }
    case "selectMonth":
      return {
        ...state,
        selectMonth: action.payload
      }
    case "filterProductSoldByMarca":
      let amount:number = 0
      action.payload.map(item => {
        amount = amount + parseFloat(`${item.price}`)
      })
        return{
          ...state,
          productsSold: action.payload,
          salesMonth:amount
        }
    case "getDataPerYear":
      
      return {
        ...state,
        dataPerYear: action.payload,
        utilidad2022: action.payload2
      }
    case "dataForGraphics":
      const year:string = currentYear()
      const dataForCard:DataForCard[] = []
      let totalSalesPerYear:number = 0 
      action.payload3.map((product, index) => {
        let totalSales = 0
        product.products?.map(item => {
          totalSalesPerYear = totalSalesPerYear + (parseInt(`${item.cantidad}`, 10) * parseFloat(`${item.price}`))
          totalSales = totalSales + (parseInt(`${item.cantidad}`, 10) * parseFloat(`${item.price}`))
          
        })
        if(index === 0) {
          const data: DataForCard = {
            nameMonth: `${product.nameMonth}`,
            sales: totalSales,
          } 
          dataForCard.push(data)
        }else {
          const data: DataForCard = {
            nameMonth: `${product.nameMonth}`,
            sales: totalSales,
            salesGrowth:((totalSales/dataForCard[index-1].sales)-1)*100
          } 
          dataForCard.push(data)
        }
      })
      return {
        ...state,
        totalSales: action.payload,
        monthAvailableGraphics: action.payload2,
        dataForCard: dataForCard,
        currentYear: year,
        totalSalesPerYear: totalSalesPerYear
      };
    case "addProductWarning":
      return {
        ...state,
        addProductWarning: action.payload,
      };
    case "getErrorProducts":
      return {
        ...state,
        warningGetErrorProducts: action.payload,
      };
    case "warningFile":
      return {
        ...state,
        warningFile: action.payload,
      };
    case "getSubcategories":
      return {
        ...state,
        allSubcategories: action.payload,
      };
    case "getBrands":
      return {
        ...state,
        allBrands: action.payload,
      };
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
      let ventaTotalMes = 0;
      let date = funcionDate();
      let numberOfItems: number = 0;
      action.payload.map((item) => {
        let ventaTotalProducto: number =
          parseFloat(`${item.price}`) * parseFloat(`${item.cantidad}`);
        ventaTotalMes = ventaTotalMes + ventaTotalProducto;
      });
      action.payload.map(
        (item) => (numberOfItems = numberOfItems + parseInt(`${item.cantidad}`))
      );
      const rtaaa = action.payload.map((item) => {
        return {
          ...item,
          // date: item.timestamp.toDate().toString().slice(0, 21),
          date: functionDateConvert(item.timestamp.toDate()),
        };
      });
      return {
        ...state,
        productsSold: rtaaa,
        salesMonth: ventaTotalMes,
        currentDate: date,
        currentMonth: action.payload2,
        numberOfItems: numberOfItems,
      };
    case "getCurrentProductSell":
      return {
        ...state,
        currentProductSell: action.payload,
      };
    case "plus":
      if (action.payload >= action.payload2)
        return {
          ...state,
          warningStockCantidad:
            "no puedes agregar mas cantidad ya que no hay suficiente stock",
        };
      return {
        ...state,
        cantidadProduct: action.payload + 1,
        warningStockCantidad: "",
      };
    case "less":
      if (action.payload === 1) return { ...state, cantidadProduct: 1 };

      return {
        ...state,
        cantidadProduct: action.payload - 1,
        warningStockCantidad: "",
      };
    case "getAllProducts":
      return {
        ...state,
        allProducts: action.payload,
        copyAllProducts: action.payload,
      };
    case "warningStock":
      return {
        ...state,
        warningStockCantidad: action.payload,
      };
    case "getSoldProductsPerMoth":
      return {
        ...state,
        productVentas: action.payload,
      };
    case "monthsAvailable":
      return {
        ...state,
        monthsAvailable: action.payload,
      };
    case "getCagories":
      return {
        ...state,
        allCategories: action.payload,
      };
    case "filterCategory":
      // const products = initialStateProducts.allProducts
      if (action.payload2 === "all") {
        return {
          ...state,
          allProducts: action.payload3,
        };
      }
      const rtaFiltro = action.payload3.filter(
        (item) => item.category === action.payload2
      );
      console.log("rtaFiltro", rtaFiltro);
      return {
        ...state,
        allProducts: rtaFiltro,
      };
    case "optionsSort":
      let saveProductsSold = action.payload2;
      if (action.payload === "price-ascendente") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseFloat(`${a.price}`);
          const second = parseFloat(`${b.price}`);
          if (first < second) return -1;
          if (first > second) return 1;
          return 0;
        });
      }
      if (action.payload === "price-descendente") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseFloat(`${a.price}`);
          const second = parseFloat(`${b.price}`);
          if (first > second) return -1;
          if (first < second) return 1;
          return 0;
        });
      }
      if (action.payload === "mas-vendido") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseInt(`${a.cantidad}`);
          const second = parseInt(`${b.cantidad}`);
          if (first > second) return -1;
          if (first < second) return 1;
          return 0;
        });
      }
      if (action.payload === "menos-vendido") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseInt(`${a.cantidad}`);
          const second = parseInt(`${b.cantidad}`);
          if (first < second) return -1;
          if (first > second) return 1;
          return 0;
        });
      }
      if (action.payload === "menos-reciente") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseInt(a.date.slice(0, 2));
          const second = parseInt(b.date.slice(0, 2));
          if (first < second) return -1;
          if (first > second) return 1;
          return 0;
        });
      }
      if (action.payload === "mas-reciente") {
        saveProductsSold.sort((a: ProductSold, b: ProductSold) => {
          const first = parseInt(a.date.slice(0, 2));
          const second = parseInt(b.date.slice(0, 2));
          if (first > second) return -1;
          if (first < second) return 1;
          return 0;
        });
      }
      return {
        ...state,
        productsSold: saveProductsSold,
      };
  }
};
