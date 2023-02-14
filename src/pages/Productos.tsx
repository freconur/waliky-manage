import { useEffect, useReducer, useState } from "react"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";
import { getAllProducts } from '../reducer/'
import { Product } from "../types";


const Productos = () => {
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allProducts } = state;
	const [currentPage, setCurrentPage] = useState(0)
	const [search, setSearch] = useState('')

	const filterProducts = (): Product[] => {
		if(search.length === 0) {
			return allProducts.slice(currentPage, currentPage + 5)
		}

		const filtered = allProducts.filter(product => product.name?.includes(search))
		return filtered.slice(currentPage, currentPage + 5)
	}


	useEffect(() => {
		getAllProducts(dispatch)
	}, [])

	const nextPage = () => {
		if(allProducts.filter(product => product.name?.includes(search)).length > currentPage + 5) {
			setCurrentPage(currentPage + 5)
		}
	}
	const previewPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 5)
		}
	}
	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setSearch(e.target.value)
	}
	return (
		<div>
			<div>
				<input className="border-2" onChange={onSearchChange} value={search} type="text" />
			</div>
			<div className="m-5">
				<button onClick={previewPage} className="mr-5 rounded bg-black text-white cursor-pointer">anterior</button>
				<button onClick={nextPage} className="mr-5 rounded bg-black text-white cursor-pointer">siguiente</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>n</th>
						<th>id</th>
						<th>nombre</th>
						<th>imagen</th>
					</tr>
				</thead>
				<tbody>
					{filterProducts().map(({ id, name, image }, index) => {
						return (
							<tr key={id}>
								<td>{index + 1}</td>
								<td>{id}</td>
								<td>{name}</td>
								<td>
									{/* <div className="w-30 h-30"> */}
									<img className="w-10 h-10" src={image} alt={name} />
									{/* </div> */}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)


}

export { Productos }