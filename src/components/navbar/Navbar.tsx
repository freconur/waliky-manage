import { useLocation } from "react-router-dom"
import { RiMenuFill } from "react-icons/ri";

interface Props {
  openSidebar: boolean,
  setOpenSidebar:React.Dispatch<React.SetStateAction<boolean>>
}
const Navbar = ({openSidebar, setOpenSidebar}:Props) => {

  const showSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  const currentLocation = useLocation()
  return (
    <div className="relavite z-10 w-full mt-1 py-2 px-5 flex justify-between rounded-lg h-[60px] bg-white items-center">
      <div onClick={showSidebar} className="cursor-pointer flex items-center justify-centerw-[50px] h-flex justify-center[50px]">
        <RiMenuFill  className="text-3xl text-gray-600 font-bold "/>
      </div>
      {/* <div className="capitalize text-gray-500 font-semibold text-xl">{currentLocation.pathname.slice(1).replaceAll('-'," ")}</div> */}
      <div className="flex justify-center items-center gap-3">
        <div className="bg-blue-500 rounded-full drop-shadow-lg text-center text-lg w-[30px] h-[30px] text-white font-bold">F</div>
        <div><span className="capitalize font-semibold text-gray-500">franco condori</span></div>
      </div>
    </div>
  )
}

export { Navbar }