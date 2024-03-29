import React, { useEffect, useReducer, useState } from "react"
import { AddProductToPurchase } from "../components/AddProductToPurchase"
import { ListPurchaseProducts } from "../components/ListPurchaseProducts"
import { currentMonth } from "../date/date"
import { getProductsPurchase, getPurchasePerMonth } from "../reducer/compras"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { NewPurchaseProduct } from "../types"


const Purchase = () => {
    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const [newPurchase, setNewPurchase] = useState<NewPurchaseProduct>()
    // const { productsPurchases, warningMessagePurchase } = state
    const [valueSelect, setValueSelect] = useState<String>("")

    useEffect(() => {
        getProductsPurchase(dispatch)
    }, [])
    // },[valueSelect])

    const handleNewPurchase = (newPurchase: NewPurchaseProduct): void => {
        // setNewPurchase((purchase) => newPurchase)
        setNewPurchase(newPurchase)
    }
    const handleNewValueSelectOrderBy = (orderBy: string): void => {
        setValueSelect(orderBy)
    }
    
    return (
        <div className="m-3 w-full">
            <h1 className="text-cyan-700 uppercase font-bold text-3xl max-xs:text-xl">Compras de {currentMonth()}</h1>
            <AddProductToPurchase newPurchase={handleNewPurchase} />

            {/* <ListPurchaseProducts handleNewValueSelectOrderBy={handleNewValueSelectOrderBy} productsPurchases={productsPurchases}/> */}
            <ListPurchaseProducts handleNewValueSelectOrderBy={handleNewValueSelectOrderBy} />
        </div>
    )
}

export { Purchase }