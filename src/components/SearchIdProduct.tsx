import React, { useEffect, useReducer, useState } from "react"
import { getCartucherasBts, getProductById } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product, SearchById } from "../types"

interface FormStates {
	form: SearchById
	product: Product
}

const SearchIdProduct = () => {
	const [inputValues, setInputValues] = useState<FormStates['form']>({
		id: ''
	})
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, prueba } = state

	useEffect(() => {
		getCartucherasBts(dispatch)
	}, [product])

	const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getProductById(dispatch, inputValues)
	}
	return (
		<>

			<form onSubmit={handleSubmit}>
				<input onChange={handleChangeForm} type="text" name="id" placeholder="id de producto" />
				<button>Buscar</button>
			</form>
			<ul>

				{
					prueba?.map((item, index) => {
						return (
							<li key={index}>
								<p>{item.name}</p>
								<p>{item.marca}</p>
								<p>{item.price}</p>
								<p>{item.id}</p>
							</li>
						)
					})
				}
			</ul>
			<div>
				<p>{product.name}</p>
				<p>{product.marca}</p>
				<p>{product.price}</p>
				<p>{product.image}</p>
			</div>
		</>
	)
}

export { SearchIdProduct }