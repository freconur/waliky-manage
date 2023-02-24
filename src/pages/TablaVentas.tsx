import { useEffect, useReducer, useState } from "react"
import { OptionsSellMonths } from "../components/OptionsSellMonths"
import { OptionsSort } from "../components/OptionsSort"
import { getProductsSold } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"

const TablaVentas = () => {
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const { productsSold, salesMonth, currentDate, currentMonth, numberOfItems } = state
  useEffect(() => {
    getProductsSold(dispatch)
  }, [])
  const onChangeOptionsSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({type: "optionsSort", payload: e.target.value, payload2: productsSold})
  }
  const onChangeValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		getProductsSold(dispatch, e.target.value)
	}
  
  return (
    <>
      <div className="m-7 max-sm:mr-2 max-sm:ml-2 max-sm:mt-2">
        <div className="flex flex-row-reverse max-cs:mr-0 mr-5 text-lg text-gray-400 capitalize">{currentDate}</div>
        <div className="flex justify-between max-xs:flex-col-reverse">
          <h1 className="text-cyan-700 uppercase font-bold text-3xl max-xs:text-xl">ventas de {currentMonth}</h1>
        {/* <div>total de articulos: {numberOfItems}</div> */}
          <div className="flex justify-end mt-2">
            <div className="bg-blue-500 w-32 rounded-lg text-center drop-shadow-lg mr-5 max-cs:mr-2 max-sm:mb-4">
              <h2 className="text-white font-bold capitalize">items vendidos</h2><span className="text-white text-xl font-bold">{numberOfItems}</span>
            </div>
            <div className="bg-yellow-300 w-32 rounded-lg text-center drop-shadow-lg mr-5 max-cs:mr-0 max-sm:mb-4">
              <h2 className="text-white font-bold capitalize">venta del mes</h2><span className="text-green-500 text-xl font-bold">S/{salesMonth}</span>
            </div>
          </div>
        </div>
          <OptionsSellMonths onChangeValueSelect={onChangeValueSelect} />
          <OptionsSort onChangeOptionsSort={onChangeOptionsSort}/>
        <div className="rounded-lg shadow max-cs:mr-0 mt-5 mr-5 overflow-auto">
          <table className="w-full overflow-auto max-xsm:hidden">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr className="text-center">
                <th className="p-2 capitalize text-gray-500 w-10  text-sm font-semibold tracking-wide text-left ">id</th>
                <th className="p-2 capitalize text-gray-500 w-24  text-sm font-semibold tracking-wide text-left ">id prod.</th>
                <th className="p-2 capitalize text-gray-500 w-[768px]  text-sm font-semibold tracking-wide text-left ">descripcion de producto</th>
                <th className="p-2 capitalize text-gray-500 w-40  text-sm font-semibold tracking-wide text-left ">fecha</th>
                <th className="p-2 capitalize text-gray-500 w-5  text-sm font-semibold tracking-wide text-left ">cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(productsSold)
                &&
                productsSold?.map((item, index) => {
                  return (
                    <tr key={index} className="w-auto text-center">
                      <td className=" cursor-pointer duration-900 bg-white p-1 capitalize text-gray-400 text-md ">{index + 1}</td>
                      {/* <td>{item.id?.substring(1, 10)}...</td> */}
                      {/* <td className="text-left cursor-pointer duration-900 max-cz:hidden bg-white p-1 capitalize text-gray-400 text-md">{item.id}</td> */}
                      <td className=" text-left p-1 capitalize text-gray-400  w-5 bg-white text-md">{item.idProduct?.substring(0, 4)}...</td>
                      <td className="text-left p-1 capitalize text-gray-400 w-24 bg-white text-md">{item.name}</td>
                      <td className="text-left p-1 capitalize text-gray-400 w-40 bg-white text-md">{item.date}</td>
                      <td className="text-center p-1 capitalize text-gray-400  bg-white text-md">{item.cantidad}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <ul className="hidden max-xsm:block">
            {productsSold?.map(({name, id, date, cantidad, price}, index) => {
              return (
                <li key={id} className="rounded-lg bg-slate-200 m-2 p-1">
                  <div className="flex justify-between">
                    <span className="text-blue-500 font-semibold mr-2">id:{index + 1}</span>
                    <span>{date}</span>
                  </div>
                  <p className="text-md capitalize text-gray-500">{name}</p>
                  <div>
                    <span className="mr-5 capitalize">precio:  <span className="font-bold">s/ {price}</span></span>
                    <span className="mr-5 capitalize">cantidad: <span className="font-bold">{cantidad}</span></span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
export { TablaVentas }