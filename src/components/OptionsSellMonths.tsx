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

	// const onChangeValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	getSoldProductsPerMoth(dispatch, e.target.value)
	// }
	console.log('product', productVentas)
	return (
		<>
			<div className="mb-5">
				<label className="text-gray-500 capitalize font-semibold mr-5">filtrar por mes:</label>
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