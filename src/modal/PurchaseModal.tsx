import React, { useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { ToastContainer, toast } from "react-toastify"
import { updateProductPurchase } from "../reducer/compras"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { NewPurchaseProduct } from "../types"

interface Props {
	modalState: () => void,
	productModal: NewPurchaseProduct | undefined
}
const PurchaseModal = ({ productModal, modalState }: Props) => {

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { warningMessagePurchase } = state
	useEffect(() => {
		if (warningMessagePurchase) {
			toast.success(warningMessagePurchase, {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			// dispatch({type:"warningMessagePurchase", payload: ''})
		}
	}, [warningMessagePurchase])

	const [productPurchase, setProductPurchase] = useState<NewPurchaseProduct>({
		id: productModal?.id,
		name: productModal?.name,
		cantidad: productModal?.cantidad,
		costoTotal: productModal?.costoTotal,
		costoUnitario: productModal?.costoUnitario,
	})
	const onChangeInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProductPurchase({
			...productPurchase,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmitEditPurchase = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateProductPurchase(dispatch, productPurchase)
		// setTimeout(() => {
		// 	modalState()
		// },1000)
	}
	return ReactDOM.createPortal(

		<div className="duration-1000 absolute z-50 inset-0 bg-modal-color grid place-content-center">
			{warningMessagePurchase && <ToastContainer />}

			<div className="bg-white p-5 rounded-xl">
				<div className="flex justify-end ">
					<div onClick={modalState} className="drop-shadow-lg cursor-pointer h-8 w-8 bg-red-500 rounded-full flex justify-center items-center">
						<div className=" uppercase text-white font-bold">x</div>
					</div>
				</div>
				<h1 className="text-cyan-700 capitalize font-semibold text-xl">editar las compras</h1>
				<form onSubmit={handleSubmitEditPurchase}>
					<div className="mt-2">
						<label className="text-gray-600 capitalize ">descripcion</label>
						<input name="name" onChange={onChangeInputValues} value={productPurchase.name} className="block border-3 rounded-lg bg-blue-100 border-4 border-blue-200 p-1 text-gray-400 font-semibold" type="text" placeholder="descripcion" />
					</div>
					<div className="mt-2">
						<label className="text-gray-600 capitalize ">cantidad</label>
						<input name="cantidad" onChange={onChangeInputValues} value={productPurchase.cantidad} className="block  border-3 rounded-lg bg-blue-100 border-4 border-blue-200 p-1 text-gray-400 font-semibold" type="text" placeholder="cantidad" />
					</div>
					<div className="mt-2">
						<label className="text-gray-600 capitalize ">costo total</label>
						<input name="costoTotal" onChange={onChangeInputValues} value={productPurchase.costoTotal} className="block  border-3 rounded-lg bg-blue-100 border-4 border-blue-200 p-1 text-gray-400 font-semibold" type="text" placeholder="costo" />
					</div>
					{/* <input disabled={true} name="costoUnitario" onChange={onChangeInputValues} value={productPurchase.costoUnitario} className="block my-4 border-3 rounded-lg bg-blue-100 border-4 border-blue-200 p-1 text-gray-400 font-semibold" type="text" placeholder="costo unitario" /> */}
					<div className="flex justify-end mt-2">
						<button className="p-2 rounded-lg drop-shadow-lg bg-yellow-400 text-white font-semibold capitalize hover:bg-yellow-300 duration-300">actualizar</button>
					</div>
				</form>
			</div>
		</div>,
		document.getElementById("productModal")!
	)

}

export { PurchaseModal }