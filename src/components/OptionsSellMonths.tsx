import { useEffect, useReducer } from "react"
import { MonthsAvailable } from "../date/date"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"

interface PropsOptions {
	onChangeValueSelect: React.ChangeEventHandler<HTMLSelectElement>
}


const OptionsSellMonths = ({onChangeValueSelect}:PropsOptions) => {

	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)

	const { monthsAvailable, productVentas } = state
	useEffect(() => {
		let months:string[] = MonthsAvailable()
		dispatch({ type: "monthsAvailable", payload: months })
	}, [productVentas])

	return (
		<>
			<div className="mb-2 mt-5 flex justify-between">
				<label className="text-gray-500 capitalize font-semibold mr-2">filtrar por mes:</label>
				<select onChange={onChangeValueSelect} className="px-3 text-gray-400 capitalize font-semibold py-1 rounded-lg shadow-md w-32" name="" id="">
					<option value="">mes</option>
					{
						monthsAvailable.map((month, index) => {
							return (
								<option key={index} value={month}>{month}</option>

							)
						})
					}
				</select>

			</div>
		</>
	)
}

export { OptionsSellMonths }