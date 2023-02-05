import { useEffect, useReducer } from "react"
import { getCartucherasBts } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"



const SearchIdProduct = () => {

    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const { product } = state
    console.log('product',product)
    useEffect(() => {
        getCartucherasBts(dispatch) 
    },[])
    return (
        <>
        <ul>
            {
                product.map((item, index) => {
                    return(
                        <li key={index}>
                            <p>{item.name}</p>
                            <p>{item.marca}</p>
                            <p>{item.price}</p>
                            <p>{item.id}</p>
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

export { SearchIdProduct }