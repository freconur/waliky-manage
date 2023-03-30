

interface Props {
	byOrderHandler: React.ChangeEventHandler<HTMLSelectElement>
}

const PurchaseSelectByOrder = ({ byOrderHandler }: Props) => {
	return (
		<>
		<div className="flex justify-end">
			<select className="mb-3 py-1 px-3 capitalize text-sm font-semibold text-gray-400 rounded-lg shadow-md" onChange={byOrderHandler}>
				<option value="">ordenar por</option>
				<option value="price-asc">mayor precio</option>
				<option value="price-desc">menor precio</option>
				<option value="a-z">a-z</option>
				<option value="z-a">z-a</option>
				{/* <option value="date">fecha</option> */}
			</select>
		</div>
		</>
	)
}
export { PurchaseSelectByOrder }