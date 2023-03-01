import { useRef, useState } from "react"
import { Categories } from "../../types"
import { RiEdit2Fill } from "react-icons/ri";



interface Props {
	category: string
	allCategories: Categories[]
	onChangeOptionValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const CategorySelect = ({ category, allCategories, onChangeOptionValue }: Props) => {
	const inputRef = useRef <HTMLInputElement | null >(null)

	const [active, setActive] = useState<boolean>(true)
	const autoFocus = () => {
		setTimeout(() => {
			if(inputRef.current){
				inputRef.current.focus();
			}
		},10)
	}
	return (
		<div className="flex w-full mt-3">
			<div className="flex justify-between w-full">
				<label className="text-gray-400 text-lg font-semibold capitalize mr-2">categoria:</label>
				<select className="border-2 p-1 rounded-md w-full mr-2 text-gray-400" name="category" onChange={onChangeOptionValue} disabled={active} >
					<option  value={category} >{category}</option>
					{allCategories?.map((category, index) => {
						return (
							<option key={index} value={category.name}>{category.name}</option>
						)
					})}
				</select>
			</div>
			<div>
				<button onClick={() => { setActive(!active); autoFocus() }} className="rounded-md p-1 bg-yellow-300">
					<RiEdit2Fill className="text-black" />
				</button>
			</div>
		</div>
	)
}

export { CategorySelect }