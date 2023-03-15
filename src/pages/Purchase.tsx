import React, { useState } from "react"
import { AddProductToPurchase } from "../components/AddProductToPurchase"
import { NewPurchaseProduct } from "../types"


const Purchase = () => {
    const [newPurchaseValues, setNewPurchaseValues] = useState<NewPurchaseProduct>({
        name: "",
        costoTotal: "",
        cantidad: "",
        // costoUnitario: 0
    })
    const handleChangeNewPurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPurchaseValues({
            ...newPurchaseValues,
            [e.target.name]: e.target.value
        })
    }
    console.log(newPurchaseValues)
    return (
        <div className="mt-5">
            <h1 className="text-cyan-700 uppercase font-bold text-3xl max-xs:text-xl">Compras</h1>
            <AddProductToPurchase newPurchaseValues={newPurchaseValues} handleChangeNewPurchase={handleChangeNewPurchase} />
        </div>
    )
}

export { Purchase }