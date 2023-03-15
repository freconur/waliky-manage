import React, { useReducer, useState } from "react"
import { AddProductToPurchase } from "../components/AddProductToPurchase"
import { currentMonth } from "../date/date"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { NewPurchaseProduct } from "../types"


const Purchase = () => {
    
    const [newPurchase, setNewPurchase] = useState<NewPurchaseProduct>()
    
    const handleNewPurchase = (newPurchase:NewPurchaseProduct):void => {
        // setNewPurchase((purchase) => newPurchase)
        setNewPurchase(newPurchase)
    }
    console.log('newPurchase',newPurchase)
    return (
        <div className="mt-5">
            <h1 className="text-cyan-700 uppercase font-bold text-3xl max-xs:text-xl">Compras de {currentMonth()}</h1>
            <AddProductToPurchase newPurchase={handleNewPurchase} />
        </div>
    )
}

export { Purchase }