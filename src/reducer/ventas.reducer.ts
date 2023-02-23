import { ProductSoldPerMonth } from "../types";

type VentasReducerAction = 
|{type: "getSoldProductsPerMoth",payload: ProductSoldPerMonth[]}
|{type: "monthsAvailable",payload: string[]}

export const initialStateVentas = {
  productVentas: [] as ProductSoldPerMonth[],
	monthsAvailable: [] as string[],
};
export const ventasReducer = (
  state: typeof initialStateVentas,
  action: VentasReducerAction
) => {
  switch (action.type) {
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
  }
};
