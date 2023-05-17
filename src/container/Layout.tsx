import { useState } from "react";
import { SideBar } from "../components/SideBar"
import { Navbar } from "../components/navbar/Navbar";

type Props = {
  // children: JSX.Element | JSX.Element[],
  children: string | JSX.Element | JSX.Element[]
};
const Layout = ({ children }: Props) => {

  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  return (
    <div className="flex relative">
      {/* <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/> */}
      <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <div className="w-full">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
        <div className="relative z-40 bg-white rounded-lg mt-1 p-1 flex w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Layout }