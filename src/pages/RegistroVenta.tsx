import React, { useEffect, useReducer, useState } from "react"
import { useLocation } from "react-router-dom"
import { addCurrentProductToSell, getCurrentProductSell, getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas } from '../types'

const RegistroVenta = () => {
	const location = useLocation()
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, pathProduct, currentProductSell, cantidadProduct, warningStockCantidad } = state
	const [inputValue, setInputValue] = useState<InputValueVentas>({
		id: '',
		cantidad: 1,
		location: location.pathname,
		newStock: 0,
		pathProduct: pathProduct
	})
	useEffect(() => {
		getCurrentProductSell(dispatch)
		setInputValue({
			...inputValue,
			cantidad: cantidadProduct,
			newStock: parseInt(`${product.stock}`, 10) - cantidadProduct,
			pathProduct: pathProduct
		})
	}, [product, pathProduct, cantidadProduct])
	console.log('product', product)
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
		if (Object.entries(product).length === 0 || product.stock === 0) {
			console.log('no hay stock o no has ingresado datos del producto')
		} else {
			const productToSell = { ...product, stock: inputValue.newStock, pathProduct: `/${inputValue.pathProduct}` }
			addCurrentProductToSell(dispatch, productToSell, inputValue)
		}
	}
	const onSubmitFormSell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		updateStockProduct(inputValue, currentProductSell, dispatch)
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
						<input className="relative p-3 w-24 border" type="number" placeholder={`${product.stock === 0 || product.stock ? product.stock : "stock"}`} name="stock" />
						<input className="border p-3 w-24" type="text" placeholder={`${product.stock ? "activo" : "estado"}`} name="state" />
					</div>
					<div className="p-3 relative border w-24">
						<button onClick={() => dispatch({ type: "less", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="m-1 rounded-full absolute border w-5 h-5 z-40 text-center leading-3 left-2 hover:bg-blue-500 duration-300 hover:text-white">-</button>
						<input onChange={onChangeIdFormVentas} value={cantidadProduct} name="cantidad" placeholder="1" className="text-center w-5 ml-6" />
						<button onClick={() => dispatch({ type: "plus", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="m-1 rounded-full absolute border w-5 h-5 z-40 text-center leading-3 right-2 top-3 hover:bg-blue-500 duration-300 hover:text-white">+</button>
					</div>
				</div>
				<span className="text-red-600">{warningStockCantidad && `*${warningStockCantidad}.`}</span>
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
					{
						currentProductSell.length === 0
							?
							<tr className="text-center">
								<td>aun no hay productos por registrar</td>
								<td>0</td>
								<td>0</td>
								<td>0</td>
							</tr>
							:
							currentProductSell.map((item, index) => {
								return (
									<tr key={index} className="text-center">
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td>{item.stock}</td>
										<td>{item.cantidad}</td>
									</tr>
								)
							})
					}
				</tbody>
			</table>
			<button className="hover:bg-fuchsia-600" onClick={onSubmitFormSell}>registrar</button>
		</div>
	)
}
export { RegistroVenta }