import { useRef, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri";
import { isTemplateExpression } from "typescript";
import { Product } from "../../types";

interface Props {
	onChangeOptionValue: (e: React.ChangeEvent<HTMLInputElement>) => void
	stock: string,
    item: Product
}

const StockInput = ({ stock, onChangeOptionValue, item }: Props) => {
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
				<input disabled={active} onChange={onChangeOptionValue} value={item.stock} ref={inputRef} type="number" name="stock" className="mr-2 border-2 rounded-md pl-1 w-full" placeholder={stock} />
				<button onClick={() => { setActive(!active); autoFocus() }} className="rounded-md p-1 bg-yellow-300">
					<RiEdit2Fill className="text-black" />
				</button>
			</div>
		</div>
	)

}

export { StockInput }