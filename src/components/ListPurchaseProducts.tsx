import { NewPurchaseProduct } from "../types"
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri"
import { useEffect, useState } from "react";
import { PurchaseModal } from "../modal/PurchaseModal";
import { deleteProductPurchase } from "../reducer/compras";
import Swal from 'sweetalert2'

interface Props {
	productsPurchases: NewPurchaseProduct[]
}
const ListPurchaseProducts = ({ productsPurchases }: Props) => {
	const [productModal, setProductModal] = useState<NewPurchaseProduct | undefined>({})
	const [purchaseModal, setPurchaseModal] = useState(false)
	const ModalState = (): void => {
		setPurchaseModal(!purchaseModal)
	}
	const handleDeleteProductPurchase = (product:NewPurchaseProduct) => {
		// deleteProductPurchase(product)

		Swal.fire({
			icon: 'warning',
			title: 'Eliminar Compra',
			text: 'Estas seguro que quieres borrar esta compra?',
			showDenyButton: true,
			denyButtonText:'cancelar',
			confirmButtonText:'eliminar'
		}).then( purchase => {
			if(purchase.isConfirmed) {
				 deleteProductPurchase(product)
				Swal.fire('Exito','La compra se elimino correctamente', 'success')
			}else {
				Swal.fire('cancelado','tranquilo no paso nada', 'success')

			}
		})
	}
	return (
		<>
			<div className="rounded-lg shadow overflow-hidden ">
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

											<RiEdit2Fill onClick={() => {setPurchaseModal(!purchaseModal); product && setProductModal(product)}} className="cursor-pointer mx-2 bg-yellow-400 text-black rounded-sm " />
											
											<RiDeleteBin5Line onClick={() => {handleDeleteProductPurchase(product)}} className="cursor-pointer mx-2 text-red-600" />
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
		</>
	)
}

export { ListPurchaseProducts }