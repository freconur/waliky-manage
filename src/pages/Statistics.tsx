import { useEffect, useReducer } from "react"
import { getCartucherasBts } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"


const Statistics = () => {


    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const { prueba, warningGetErrorProducts } = state

    console.log('getCartucheras',prueba)
    console.log('warningGetErrorProducts',warningGetErrorProducts)
    useEffect(() => {
        getCartucherasBts(dispatch)
    },[warningGetErrorProducts])
    return(
        <>
        <h1>holi</h1>
        </>
    )
}

export { Statistics }