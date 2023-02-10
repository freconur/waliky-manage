import React, { useEffect, useReducer, useState } from "react"
import { useLocation } from "react-router-dom"
import { addCurrentProductToSell, getCurrentProductSell, getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas } from '../types'

const RegistroVenta = () => {
	const location = useLocation()
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, pathProduct, currentProductSell,cantidadProduct} = state
	const [inputValue, setInputValue] = useState<InputValueVentas>({
		id: '',
		cantidad: 1,
		location: location.pathname
	})
	useEffect(() => {
		getCurrentProductSell(dispatch)
		setInputValue({
			...inputValue,
			cantidad:cantidadProduct
		})
	}, [product, pathProduct,cantidadProduct])
	const onChangeIdProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		getProductById(dispatch, inputValue, e.target.value)
	}
	const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value
		})
	}
	const addProductToSell = () => {
		addCurrentProductToSell(dispatch, product, inputValue)
	}
	const onSubmitFormVentas = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (product.stock) {
			if (product.stock > inputValue.cantidad) {
				const newStock: number = product.stock - inputValue.cantidad
				updateStockProduct(pathProduct, inputValue, newStock, product)
			} else {
				console.log('estas ingresando una mayor cantidad al stock disponible')
			}
		}
	}
	return (
			<div className="m-10">
				<h1 className="uppercase text-2xl">registro de ventas</h1>
				<div >
					<div className="flex flex-col ">
						<label className="text-2xl">id de producto</label>
						<div className="mb-5 mt-5">
							<input className="border p-1 pl-3" onChange={onChangeIdProduct} type="text" placeholder="id" name="id" />
							<p>{inputValue.id}</p>
						</div>
					</div>
					<div className="flex relative w-full mb-5">
						<div onClick={addProductToSell} className="absolute cursor-pointer z-20 w-full bg-transparent inset-0"></div>
						<div className="flex cursor-pointer relative text-lg bg-amber-400 z-10">
							<input className="relative w-96 p-3 border" type="text" placeholder={`${product.name ? product.name : "descripcion"}`} name="name" />
							<input className="relative p-3 w-24 border" type="text" placeholder={`${product.price ? product.price : "precio"}`} name="price" />
							<input className="relative p-3 w-24 border" type="number" placeholder={`${product.stock ? product.stock : "stock"}`} name="stock" />
							<input className="border p-3 w-24" type="text" placeholder={`${product.stock ? product.stock : "estado"}`} name="state" />
							{/* <input className="border p-3 w-24" type="text" placeholder="cantidad" name="state" /> */}
						</div>
						<div className="p-3 relative border w-24">
							<button onClick={() => dispatch({type:"less", payload:cantidadProduct})} className="m-1 rounded-full absolute border w-5 h-5 z-40 text-center leading-3 left-2 hover:bg-fuchsia-600">-</button>
							<input onChange={onChangeIdFormVentas} value={cantidadProduct} name="cantidad" placeholder="1" className="text-center"/>
							<button onClick={() => dispatch({type:"plus", payload:cantidadProduct})} className="m-1 rounded-full absolute border w-5 h-5 z-40 text-center leading-3 right-2 top-3 hover:bg-fuchsia-600">+</button>
						</div>
					</div>
					{/* <input className="relative" onChange={onChangeIdFormVentas} type="number" placeholder="ingresa cantidad" name="cantidad" /> */}
				</div>
				<table className="mt-10 border rounded">
					<thead className=" bg-indigo-700 text-white capitalize">
						<tr className="p-5">
							<th className="w-80">descripcion</th>
							<th className="w-48">precio</th>
							<th className="w-48">stock</th>
							<th className="w-48">cantidad</th>
						</tr>
					</thead>
					<tbody>
						{currentProductSell?.map((item, index) => {
							return (
								<tr key={index} className="text-center">
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.stock}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<button className="hover:bg-fuchsia-600" onClick={onSubmitFormVentas}>registrar</button>

			</div>
	)
}

export { RegistroVenta }