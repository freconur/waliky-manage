import { useEffect, useReducer, useState } from "react"
import { totalSalesPerMarca } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { ProductsPerMonth } from "../types"



const SalesPerMarca = () => {
    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const {  } = state
const [products, setProducts] = useState<Promise<ProductsPerMonth[]>>()

useEffect(() => {
        totalSalesPerMarca(dispatch)
    }, [])
    // console.log('products', products)
    return(
        <>
        <h1>venta por marca</h1>
        </>
    )
}

export { SalesPerMarca }