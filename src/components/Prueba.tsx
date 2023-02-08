import { useEffect, useReducer } from "react"
import { getOptions } from "../reducer";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"


const Prueba = () => {

    const [state, dispatch] = useReducer(searchIdReducer,initialStateProducts)
    const { options } = state;

    console.log('pruebaoption', options)
    useEffect(() => {
        getOptions(dispatch)
    },[])

    if(Array.isArray(options)){
        console.log('es un array')
    }else {
        console.log('no es un array')

    }
    return(
        <ul>
            {Array.isArray(options) &&
            options?.map(item => {
                return (
                    <li>
                        {item.option}
                    </li>
                )
            })}
        </ul>
        )
}

export { Prueba }