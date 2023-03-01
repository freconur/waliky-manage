import { useRef, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri";
import { Product } from "../../types";

interface Props {
    names: string,
    onChangeOptionValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    item: Product

}

const NameInput = ({ names, onChangeOptionValue, item }: Props) => {
    const [active, setActive] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const autoFocus = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10)
    }
    
    return (
        <div>
            <label className="text-gray-400 text-lg font-semibold capitalize">nombre:</label>
            <div className="flex">
                <input disabled={active} type="text" name="name" value={item.name} onChange={onChangeOptionValue} ref={inputRef} className="mr-2 border-2 rounded-md pl-1 w-full" placeholder={names} />
                <button onClick={() => { setActive(!active); autoFocus() }} className="rounded-md p-1 bg-yellow-300">
                    <RiEdit2Fill className="text-black" />
                </button>
            </div>
        </div>
    )

}

export { NameInput }