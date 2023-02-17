import { Product } from "../types"

interface Props {
    product: Product,
    addProductToSell: () => void,
    id: string,
    dispatch: (action:any) => void,
    cantidadProduct: number,
    onChangeIdFormVentas: React.FormEventHandler<HTMLInputElement>
}

const TableResultSearchById = ({product, addProductToSell,id, dispatch,cantidadProduct, onChangeIdFormVentas}:Props) => {

    return (
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

        
    )
}

export { TableResultSearchById }