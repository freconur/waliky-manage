
interface PropsOptionsSort {
    onChangeOptionsSort: React.ChangeEventHandler<HTMLSelectElement>
}
const OptionsSort = ({onChangeOptionsSort}: PropsOptionsSort) => {

   

    return (
        <>
            <div className="mb-2 mt-5 flex justify-between">
                <label className="text-gray-500 capitalize font-semibold mr-2">ordenar por</label>
                <select onChange={onChangeOptionsSort} className="px-3 text-gray-400 capitalize font-semibold py-1 rounded-lg shadow-md w-32">
                    <option value="">seleccionar</option>
                    <option value="price-ascendente">menor precio</option>
                    <option value="price-descendente">mayor precio </option>
                    <option value="mas-vendido">mas vendidos</option>
                    <option value="menos-vendido">menos vendidos</option>
                    <option value="mas-reciente">mas reciente</option>
                    <option value="menos-reciente">menos reciente</option>
                </select>
            </div>

        </>
    )
}

export { OptionsSort }