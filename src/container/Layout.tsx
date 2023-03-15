import { SideBar } from "../components/SideBar"

type Props = {
    // children: JSX.Element | JSX.Element[],
    children: string | JSX.Element | JSX.Element[] 
  };
const Layout = ({children}:Props) => {


    return(
        <div className="flex">
            <SideBar />
            <div className="flex justify-center w-full">
                {children}
            </div>
        </div>
    )
}

export {Layout}