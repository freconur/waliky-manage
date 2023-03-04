import React, { useEffect, useReducer, useRef, useState } from "react"
import { initialNewProductValues } from "../components/helpers"
import { getBrands, getCategories, getSubcategories, NewProductValues, uploadFile, validationValues } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"


const AddProduct = () => {
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allCategories, allBrands, allSubcategories } = state
	const [subcategoryActive, setSubcategoryActive] = useState<boolean>(true)
	const [inputFilesActive, setInputFilesActive] = useState<boolean>(true)
	const [newProductValues, setNewProductValues] = useState<Product>(initialNewProductValues)
	const ref = useRef<HTMLInputElement  | null>(null)
	const refSelect = useRef<HTMLSelectElement | null>(null)
	
	useEffect(() => {
		getCategories(dispatch)
		getBrands(dispatch)
		getSubcategories(dispatch, `${newProductValues.category}`, allCategories)
		const rtaValidationToInputFiles = validationValues(dispatch, newProductValues, allSubcategories)
		if (rtaValidationToInputFiles === false) setInputFilesActive(false)
	}, [newProductValues])
	const onChangenewProductValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setNewProductValues({
			...newProductValues,
			[e.target.name]: e.target.value
		})
		if (e.target.value.length > 0) setSubcategoryActive(false)
		if (e.target.value.length < 1) setSubcategoryActive(true)

	}
	const fileHandler = async (files: FileList | null) => {
		const url = await uploadFile(files, newProductValues)
		setNewProductValues({
			...newProductValues,
			image: url
		})
		validationValues(dispatch, newProductValues, allSubcategories)
	};
	const onClickRegisterNewProduct = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		NewProductValues(newProductValues, allCategories)
		setNewProductValues(initialNewProductValues)
		if(ref.current) ref.current.value = ""
		if(refSelect.current) refSelect.current.value = ""
		setSubcategoryActive(true)
	}
	// console.log("allCategories",allCategories)
	// console.log("allSubcategories",allSubcategories)
	console.log('newProductValues',newProductValues)
	return (
		<form onSubmit={onClickRegisterNewProduct} className="mr-2">
			<h1 className="text-cyan-700 font-bold uppercase">Registrar nuevo producto</h1>
			<div className="ml-5">
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">nombre:</label>
					<input onChange={onChangenewProductValues} name="name" value={newProductValues.name} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">costo:</label>
					<input onChange={onChangenewProductValues} type="number" name="price" value={newProductValues.price} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">stock:</label>
					<input onChange={onChangenewProductValues} type="number" name="stock" value={newProductValues.stock} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="block text-gray-400 font-medium capitalize text-lg">categoria:</label>
					{/* <select name="category" onChange={(e) => {onChangenewProductValues(e); onChangeSelectNewProduct(e)}} className="block w-full border-2 rounded-lg p-1"> */}
					<select value={newProductValues.category} name="category" onChange={(e) => { onChangenewProductValues(e) }} className="block w-full border-2 rounded-lg p-1">
						<option value="">seleccionar</option>
						{allCategories.map((category, index) => {
							return (
								<option key={index} value={category.name}>{category.name}</option>
							)
						})}
					</select>
				</div>
				<div className="w-full">
					<label className="block text-gray-400 font-medium capitalize text-lg">subcategoria:</label>
					<select value={newProductValues.subcategory} disabled={subcategoryActive} name="subcategory"  onChange={onChangenewProductValues} className="block w-full border-2 rounded-lg p-1">
						<option value="">seleccionar</option>
						{allSubcategories?.map((subcategory, index) => {
							return (
								<option key={index} value={subcategory.name}>{subcategory.name}</option>
							)
						})}
					</select>
				</div>
				<div className="w-full">
					<label className="block text-gray-400 font-medium capitalize text-lg">marca:</label>
					<select ref={refSelect} onChange={onChangenewProductValues} name="marca"  className="block w-full border-2 rounded-lg p-1">
						<option value="">seleccionar</option>
						{allBrands.map((brand, index) => {
							return (
								<option key={index} value={brand.name}>{brand.name}</option>
							)
						})}
					</select>
				</div>
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">agregar imagen:</label>
					<input ref={ref} disabled={inputFilesActive} onChange={(e) => fileHandler(e.currentTarget.files)} name="image" type="file" className="border-2 rounded-lg w-full" />
				</div>
				<div className="flex justify-end mt-3">
					<button type="submit" className="border-2 text-lg bg-blue-600 p-2 font-semibold text-white rounded-lg drop-shadow-lg capitalize">registrar</button>
				</div>
			</div>
		</form>
	)
}

export { AddProduct }