import { Link } from "react-router-dom"
import { RiBarChart2Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiDraftFill } from "react-icons/ri";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";
interface Props {
	openSidebar: boolean,
	pruebita: (aaa:boolean) =>  void
}
const ListSidebar = ({ openSidebar, pruebita }: Props) => {
	const [productActive, setProductActive] = useState<boolean>(false)
	return (
		<ul className="mt-5">
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/estadisticas" className="w-56 p-2">
					<RiBarChart2Fill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold  ${!openSidebar && "hidden"}`}>estadisticas</span>
				</Link>
			</li>
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/ventas" className="w-56 p-2">
					<RiMoneyDollarCircleFill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold  ${!openSidebar && "hidden"}`}>ventas</span>
				</Link>
			</li>
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/registro-de-ventas" className="w-56 p-2">
					<RiDraftFill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold ${!openSidebar && "hidden"}`}>registro de venta</span>
				</Link>
			</li>
			<li  onClick={() => pruebita(!openSidebar)} className=" text-sm items-center gap-x-4 cursor-pointer overflow-hidden   mt-2 capitalize whitespace-nowrap">
				{/* <Link to="/registro-de-productos" className="w-56 p-2"> */}
				<div onClick={() => setProductActive(!productActive)} className={`flex  duration-300 p-2 rounded-lg hover:bg-red-200 text-gray-300 hover:text-gray-500 ${productActive && openSidebar && "rounded-none rounded-t-lg bg-red-200 text-gray-500"}`}>
					<RiArchiveDrawerFill className="text-2xl block float-left " />
					<span className={` text-base flex-1 ml-2 font-semibold   ${!openSidebar && "hidden"}`}>productos</span>
					<RiArrowDownSLine className={`text-[30px] duration-300  ${!openSidebar && "hidden" } ${productActive && "rotate-180"}`} />
				</div>
				{/* </Link> */}
				{productActive && openSidebar && 
					<ul className={`duration-1000  bg-white rounded-lg scale-100 overflow-hidden ${productActive && "rounded-none rounded-b-lg"} `}>
						<li className="text-gray-400 text-md flex items-center gap-x-4 cursor-pointer capitalize   hover:bg-red-100 hover:text-gray-500 whitespace-nowrap duration-300 font-semibold">
							<Link to="registro-de-productos" className="ml-10 py-2 w-full">
							mis productos
							</Link>
						</li>
						<li className="text-gray-400 text-md flex items-center gap-x-4 cursor-pointer capitalize   hover:bg-red-100 hover:text-gray-500 whitespace-nowrap duration-300 font-semibold">
							<Link to="/agregar-producto" className="ml-10 py-2 w-full">
							agregar producto
							</Link>
						</li>
					</ul>
				}
			</li>
		</ul>
	)
}

export { ListSidebar }