import { useRef, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri";

interface Props {
	stock: string
}

const StockInput = ({ stock }: Props) => {
	const [active, setActive] = useState<boolean>(true)
	const inputRef = useRef<HTMLInputElement | null>(null)
	
	const autoFocus = () => {
		setTimeout(() => {
			if(inputRef.current){
				inputRef.current.focus();
			}
		},10)
	}

	return (
		<div>
			<label className="text-gray-400 text-lg font-semibold capitalize">stock:</label>
			<div className="flex">
				<input disabled={active} ref={inputRef} className="mr-2 border-2 rounded-md pl-1 w-full" placeholder={stock} />
				<button onClick={() => { setActive(!active); autoFocus() }} className="rounded-md p-1 bg-yellow-300">
					<RiEdit2Fill className="text-black" />
				</button>
			</div>
		</div>
	)

}

export { StockInput }