import { useEffect, useReducer } from "react"
import { getAllProducts } from "../reducer";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";



const Productos = () => {
const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
const {  } = state;

useEffect(() => {
    getAllProducts()
},[])

return (


    <div>Holi como estas</div>
)


}

export {Productos}