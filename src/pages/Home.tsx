import { RegistroVenta } from "../components/RegistroVenta"
import { SearchIdProduct } from "../components/SearchIdProduct"
import { SideBar } from "../components/SideBar"
import { TablaVentas } from "../components/TablaVentas"


const Home = () => {
    return(
        <>
    <div className="flex">
        <div className="bg-cyan-700 h-screen p-10 w-50">
            <SideBar />
        </div>
        <div className="">
            <SearchIdProduct />
            <RegistroVenta />
            <TablaVentas />
        </div>
    </div>
        </>
    )
}

export {Home}