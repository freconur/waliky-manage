import React, { useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { getCategories, updateItemProv } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"


interface Props {
    onChangeCategories: () => void,
    itemInfo: Product
}
const ProductModal = ({onChangeCategories,itemInfo}:Props) => {

    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const { allCategories } = state
    const [item, setItem] = useState<Product>({})
    useEffect(() => {
        getCategories(dispatch)
    },[])
    const onChangeOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItem({
            ...item,
            category:e.target.value
        })
    }
    const updateItem = () => {
        updateItemProv(itemInfo, `${item.category}`)
    }
    // console.log('itemInfo',itemInfo)
    return ReactDOM.createPortal(
        <div className="absolute inset-0 bg-green-500">
            <div onClick={onChangeCategories} className="cursor-pointer flex justify-end m-2"><span className="flex justify-center items-center text-lg font-bold text-gray-600 h-10 w-10 rounded-full bg-blue-700">X</span></div>
            <div>
                <label>categoria</label>
                <select onChange={onChangeOptionValue}>
                    <option value="">seleccionar</option>
                    {allCategories.map((category, index) => {
                        return(
                            <option key={index} value={category.name}>{category.name}</option>
                        )
                    })}
                </select>
            </div>
            <button className="bg-yellow-400 m-5 rounded-lg p-2" onClick={updateItem}>actualizar</button>
        </div>,
        document.getElementById("productModal")!
    )

}

export { ProductModal }