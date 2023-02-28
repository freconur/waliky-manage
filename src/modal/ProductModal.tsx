import React, { useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { getCategories, updateItemProv } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"


interface Props {
	onChangeCategories: () => void,
	itemInfo: Product
}
const ProductModal = ({ onChangeCategories, itemInfo }: Props) => {

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allCategories } = state
	const [item, setItem] = useState<Product>({})
	console.log('itemInfo', itemInfo)
	useEffect(() => {
		getCategories(dispatch)
	}, [])
	const onChangeOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItem({
			...item,
			category: e.target.value
		})
	}
	const updateItem = () => {
		updateItemProv(itemInfo, `${item.category}`)
	}
	return ReactDOM.createPortal(
		<div className="absolute inset-0 bg-white flex justify-center">
			<div className="border-4 p-2 rounded-lg w-full m-3">
				<div onClick={onChangeCategories} className="cursor-pointer flex justify-end mb-2"><span className="flex justify-center items-center text-lg font-bold text-white h-10 w-10 rounded-full shadow-md bg-blue-700">X</span></div>
				
				<div>
					<div>
					</div>
					<div className="w-32">
						<img className="w-32" src={itemInfo.image} alt="" />
					</div>
					<span className="text-gray-400 text-lg font-semibold capitalize">nombre:</span> 
					<div>
					<input className="border-2 rounded-md pl-1 w-full" placeholder={itemInfo.name} />

					</div>
					<div>
					<label className="text-gray-400 text-lg font-semibold capitalize">categoria:</label>
					<select className="border-2 p-1 rounded-md" onChange={onChangeOptionValue} disabled >
						<option value={itemInfo.category} >{itemInfo.category}</option>
						{allCategories.map((category, index) => {
							return (
								<option key={index} value={category.name}>{category.name}</option>
							)
						})}
					</select>
				</div>
					<div>
						<label className="text-gray-400 text-lg font-semibold capitalize">stock:</label>
						<div>
						<input className="border-2 rounded-md pl-1 w-full" placeholder={`${itemInfo.stock}`} />
						</div>
					</div>
					<div>
						<label className="text-gray-400 text-lg font-semibold capitalize">precio:</label>
						<div>
						<input className="border-2 rounded-md pl-1 w-full" placeholder={`${itemInfo.price}`} />
						</div>
					</div>
					<div>
						<label className="text-gray-400 text-lg font-semibold capitalize">estado:</label>
						<div>
						<input className="border-2 rounded-md pl-1 w-full" placeholder={itemInfo.state ===true ? "activo" : "no activo" } />
						</div>
					</div>
				</div>
				<button className="bg-yellow-400 m-5 rounded-lg p-2" onClick={updateItem}>actualizar</button>
			</div>

		</div>,
		document.getElementById("productModal")!
	)

}

export { ProductModal }