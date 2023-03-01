import React, { useEffect, useReducer, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { getCategories, updateItemProv } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"
import { RiEdit2Fill } from "react-icons/ri";
import { PriceInput } from "../components/inputsUpdate/PriceInput"
import { StockInput } from "../components/inputsUpdate/StockInput"
import { NameInput } from "../components/inputsUpdate/NameInput"


interface Props {
	onChangeCategories: () => void,
	itemInfo: Product
}
const ProductModal = ({ onChangeCategories, itemInfo }: Props) => {

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allCategories } = state
	const [item, setItem] = useState<Product>({})
	const [active, setActive] = useState<boolean>(true)
	const inputRef = useRef <HTMLInputElement | null >(null)
	useEffect(() => {
		getCategories(dispatch)
	}, [])
	const onChangeOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItem({
			...item,
			category: e.target.value
		})
	}
	const autoFocus = () => {
		setTimeout(() => {
			if(inputRef.current){
				inputRef.current.focus();
			}
		},10)
	}
	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	const updateItem = () => {
		updateItemProv(itemInfo, `${item.category}`)
	}
	return ReactDOM.createPortal(
		<form onSubmit={onSubmitForm} className="absolute inset-0 bg-white flex justify-center">
			<div className="border-4 p-2 rounded-lg w-full m-3">
				<div onClick={onChangeCategories} className="cursor-pointer flex justify-end mb-2"><span className="flex justify-center items-center text-lg font-bold text-white h-10 w-10 rounded-full shadow-md bg-blue-700">X</span></div>

				<div>
					<div>
					</div>
					<div className="w-full flex ">
						<img className="w-32 mr-2" src={itemInfo.image} alt="" />
						<div>
							<StockInput stock={`${itemInfo.stock}`}/>
							<PriceInput price={`${itemInfo.price}`}/>
						</div>
					</div>
					<NameInput  name={`${itemInfo.name}`} />
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
						<label className="text-gray-400 text-lg font-semibold capitalize">estado:</label>
						<div>
							<input disabled className="border-2 rounded-md pl-1 w-full" placeholder={itemInfo.state === true ? "activo" : "no activo"} />
						</div>
					</div>
				</div>
				<button className="bg-yellow-400 m-5 rounded-lg p-2" onClick={updateItem}>actualizar</button>
			</div>

		</form>,
		document.getElementById("productModal")!
	)

}

export { ProductModal }