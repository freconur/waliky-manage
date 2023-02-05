import {
	getFirestore,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot
} from "firebase/firestore"
import React, { useEffect, useReducer, useState } from "react"
import { app } from "../firebase/firebase.config"
import { getCartucherasBts } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product, SearchById } from "../types"

interface FormStates {
	form: SearchById
	product: Product
}

const SearchIdProduct = () => {
	const [inputValues, setInputValues] = useState<FormStates['form']>({
		id: ''
	})
	const [findItem, setFindItem] = useState<FormStates['product']>()
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { product } = state
	console.log('product', product)

	useEffect(() => {
		getCartucherasBts(dispatch)
	}, [])
	const db = getFirestore(app);

	const handleChangeForm = (e:React.ChangeEvent<HTMLInputElement>) => {
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value
		})
	}
	console.log('inputValues',inputValues)
	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const product = doc(db, "bts/Xq9UGyUn6d4OukEb1jPk/cartucheras", inputValues.id);
		const findProduct = await getDoc(product);
		if (findProduct.exists()) {
			setFindItem(findProduct.data());
		}
		console.log('findItem',findItem)
	}
	return (
		<>

			<form onSubmit={handleSubmit}>
				<input onChange={handleChangeForm} type="text" name="id" placeholder="id de producto" />
				<button>Buscar</button>
			</form>
			<ul>
				{
					product.map((item, index) => {
						return (
							<li key={index}>
								<p>{item.name}</p>
								<p>{item.marca}</p>
								<p>{item.price}</p>
								<p>{item.id}</p>
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export { SearchIdProduct }