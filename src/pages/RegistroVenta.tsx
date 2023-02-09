import React, { useEffect, useReducer, useState } from "react"
import { useLocation } from "react-router-dom"
import { getCurrentProductSell, getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas, SearchById } from '../types'

const RegistroVenta = () => {
	const location = useLocation()
	const [inputIdValue, setInputIdValue] = useState<InputValueVentas>({
		id: '',
		cantidad: 0
	})
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, pathProduct,currentProductSell } = state
	console.log('currentProductSell',currentProductSell)
	useEffect(() => {
		getCurrentProductSell(dispatch)
	}, [product, pathProduct])

	const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputIdValue({
			...inputIdValue,
			[e.target.name]: e.target.value
		})
	}
	const onSubmitCheckId = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		getProductById(dispatch, inputIdValue, location.pathname)
	}
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
			<div className="m-10">
				<h1 className="uppercase text-2xl">registro de ventas</h1>
				{/* <form className="form-ventas">
					<div className="flex flex-col">
						<label className="text-2xl">id de producto</label>
						<div>
							<input className="border p-1 pl-3" onChange={onChangeIdFormVentas} type="text" placeholder="id" name="id" />
							<button className="ml-2" onClick={onSubmitCheckId}>✅</button>
						</div>
					</div>
					<input type="text" disabled placeholder={`${product.name ? product.name : "descripcion"}`} name="name" />
					<input type="text" disabled placeholder={`${product.price ? product.price : "precio"}`} name="price" />
					<input type="number" disabled placeholder={`${product.stock ? product.stock : "stock"}`} name="stock" />
					<input onChange={onChangeIdFormVentas} type="number" placeholder="ingresa cantidad" name="cantidad" />
					{product.stock
						&& <input type="text" disabled value="activo" placeholder="estado" name="state" />}
					<button onClick={onSubmitFormVentas}>registrar</button>
				</form> */}
				<table>
					<thead>
						<tr>
							<th className="w-48">descripcion</th>
							<th className="w-48">precio</th>
							<th className="w-48">stock</th>
							<th className="w-48">cantidad</th>
						</tr>
					</thead>
					<tbody>
						{currentProductSell?.map(item => {
							return (
								<tr className="text-center">
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.stock}</td>
									<td><div><button className="m-1 rounded-full border w-5 h-5 text-center leading-3">-</button><span>1</span><button className="m-1 rounded-full border w-5 h-5 text-center leading-3">+</button></div></td>
								</tr>
							)
						})}

					</tbody>
				</table>
			</div>
		</>
	)
}

export { RegistroVenta }