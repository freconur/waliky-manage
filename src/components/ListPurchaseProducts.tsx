import { NewPurchaseProduct } from "../types"
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri"
import React, { useEffect, useReducer, useState } from "react";
import { PurchaseModal } from "../modal/PurchaseModal";
import { deleteProductPurchase, getProductPurchaseByOrder, getProductsPurchase, getPurchasePerMonth } from "../reducer/compras";
import Swal from 'sweetalert2'
import { PurchaseSelectByOrder } from "./inputsUpdate/purchaseComponents/PurchaseSelectByOrder";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";
import { OptionPurchasePerMonth } from "./inputsUpdate/OptionPurchasePerMonth";

interface Props {
	// productsPurchases: NewPurchaseProduct[],
	handleNewValueSelectOrderBy: (orderBy: string) => void
}
const ListPurchaseProducts = ({ handleNewValueSelectOrderBy }: Props) => {
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const [productModal, setProductModal] = useState<NewPurchaseProduct | undefined>({})
	const [purchaseModal, setPurchaseModal] = useState(false)
	const { productsPurchases } = state
	const ModalState = (): void => {
		setPurchaseModal(!purchaseModal)
	}
	const handleDeleteProductPurchase = (product: NewPurchaseProduct) => {
		// deleteProductPurchase(product)

		Swal.fire({
			icon: 'warning',
			title: 'Eliminar Compra',
			text: 'Estas seguro que quieres borrar esta compra?',
			showDenyButton: true,
			denyButtonText: 'cancelar',
			confirmButtonText: 'eliminar'
		}).then(purchase => {
			if (purchase.isConfirmed) {
				deleteProductPurchase(product)
				Swal.fire('Exito', 'La compra se elimino correctamente', 'success')
			} else {
				Swal.fire('cancelado', 'tranquilo no paso nada', 'success')

			}
		})
	}
	const byOrderHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleNewValueSelectOrderBy(e.target.value)
		// getProductPurchaseByOrder(dispatch, e.target.value)
		dispatch({ type: "purchaseOrderBy", payload: e.target.value, payload2: productsPurchases })
	}
	useEffect(() => {
		getProductsPurchase(dispatch)
	}, [])
	const onChangeValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// dispatch({type:"selectMonth", payload: e.target.value})
		getPurchasePerMonth(dispatch, e.target.value)
	}
	return (
		<>
			<PurchaseSelectByOrder byOrderHandler={byOrderHandler} />
			<OptionPurchasePerMonth onChangeValueSelect={onChangeValueSelect} />
			<div className="rounded-lg w-full shadow overflow-hidden max-xm:hidden">
				{purchaseModal &&
					<PurchaseModal productModal={productModal} modalState={ModalState} />
				}
				<table className="w-full overflow-auto">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr className="">
							<th className="p-2 pl-3 capitalize text-gray-500 w-40  text-sm font-semibold tracking-wide text-left ">descripcion</th>
							<th className="p-2 capitalize text-gray-500 w-8 text-sm font-semibold tracking-wide ">cantidad</th>
							<th className="p-2 capitalize text-gray-500 w-8 text-sm font-semibold tracking-wide ">costo</th>
							<th className="p-2 capitalize text-gray-500 w-8 text-sm font-semibold tracking-wide ">costo unitario</th>
							<th className="p-2 capitalize text-gray-500 w-8 text-sm font-semibold tracking-wide ">editar | borrar</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{productsPurchases.length > 0 ?

							productsPurchases.map((product, index) => {

								return (
									<tr className="w-auto text-center" key={index}>
										<td className="text-left duration-900 bg-white pl-3 p-1 capitalize text-gray-400 text-md ">{product.name}</td>
										<td className=" duration-900 bg-white p-1 capitalize text-gray-400 text-md ">{product.cantidad}</td>
										<td className=" duration-900 bg-white p-1 capitalize text-gray-400 text-md ">{product.costoTotal}</td>
										<td className=" duration-900 bg-white p-1 capitalize text-gray-400 text-md ">{product.costoUnitario}</td>
										<td className=" duration-900 bg-white p-1 capitalize text-gray-400 text-md ">
											<div className="flex justify-center">

												<RiEdit2Fill onClick={() => { setPurchaseModal(!purchaseModal); product && setProductModal(product) }} className="cursor-pointer mx-2 bg-yellow-400 text-black rounded-sm " />

												<RiDeleteBin5Line onClick={() => { handleDeleteProductPurchase(product) }} className="cursor-pointer mx-2 text-red-600" />
											</div>
										</td>
									</tr>
								)
							})
							:
							<tr className="text-left w-full"><td className="text-gray-400 font-semibold pl-3 ">aun hay compras</td></tr>
						}
					</tbody>
				</table>
			</div>
			<div className="hidden max-xm:block">
				<ul>
					{productsPurchases.map((item, index) => {
						return (
							<li key={index} className="bg-blue-50 rounded-lg my-4 min-w-[300px] border-4 border-blue-100 overflow-hidden drop-shadow-md">
								<div className="bg-blue-100 pl-2">
									<p className="text-gray-400 font-semibold capitalize text-lg">{item.name}</p>
								</div>
								<div className="flex">
									<div className="w-full mr-2  flex text-red-500 justify-between px-1 text-sm">
										<div className="font-semibold uppercase">ct:</div>
										<div className="font-semibold uppercase">S/ {item.costoTotal}</div>
									</div>
									<div className="w-full mr-2  flex text-green-500 justify-between px-1 text-sm">
										<p className="font-semibold uppercase">un:</p>
										<span className="font-semibold uppercase">{item.cantidad}</span>
									</div>
									<div className="w-full mr-2  flex text-cyan-500 justify-between px-1 text-sm">I
										<p className="font-semibold uppercase">cu:</p>
										<span className="font-semibold uppercase">S/ {item.costoUnitario}</span>
									</div>
								</div>
								<div className="flex justify-end my-1">
									<div className="flex">
										<RiEdit2Fill onClick={() => { setPurchaseModal(!purchaseModal); item && setProductModal(item) }} className="cursor-pointer mx-2 bg-yellow-400 text-black rounded-sm " />

										<RiDeleteBin5Line onClick={() => { handleDeleteProductPurchase(item) }} className="cursor-pointer mx-2 text-red-600" />
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</>
	)
}

export { ListPurchaseProducts }