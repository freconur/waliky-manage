import { RegistroVenta } from "../components/RegistroVenta"
import { SearchIdProduct } from "../components/SearchIdProduct"
// import { SideBar } from "../components/SideBar"
import { TablaVentas } from "../components/TablaVentas"

const Home = () => {
	return (
		<>
			<div className="flex">

				{/* <SideBar /> */}
				<div className="">
					<SearchIdProduct />
					<RegistroVenta />
					<TablaVentas />
				</div>
			</div>
		</>
	)
}

export { Home }