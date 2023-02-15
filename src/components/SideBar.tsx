
import { useEffect, useReducer, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { RiCurrencyFill } from "react-icons/ri";
import { BsFillGrid1X2Fill } from "react-icons/bs";
// import { RiDatabaseFill } from "react-icons/bs";
// import { RiFileSearchFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import { getOptions } from "../reducer";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";


const SideBar = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true)
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  useEffect(() => {
    getOptions(dispatch)
  }, [])
  const { options } = state;
  return (
    <>
    <div className="relative">

      <div className={`bg-cyan-700 h-screen pt-2 ${openSidebar ? "w-100 p-5" : "w-12 p-1"} duration-1000 sticky inset-y-0`}>
        <BsArrowLeftShort onClick={() => setOpenSidebar(!openSidebar)} className={`bg-white text-cyan-700 text-2xl rounded-full absolute -right-3 top-12 border border-cyan-700 cursor-pointer ${!openSidebar && "rotate-180"}`} />
        <div className="inline-flex ml-1 mt-1">
          <BsClipboardData className={`m-auto bg-amber-300 p-1 rounded cursor-pointer block float-left text-4xl w-8 duration-1000 ${!openSidebar && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium duration-1000 text-2xl ml-2 ${!openSidebar && "scale-0"}`}> Manage</h1>
        </div>

        <ul className="mt-5">
          {Array.isArray((options)) &&
            options?.map((item, index) => {
              return (
                <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2  rounded-md mt-2 capitalize   hover:bg-white">
                  <Link to={`${item.path}`} className="w-48">
                    <img className="text-2xl block float-left" src={item.image} alt="" />
                    {/* <span className="text-2xl block float-left"><BsFillGrid1X2Fill/></span> */}
                    <span className={`text-base font-medium flex-1 ml-2 font-semibold ${!openSidebar && "hidden"}`}>{item.option}</span>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
    </>
  )

}

export { SideBar }