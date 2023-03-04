import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addCurrentProductToSell,
  deleteCurrentProduct,
  getCurrentProductSell,
  getProductById,
  updateStockProduct,
} from "../reducer";
import {
  initialStateProducts,
  searchIdReducer,
} from "../reducer/searchId.reducer";
import { InputValueVentas } from "../types";
import { TableResultSearchById } from "../components/TableResultSearchById";
import { RegisterTableToSell } from "../components/RegisterTableToSell";

const RegistroVenta = () => {
  const location = useLocation();
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts);
  const {
    product,
    pathProduct,
    currentProductSell,
    cantidadProduct,
    warningStockCantidad,
    warningStock,
  } = state;
  const [id, setId] = useState("");
  const [inputValue, setInputValue] = useState<InputValueVentas>({
    id: "",
    cantidad: 1,
    location: location.pathname,
    newStock: 0,
    pathProduct: pathProduct,
   });
  useEffect(() => {
    getCurrentProductSell(dispatch);
    setInputValue({
      ...inputValue,
      cantidad: cantidadProduct,
      newStock: parseInt(`${product.stock}`, 10) - cantidadProduct,
      pathProduct: pathProduct,
    });
  }, [product, pathProduct, cantidadProduct]);
  const onChangeIdProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    getProductById(dispatch, inputValue, e.target.value);
  };
  const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const addProductToSell = () => {
    console.log('product',product)
    if (currentProductSell.length >= 1) {
      const rtaaddProductToSell = currentProductSell.find(
        (item) => item.idProduct === product.idProduct
      );
      console.log('rtaaddProductToSell', rtaaddProductToSell)
      if (rtaaddProductToSell) {
        if (rtaaddProductToSell.stock === 0) {
          return dispatch({
            type: "warningStock",
            payload: "no hay stock suficiente",
          });
        }
      }
    }
    if (Object.entries(product).length === 0 || product.stock === 0) {
      console.log("no hay stock o no has ingresado datos del producto");
    } else {
      const productToSell = {
        ...product,
        stock: inputValue.newStock,
        pathProduct: `/${inputValue.pathProduct}`,
      };
      addCurrentProductToSell(dispatch, productToSell, inputValue);
    }
  };
  const onDeleteCurrentProduct = (id: string) => {
    deleteCurrentProduct(dispatch, id);
  };
  const onSubmitFormSell = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateStockProduct(inputValue, currentProductSell, dispatch);
  };
  return (
    <div className="m-10 max-xs:m-3">
      <h1 className="uppercase text-cyan-700 font-bold text-2xl">
        gestion de ventas
      </h1>
      <div className="w-full">
        <div className="mt-2 w-full flex flex-col ">
          <label className="text-md font-medium text-gray-500 ">
            id de producto
          </label>
          <div className="mb-4 mt-0">
            <input
              className="border p-1 pl-3"
              onChange={onChangeIdProduct}
              value={id}
              type="text"
              placeholder="id"
              name="id"
            />
            <p>{inputValue.id}</p>
          </div>
        </div>
        <TableResultSearchById
          onChangeIdFormVentas={onChangeIdFormVentas}
          product={product}
          addProductToSell={addProductToSell}
          id={id}
          dispatch={dispatch}
          cantidadProduct={cantidadProduct}
        />
        <span className="text-red-600">
          {warningStock && `*${warningStock}.`}
        </span>
        <span className="text-red-600">
          {warningStockCantidad && `*${warningStockCantidad}.`}
        </span>
      </div>
      <h2 className="mt-5 mb-2 text-gray-500 capitalize font-bold text-lg">
        registrar venta
      </h2>
      <RegisterTableToSell
        currentProductSell={currentProductSell}
        onDeleteCurrentProduct={onDeleteCurrentProduct}
      />
      <button
        className=" bg-yellow-300 hover:bg-yellow-200 h-[30px] w-[100px] rounded-lg drop-shadow-lg text-md  mr-5 mt-5 font-semibold capitalize"
        onClick={onSubmitFormSell}
      >
        registrar
      </button>
    </div>
  );
};
export { RegistroVenta };
