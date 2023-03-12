import { useEffect, useReducer, useState } from "react"
import { totalSalesPerMarca } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { ProductsPerMonth, TotalSalesPerMarca } from "../types"


interface Props {
    salesPerMarca: TotalSalesPerMarca[]
}
const SalesPerMarca = ({salesPerMarca}:Props) => {
    return(
        <>
        <h2 className='text-xl text-cyan-600 font-semibold capitalize mt-5'>venta por marca</h2>
        <ul className="mt-5">
        {salesPerMarca?.map((brand, index) => {
            return(
                <li className="border-4 bg-violet-400 flex justify-between p-1 mb-2 rounded-lg border-violet-500" key={index}>
                    <p className="capitalize text-white font-semibold">
                        {/* <span className="text-white font-semibold">marca: </span>  */}
                        {brand.nameMarca}</p>
                    <p className="text-white font-bold">S/ {brand.totalSales}</p>
                </li>
            )
        })}
        </ul>
        </>
    )
}

export { SalesPerMarca }