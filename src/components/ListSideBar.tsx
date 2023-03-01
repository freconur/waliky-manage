import { Link } from "react-router-dom"
import { RiBarChart2Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiDraftFill } from "react-icons/ri";
import { RiArchiveDrawerFill } from "react-icons/ri";
interface Props {
	openSidebar: boolean
}
const ListSidebar = ({ openSidebar }: Props) => {
	return (
		<ul className="mt-5">
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/estadisticas" className="w-56 p-2">
					<RiBarChart2Fill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold max-cs:hidden ${!openSidebar && "hidden"}`}>estadisticas</span>
				</Link>
			</li>
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/ventas" className="w-56 p-2">
					<RiMoneyDollarCircleFill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold max-cs:hidden ${!openSidebar && "hidden"}`}>ventas</span>
				</Link>
			</li>
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/registro-de-ventas" className="w-56 p-2">
					<RiDraftFill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold max-cs:hidden ${!openSidebar && "hidden"}`}>registro de venta</span>
				</Link>
			</li>
			<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
				<Link to="/registro-de-productos" className="w-56 p-2">
				<div>
					<RiArchiveDrawerFill className="text-2xl block float-left" />
					<span className={`text-base flex-1 ml-2 font-semibold max-cs:hidden ${!openSidebar && "hidden"}`}>productos</span>
				</div>
				</Link>
				{/* <div>
					<ul>
						<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
							mis productos
						</li>
						<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer  rounded-md mt-2 capitalize   hover:bg-red-200 hover:text-gray-500 whitespace-nowrap">
							agregar producto
						</li>
					</ul>
				</div> */}
			</li>
		</ul>
	)
}

export { ListSidebar }