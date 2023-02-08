
import { useEffect, useReducer, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { getOptions } from "../reducer";
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";


const SideBar = () => {
	const [openSidebar, setOpenSidebar] = useState<boolean>(true)
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	useEffect(() => {
		getOptions(dispatch)
	}, [])
	const { options } = state;
	console.log('options', options)

	return (
		<>
			<div className={`bg-cyan-700 h-screen pt-2 ${openSidebar ? "w-100 p-5" : "w-12 p-1"} duration-300 relative`}>
				<BsArrowLeftShort onClick={() => setOpenSidebar(!openSidebar)} className={`bg-white text-cyan-700 text-2xl rounded-full absolute -right-3 top-12 border border-cyan-700 cursor-pointer ${!openSidebar && "rotate-180"}`} />
				<div className="inline-flex ml-1 mt-1">
					<BsClipboardData className={`m-auto bg-amber-300 p-1 rounded cursor-pointer block float-left text-4xl w-8 duration-500 ${!openSidebar && "rotate-[360deg]"}`} />
					<h1 className={`text-white origin-left font-medium duration-300 text-2xl ml-2 ${!openSidebar && "scale-0"}`}> Manage</h1>
				</div>

				<ul>
            {Array.isArray(options) &&
            options?.map(item => {
                return (
                    <li>
                        {item.option}
                    </li>
                )
            })}
        </ul>
			</div>
		</>
	)

}

export { SideBar }