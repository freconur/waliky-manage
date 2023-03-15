import { useReducer, useState } from "react"
import { addNewProductPurchase } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { NewPurchaseProduct } from "../types"


interface Props {
    // handleChangeNewPurchase: React.FormEventHandler<HTMLInputElement>
    // newPurchaseValues: NewPurchaseProduct,
    newPurchase: (newPurchase: NewPurchaseProduct) => void
    // addProductToList: (e: React.FormEvent<HTMLFormElement>) => void
}
const AddProductToPurchase = ({ newPurchase }: Props) => {
    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)

    const [newPurchaseValues, setNewPurchaseValues] = useState<NewPurchaseProduct>({
        name: "",
        costoTotal: "",
        cantidad: "",
    })
    const handleChangeNewPurchase = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPurchaseValues({
            ...newPurchaseValues,
            [e.target.name]: e.target.value
        })
    }
    const addProductToList = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('newPurchaseValues',newPurchaseValues)
        newPurchase(newPurchaseValues)
        addNewProductPurchase(newPurchaseValues)
    }
    return (
        <form className="block my-5" onSubmit={addProductToList}>
            <h2 className="text-cyan-500 uppercase font-bold text-xl max-xs:text-xl my-3">nueva compra</h2>

            <input value={newPurchaseValues.name} name="name" onChange={handleChangeNewPurchase} className="my-2 w-full  px-2 py-1 border-2 bg-blue-100 rounded-lg border-blue-200" type="text" placeholder="ingresa el nombre del producto" />
            <div className="flex justify-around">
                <div className="mx-1">
                    <label>costo total</label>
                    <input value={newPurchaseValues.costoTotal} onChange={handleChangeNewPurchase} name="costoTotal" className="my-2 w-full  px-2 py-1 border-2 bg-blue-100 rounded-lg border-blue-200" type="number" placeholder="ingresa el costo total" />
                </div>
                <div className="mx-1">
                    <label>catidad</label>
                    <input value={newPurchaseValues.cantidad} onChange={handleChangeNewPurchase} name="cantidad" className="my-2 w-full  px-2 py-1 border-2 bg-blue-100 rounded-lg border-blue-200" type="number" placeholder="ingresa la cantidad" />
                </div>
                <div className="mx-1">
                    <label>costo unitario</label>
                    <input onChange={handleChangeNewPurchase} disabled={true}
                        placeholder={`${newPurchaseValues.costoTotal && newPurchaseValues.cantidad ?
                            (parseFloat(newPurchaseValues.costoTotal) / parseInt(newPurchaseValues.cantidad, 10)).toString()
                            :
                            "costo unitario"
                            }`} name="costoUnitario" className="my-2 w-full  px-2 py-1 border-2 bg-blue-100 rounded-lg border-blue-200" type="number" />
                </div>
            </div>
            <button className="mt-3 bg-blue-500 text-white font-semibold rounded-lg drop-shadow-lg p-2 capitalize border-2 border-blue-600">agregar producto</button>
        </form>
    )

}

export { AddProductToPurchase }