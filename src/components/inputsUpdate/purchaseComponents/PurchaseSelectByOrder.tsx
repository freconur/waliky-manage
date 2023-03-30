

interface Props {
	byOrderHandler: React.ChangeEventHandler<HTMLSelectElement>
}

const PurchaseSelectByOrder = ({ byOrderHandler }: Props) => {
	return (
		<>
			<select onChange={byOrderHandler}>
				<option value="">selecciona</option>
				<option value="price">precio</option>
				<option value="date">fecha</option>
			</select>
		</>
	)
}
export { PurchaseSelectByOrder }