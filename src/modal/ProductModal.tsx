import React, { useEffect, useReducer, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { getCategories, updateItemProv } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"
import { RiEdit2Fill } from "react-icons/ri";
import { PriceInput } from "../components/inputsUpdate/PriceInput"
import { StockInput } from "../components/inputsUpdate/StockInput"
import { NameInput } from "../components/inputsUpdate/NameInput"
import { CategorySelect } from "../components/inputsUpdate/CategorySelect"


interface Props {
	modalState: () => void,
	itemInfo: Product
}
const ProductModal = ({ modalState, itemInfo }: Props) => {

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allCategories } = state
	const [item, setItem] = useState<Product>(
		{
			name: itemInfo.name,
			stock: itemInfo.stock,
			id: itemInfo.id,
			pathProduct: itemInfo.pathProduct,
			price: itemInfo.price,
			marca: itemInfo.marca,
			category: itemInfo.category,
		}
	)
	useEffect(() => {
		getCategories(dispatch)
	}, [])
	const onChangeOptionValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		setItem({
			...item,
			[e.target.name]: e.target.value
		})
	}
	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('item', item)
		updateItemProv(item)
	}
	// const updateItem = () => {
	// }
	console.log('itemInfo', itemInfo)
	return ReactDOM.createPortal(
		<form onSubmit={onSubmitForm} className="absolute inset-0 bg-white flex justify-center ">
			<div className="border-4 p-2 rounded-lg w-full m-3 ">
				<div className="flex justify-between">
					<div className="flex items-center mb-2"><span className="text-gray-400 font-semibold text-lg">Id: {itemInfo.id}</span></div>
					<div onClick={modalState} className="items-center cursor-pointer flex justify-end mb-2 top-2 right-2"><span className="flex justify-center items-center text-lg font-bold text-white h-10 w-10 rounded-full shadow-md bg-blue-700">X</span></div>
				</div>
				<div>
					<div className="w-full flex ">
						<img className="w-32 mr-2" src={itemInfo.image} alt="" />
						<div>
							<StockInput item={item} onChangeOptionValue={onChangeOptionValue} stock={`${itemInfo.stock}`} />
							<PriceInput item={item} onChangeOptionValue={onChangeOptionValue} price={`${itemInfo.price}`} />
						</div>
					</div>
					<NameInput onChangeOptionValue={onChangeOptionValue} item={item} names={`${itemInfo.name}`} />
					<CategorySelect onChangeOptionValue={onChangeOptionValue} allCategories={allCategories} category={`${itemInfo.category}`} />
					<div>
						<label className="text-gray-400 text-lg font-semibold capitalize">estado:</label>
						<div>
							<input disabled className="border-2 rounded-md pl-1 w-full" placeholder={itemInfo.state === true ? "activo" : "no activo"} />
						</div>
					</div>
				</div>
				<div className="flex justify-end my-3">
					<button className="bg-yellow-400 mr-2 rounded-lg p-2 text-white font-semibold hover:bg-yellow-300 duration-500">actualizar</button>
					<button onClick={modalState} className="duration-500 bg-red-500 text-white font-semibold  rounded-lg p-2 hover:bg-red-400 ">cancelar</button>

				</div>
			</div>

		</form>,
		document.getElementById("productModal")!
	)

}

export { ProductModal }