
import { useEffect, useReducer, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getOptions } from "../reducer";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";
import { ListSidebar } from "./ListSideBar";
interface Props {
  openSidebar: boolean,
  setOpenSidebar:React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({openSidebar,setOpenSidebar}:Props) => {
  // const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const [arrowAnimation, setArrowAnimation] = useState(false)
  useEffect(() => {
    getOptions(dispatch)
  }, [])
  const pruebita = (aaa:boolean) => {
    setArrowAnimation(aaa)
    console.log('funcionando', arrowAnimation)
  }
  return (
    
      <div className={`z-50 absolute duration-300 -left-[300px] ${openSidebar && "left-0 duration-300"}`}>
      {/* <div className={`sticky -left-[300px] ${openSidebar ? "w-100 p-5" : "w-12 p-1"}`}> */}

        {/* <div className={`bg-cyan-700 h-screen pt-2 max-cs:w-12 max-cs:p-1 ${openSidebar ? "w-100 p-5" : "w-12 p-1"} duration-1000 sticky inset-y-0`}> */}
        <div className={`rounded-r-xl bg-cyan-700 h-screen pt-2  max-cs:p-1  inset-y-0`}>
          {/* <BsArrowLeftShort onClick={() => setOpenSidebar(!openSidebar)} className={`max-cs:hidden bg-white text-cyan-700 text-2xl rounded-full absolute -right-3 top-12 border border-cyan-700 cursor-pointer ${!openSidebar && "rotate-180"}`} /> */}
          <BsArrowLeftShort onClick={() => {setOpenSidebar(!openSidebar); setArrowAnimation(false)}} className={` bg-white text-cyan-700 text-2xl rounded-full absolute -right-3 top-12 border border-cyan-700 cursor-pointer ${arrowAnimation ? "animate-pulse duration-500" : "animate-none" } ${!openSidebar && "rotate-180" }`} />
          <div className="inline-flex ml-1 mt-1">
            <Link to="/">
              <BsClipboardData className={`m-auto bg-amber-300 p-1 rounded cursor-pointer block float-left text-4xl w-8 duration-1000 ${!openSidebar && "rotate-[360deg]"}`} />
            </Link>
            <h1 className={`text-white origin-left font-medium duration-100 text-2xl ml-2  ${!openSidebar && "scale-0"}`}> Manage</h1>
          </div>
          <ListSidebar pruebita={pruebita} openSidebar={openSidebar} />
          
        </div>
      </div>
    
  )

}

export { SideBar }