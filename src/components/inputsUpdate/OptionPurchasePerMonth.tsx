import { useEffect, useReducer, useState } from "react"
import { getPurchasePerMonth } from "../../reducer/compras"
import { initialStateProducts, searchIdReducer } from "../../reducer/searchId.reducer"
import { PurchaseProduct } from "../../types"
import { MonthsAvailable } from "../../date/date"

interface StateProps {
	onChangeValueSelect: React.ChangeEventHandler<HTMLSelectElement>
}
const OptionPurchasePerMonth = ({ onChangeValueSelect }: StateProps) => {
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { monthsAvailable } = state
	const [monthPurchase, setMonthPurchase] = useState<string>('')
	useEffect(() => {
		let months: string[] = MonthsAvailable()
		dispatch({ type: "monthsAvailable", payload: months })
	}, [])
	return (
		<>
			<select onChange={onChangeValueSelect}>
				<option value="">Mes</option>
				{
					monthsAvailable.map((month, index) => {
						return (
							<option key={index} value={month}>{month}</option>
						)
					})
				}
			</select>
		</>
	)
}

export {OptionPurchasePerMonth}