import React, { useEffect, useReducer, useState } from "react"
import { getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas, SearchById } from '../types'

interface StateRegistroVentas {
	id: SearchById
}

const RegistroVenta = () => {
	const [inputIdValue, setInputIdValue] = useState<InputValueVentas>({
		id: '',
		cantidad: 0
	})

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, pathProduct } = state

	useEffect(() => {
	}, [product, pathProduct])
	console.log('rtaproduct', product)
	const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputIdValue({
			...inputIdValue,
			[e.target.name]: e.target.value
		})
	}
	const onSubmitCheckId = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		getProductById(dispatch, inputIdValue)
	}
	// const onSubmitFormVentas = (e: React.FormEvent<HTMLFormElement>) => {
	const onSubmitFormVentas = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (product.stock) {
			if (product.stock > inputIdValue.cantidad) {
				const newStock: number = product.stock - inputIdValue.cantidad
				updateStockProduct(pathProduct, inputIdValue, newStock, product)
			} else {
				console.log('estas ingresando una mayor cantidad al stock disponible')
			}
		}
	}
	return (
		<>
			{/* <form className="form-ventas" onSubmit={onSubmitFormVentas}> */}
			<form className="form-ventas">
				<div>
					<input onChange={onChangeIdFormVentas} type="text" placeholder="id" name="id" />
					<button onClick={onSubmitCheckId}>✅</button>
				</div>
				<input type="text" disabled placeholder={`${product.name}`} name="name" />
				<input type="text" disabled placeholder={`${product.price}`} name="price" />
				<input type="number" disabled placeholder={`${product.stock}`} name="stock" />
				<input onChange={onChangeIdFormVentas} type="number" placeholder="ingresa cantidad" name="cantidad" />
				{product.stock
					&& <input type="text" disabled value="activo" placeholder="estado" name="state" />}
				{/* <input type="boolean" value={product.state} placeholder="estado" name="state" /> */}
				<button onClick={onSubmitFormVentas}>registrar</button>
			</form>
		</>
	)
}

export { RegistroVenta }