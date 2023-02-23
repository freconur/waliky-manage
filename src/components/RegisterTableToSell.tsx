import CopyToClipboard from "react-copy-to-clipboard"
import { RiDeleteBin5Line } from "react-icons/ri"
import { Product } from "../types"

interface Props {
    currentProductSell: Product[],
    onDeleteCurrentProduct: (id:string) => void
}

const RegisterTableToSell = ({currentProductSell, onDeleteCurrentProduct}:Props) => {

return (
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
										<tr key={index}>
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
										<div className=" rounded-full duration-500 text-center bg-blue-400 w-10 cursor-pointer text-white font-bold hover:bg-blue-300 hover:text-gray-700">
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
)
}

export {RegisterTableToSell}