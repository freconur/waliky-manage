import React, { useEffect, useReducer, useState } from "react"
import { AddProductToPurchase } from "../components/AddProductToPurchase"
import { ListPurchaseProducts } from "../components/ListPurchaseProducts"
import { currentMonth } from "../date/date"
import { getProductsPurchase } from "../reducer/compras"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { NewPurchaseProduct } from "../types"


const Purchase = () => {
    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const [newPurchase, setNewPurchase] = useState<NewPurchaseProduct>()
    const { productsPurchases, warningMessagePurchase } = state
    useEffect(() => {
        getProductsPurchase(dispatch)
    },[])

    const handleNewPurchase = (newPurchase:NewPurchaseProduct):void => {
        // setNewPurchase((purchase) => newPurchase)
        setNewPurchase(newPurchase)
    }
    console.log('warningMessagePurchase',warningMessagePurchase)
    return (
        <div className="m-3">
            <h1 className="text-cyan-700 uppercase font-bold text-3xl max-xs:text-xl">Compras de {currentMonth()}</h1>
            <AddProductToPurchase newPurchase={handleNewPurchase} />
            <ListPurchaseProducts productsPurchases={productsPurchases}/>
        </div>
    )
}

export { Purchase }