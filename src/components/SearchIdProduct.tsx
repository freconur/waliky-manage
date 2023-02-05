import { useEffect, useReducer } from "react"
import { getCartucherasBts } from "../reducer"
import { TYPES } from "../reducer/action"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"



const SearchIdProduct = () => {

    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)

    useEffect(() => {
        getCartucherasBts(dispatch) 
    },[])
    return (
        <>
        <h1>aqui iran los datos</h1>
        </>
    )
}

export { SearchIdProduct }