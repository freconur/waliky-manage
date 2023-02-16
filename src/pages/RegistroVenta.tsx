import React, { useEffect, useReducer, useState } from "react"
import { useLocation } from "react-router-dom"
import { addCurrentProductToSell, deleteCurrentProduct, getCurrentProductSell, getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { InputValueVentas } from '../types'
import { RiDeleteBin5Line } from "react-icons/ri";
import { CopyToClipboard } from 'react-copy-to-clipboard'



const RegistroVenta = () => {
	const location = useLocation()
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product, pathProduct, currentProductSell, cantidadProduct, warningStockCantidad, warningStock } = state
	const [id, setId] = useState('')
	const [inputValue, setInputValue] = useState<InputValueVentas>({
		id: '',
		cantidad: 1,
		location: location.pathname,
		newStock: 0,
		pathProduct: pathProduct
	})
	console.log('product', product)
	useEffect(() => {
		getCurrentProductSell(dispatch)
		setInputValue({
			...inputValue,
			cantidad: cantidadProduct,
			newStock: parseInt(`${product.stock}`, 10) - cantidadProduct,
			pathProduct: pathProduct
		})
	}, [product, pathProduct, cantidadProduct])
	const onChangeIdProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value)
		getProductById(dispatch, inputValue, e.target.value)
	}
	const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value
		})
	}
	const addProductToSell = () => {
		if (currentProductSell.length >= 1) {
			const rtaaddProductToSell = currentProductSell.find(item => item.idProduct === product.idProduct)
			if (rtaaddProductToSell?.stock === 0) {
				// return console.log("ya no hay stock suficiente")
				return dispatch({ type: "warningStock", payload: "no hay stock suficiente" })
			}
		}
		if (Object.entries(product).length === 0 || product.stock === 0) {
			console.log('no hay stock o no has ingresado datos del producto')
		} else {
			const productToSell = { ...product, stock: inputValue.newStock, pathProduct: `/${inputValue.pathProduct}` }
			addCurrentProductToSell(dispatch, productToSell, inputValue)
		}
	}
	const onDeleteCurrentProduct = (id: string) => {
		deleteCurrentProduct(dispatch, id)
	}
	const onSubmitFormSell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		updateStockProduct(inputValue, currentProductSell, dispatch)
	}
	return (
		<div className="m-10 max-xs:m-3">
			<h1 className="uppercase text-cyan-700 font-bold text-2xl">gestion de ventas</h1>
			<div className="w-full">
				<div className="mt-2 w-full flex flex-col ">
					<label className="text-md font-medium text-gray-500 ">id de producto</label>
					<div className="mb-4 mt-0">
						<input className="border p-1 pl-3" onChange={onChangeIdProduct} value={id} type="text" placeholder="id" name="id" />
						<p>{inputValue.id}</p>
					</div>
				</div>
				<div className="flex relative max-w-[768px] mb-5">
					<div className="overflow-auto relative rounded-lg border-blue-200 border w-full drop-shadow-md">
						<div onClick={addProductToSell} className="absolute cursor-pointer z-20 inset-0"></div>
						<table className="w-full rounded-lg  bg-blue-100 max-xm:hidden">
							<tbody className="w-full">
								{Object.entries(product).length === 0 || id.length < 20
									?
									<tr className="w-full">
										<th className="text-left text-md pl-2 font-medium text-blue-300">descripcion</th>
										<th className="text-left text-md border-blue-200 border-l-2 pl-2 font-medium text-blue-300">precio</th>
										<th className="text-left text-md border-blue-200 border-l-2 pl-2 font-medium text-blue-300">stock</th>
										<th className="text-left text-md border-blue-200 border-l-2 pl-2 font-medium text-blue-300">estado</th>
										<th className="text-left text-md border-blue-200 border-l-2 pl-2 font-medium text-blue-300">cantidad</th>
									</tr>
									:
									<tr className="w-full">
										<th className="text-left text-md pl-2 font-medium text-blue-500 capitalize">{product.name}</th>
										<th className="text-center text-md border-blue-200 border-l-2 min-w-[30px] font-medium text-blue-500">{product.price}</th>
										<th className="text-center text-md border-blue-200 border-l-2  min-w-[30px] font-medium text-blue-500">{product.stock}</th>
										<th className="text-center text-md border-blue-200 border-l-2 mr-1 ml-1 min-w-[30px] font-medium text-blue-500">{`${product.state === true ? "activo" : "inactivo"}`}</th>
										<th className="text-center min-w-[73.4px] text-md border-blue-200 border-l-2 font-medium text-blue-500">
											<div className="p-1 border relative w-full">
												<button onClick={() => dispatch({ type: "less", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="absolute left-1 rounded-full border border-blue-300 w-5 m-0 h-5 z-40 text-center leading-3 hover:bg-blue-500 duration-300 hover:text-white hover:border-white">-</button>
												<input onChange={onChangeIdFormVentas} value={cantidadProduct} name="cantidad" placeholder="1" className=" text-center w-10 bg-blue-100" />
												<button onClick={() => dispatch({ type: "plus", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="right-1 absolute m-0 rounded-full  border border-blue-300 w-5 h-5 z-40 text-center leading-3  hover:bg-blue-500 duration-300 hover:text-white hover:border-white">+</button>
											</div>
										</th>
									</tr>
								}
							</tbody>
						</table>
						<ul className="hidden p-2 m-2 bg-blue-100 max-xm:block">
							{Object.entries(product).length === 0 || id.length < 20
								?
								<li>ingresa un producto</li>
								:
								<li className="relative">
									<div onClick={addProductToSell} className="absolute cursor-pointer z-20 bg-transparent inset-0"></div>
									<div className="flex justify-between mb-2">
										<img className="w-[50px] h-[50px] mr-2" src={product.image} alt={product.name} />
										<p className="text-gray-500 font-semibold capitalize">{product.name}</p>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600 text-md font-semibold">precio: <span className="font-bold text-blue-700">s/{product.price}</span></span>
										<span className="text-gray-600 text-md font-semibold">stock: <span className="font-bold text-blue-700">{product.stock}</span></span>
									</div>
									<div className="flex justify-between">
										<div className="text-gray-600 text-md font-semibold mt-1">cantidad:</div>
										<div className="p-1 w-[68px] leading-normal relative">
											<button onClick={() => dispatch({ type: "less", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="absolute rounded-full border border-blue-300 w-5 m-0 h-5 z-40 text-center leading-3  hover:bg-blue-500 duration-300 hover:text-white hover:border-white">-</button>
											<input onChange={onChangeIdFormVentas} value={cantidadProduct} name="cantidad" placeholder="1" className="absolute left-7 max-w-[20px] text-blue-700 font-bold bg-blue-100" />
											<button onClick={() => dispatch({ type: "plus", payload: cantidadProduct, payload2: parseInt(`${product.stock}`, 10) })} className="absolute m-0 rounded-full  border border-blue-300 w-5 h-5 z-40 text-center leading-3 right-2 hover:bg-blue-500 duration-300 hover:text-white hover:border-white">+</button>
										</div>
									</div>

								</li>
							}
						</ul>
					</div>
				</div>
				<span className="text-red-600">{warningStock && `*${warningStock}.`}</span>
				<span className="text-red-600">{warningStockCantidad && `*${warningStockCantidad}.`}</span>
			</div>
			<h2 className="mt-5 mb-2 text-gray-500 capitalize font-bold text-lg">registrar venta</h2>
			<div className="rounded-lg overflow-auto shadow  mr-5 w-full ">
				<table className="w-full overflow-auto max-xm:hidden">
					<thead className=" bg-gray-50 border-b-2 border-gray-200 capitalize">
						<tr className="p-5">
							<th className="p-2 text-gray-500 text-left">nº</th>
							<th className="p-2 text-gray-500 text-left w-[768px]">descripcion</th>
							<th className="p-2 text-gray-500 text-center">precio</th>
							<th className="p-2 text-gray-500 text-center">stock</th>
							<th className="p-2 text-gray-500 text-center">cantidad</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{
							currentProductSell.length === 0
								?
								<tr className="text-center w-auto">
									<td className="text-gray-400 bg-white capitalize text-md">1</td>
									<td className="text-gray-400 bg-white capitalize text-md text-left">aun no hay productos por registrar</td>
									<td className="text-center text-gray-400 bg-white capitalize text-md">0</td>
									<td className="text-center text-gray-400 bg-white capitalize text-md">0</td>
									<td className="text-center text-gray-400 bg-white capitalize text-md">0</td>
								</tr>
								:
								// currentProductSell.map(({ id, name, price, stock, cantidad }, index) => {
								currentProductSell.map((item, index) => {
									return (
										<tr key={id}>
											<td className="text-gray-400 bg-white pl-1 text-center capitalize text-md">
												<div className="text-white bg-blue-400 font-bold cursor-pointer rounded-full border h-[25px] w-[25px]">
													<CopyToClipboard text={`${item.idProduct}`}>
														<span>
															{index + 1}
														</span>
													</CopyToClipboard>
												</div>
											</td>
											<td className="text-gray-400 bg-white capitalize text-md text-left">{item.name}</td>
											<td className="text-gray-400 bg-white capitalize text-md text-center">{item.price}</td>
											<td className="text-gray-400 bg-white capitalize text-md text-center">{item.stock}</td>
											<td className="text-gray-400 bg-white capitalize text-md text-center">{item.cantidad}</td>
											<td className="text-red-600 bg-white capitalize text-md cursor-pointer text-center"><RiDeleteBin5Line onClick={() => onDeleteCurrentProduct(`${item.id}`)} /></td>
										</tr>
									)
								})
						}
					</tbody>
				</table>
				<ul className="hidden max-xm:block p-2 ">
					{currentProductSell.length === 0
						?
						<li className="p-2 bg-green-400 rounded-sm shadow">no hay producto para registrar</li>
						:
						currentProductSell.map((item, index) => {
							return (
								<li key={item.id} className="p-2 bg-green-100 rounded-sm shadow mb-2">
									<div className="mb-1 flex justify-between">
										<div className=" rounded-lg duration-500 text-center bg-blue-400 w-3 cursor-pointer text-white font-bold hover:bg-blue-300 hover:text-gray-700">
											<CopyToClipboard text={`${item.idProduct}`}>
												<div className="text-sm">id: {index + 1}</div>
											</CopyToClipboard>
										</div>
										<div className="text-red-700 text-lg flex flex-row-reverse cursor-pointer"><RiDeleteBin5Line onClick={() => onDeleteCurrentProduct(`${item.id}`)} /></div>
									</div>
									<div className="flex justify-between mb-2">
										<img className="w-[50px] h-[50px] mr-2" src={item.image} alt={item.name} />
										<p className="text-gray-500 font-semibold capitalize">{item.name}</p>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600 text-md font-semibold">precio: <span className="font-bold text-blue-700">s/{item.price}</span></span>
										<span className="text-gray-600 text-md font-semibold">stock sobrante: <span className="font-bold text-blue-700">{item.stock}</span></span>
									</div>
									<div className="flex justify-between">
										<div className="text-gray-600 text-md font-semibold mt-1">cantidad:</div>
										<div className="p-1 w-[68px] text-right leading-normal font-bold text-blue-700">{item.cantidad}</div>
									</div>

								</li>
							)
						})
					}
				</ul>
			</div>
			<button className=" bg-yellow-300 hover:bg-yellow-200 h-[30px] w-[100px] rounded-lg drop-shadow-lg text-md  mr-5 mt-5 font-semibold capitalize" onClick={onSubmitFormSell}>registrar</button>
		</div>
	)
}
export { RegistroVenta }