import { useEffect, useReducer } from "react"
import { getCategories } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"

interface PropsCategories {
  onChangeCategories: React.ChangeEventHandler<HTMLSelectElement>
}

const OptionFilterCategories = ({onChangeCategories}: PropsCategories) => {

  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
		const { allCategories } = state
		useEffect(() => {
			 getCategories(dispatch)
		},[])
    return(
        <>
        <div className="mb-2 mt-5 mr-5 flex justify-between">
				<label className="text-gray-500 capitalize font-semibold mr-2">filtrar por:</label>
				{/* <select onChange={onChangeValueSelect} className="px-3 text-gray-400 capitalize font-semibold py-1 rounded-lg shadow-md w-32" name="" id=""> */}
				<select onChange={onChangeCategories} className="px-3 text-gray-400 capitalize font-semibold py-1 rounded-lg shadow-md w-32" name="" id="">
					<option value="all">seleccionar</option>
					{
						allCategories?.map(({name, id}, index) => {
							return (
								<option key={index} value={name}>{name}</option>
										
							)
						})
					}
				</select>

			</div>
        </>
    )
}

export { OptionFilterCategories }