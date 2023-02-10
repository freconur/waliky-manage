import React, { useEffect, useReducer, useState } from "react"
import { useLocation } from "react-router-dom"
import { getCartucherasBts, getProductById } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas, Product, SearchById } from "../types"

interface FormStates {
	form: SearchById
	product: Product
}

const SearchIdProduct = () => {
	const location = useLocation()
	const [inputValues, setInputValues] = useState<InputValueVentas>({
		id: '',
		cantidad: 0,
		location: ''
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