import { useRef, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { Brands } from "../../types";

interface Props{
    allBrands: Brands[],
    onChangeOptionValue: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    marca:string
}

const MarcaInput = ({allBrands, onChangeOptionValue, marca}:Props) => {

	const [active, setActive] = useState<boolean>(true)
	const inputRef = useRef <HTMLInputElement | null >(null)

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
				<label className="text-gray-400 text-lg font-semibold capitalize mr-2">Marca:</label>
				<select className="border-2 p-1 rounded-md w-full mr-2 text-gray-400" name="marca" onChange={onChangeOptionValue} disabled={active} >
					<option  value={marca} >{marca}</option>
					{allBrands?.map((category, index) => {
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

export { MarcaInput }