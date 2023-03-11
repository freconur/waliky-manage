import { useEffect, useReducer } from "react"
import { getBrands } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"

interface Props {
    filterProductSoldByMarca: React.ChangeEventHandler<HTMLSelectElement>
}
const OptionProductSoldByMarca = ({filterProductSoldByMarca}: Props) => {

    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts )
    const { allBrands } = state
    useEffect(() => {
        getBrands(dispatch)
    },[])

    // console.log('allBrands', allBrands)
    return (
        <>
        <div className="mb-2 mt-5 flex justify-between w-full">
				<label className="text-gray-500 capitalize font-semibold mr-2">filtrar por marca:</label>
				<select onChange={filterProductSoldByMarca} className=" px-3 text-gray-400 capitalize font-semibold py-1 rounded-lg shadow-md" name="" id="">
					<option value="">marca</option>
					{
						allBrands.map((brand, index) => {
							return (
								<option key={index} value={brand.name}>{brand.name}</option>

							)
						})
					}
				</select>

			</div>
        </>
    )

}

export { OptionProductSoldByMarca }