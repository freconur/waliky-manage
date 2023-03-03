import { connectStorageEmulator } from "firebase/storage"
import React, { useEffect, useReducer, useState } from "react"
import { isNamedExports } from "typescript"
import { getBrands, getCategories, getSubcategories, NewProductValues, uploadFile, validationValues } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { FilesImage, Product } from "../types"


const AddProduct = () => {
	const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
	const { allCategories, allBrands, allSubcategories } = state
	const [subcategoryActive, setSubcategoryActive] = useState<boolean>(true)
	const [inputFilesActive, setInputFilesActive] = useState<boolean>(true)
	const [newProductValues, setNewProductValues] = useState<Product>({
		image: '',
		name: '',
		stock: 0,
		price: '',
		marca: '',
		category: '',
		subcategory: '',
	})
	useEffect(() => {
		getCategories(dispatch)
		getBrands(dispatch)
		getSubcategories(dispatch,`${newProductValues.category}`, allCategories)

	}, [newProductValues])
	const onChangenewProductValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let copiaNewProduct = {...newProductValues}
    const rtaValidationToInputFiles = validationValues(dispatch, newProductValues, allSubcategories)
    setNewProductValues({
			...newProductValues,
			[e.target.name]:  e.target.value
		})
		if (e.target.value.length > 0) setSubcategoryActive(false)
		if (e.target.value.length < 1) setSubcategoryActive(true)
		if(rtaValidationToInputFiles === false) setInputFilesActive(false)
		// if(!rtaValidationToInputFiles) setInputFilesActive(rtaValidationToInputFiles)
		console.log('newProductValues',newProductValues)
		console.log('copiaNewProduct',copiaNewProduct)
	}
	// const onChangeSelectNewProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	// getSubcategories(dispatch,e.target.value, allCategories)
	// }
	const fileHandler = async (files: FileList  | null) => {
		const url = await uploadFile(files, newProductValues)
			setNewProductValues({
				...newProductValues,
				image: url
			})
  };
	const onClickRegisterNewProduct = () => {
		NewProductValues(dispatch, newProductValues, allSubcategories)
	}
	return (
		<div className="mr-2">
			<h1 className="text-cyan-700 font-bold uppercase">Registrar nuevo producto</h1>
			<div className="ml-5">
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">nombre:</label>
					<input onChange={onChangenewProductValues} name="name" value={newProductValues.name} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">costo:</label>
					<input onChange={onChangenewProductValues} name="price" value={newProductValues.price} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="text-gray-400 font-medium capitalize text-lg">stock:</label>
					<input onChange={onChangenewProductValues} name="stock" value={newProductValues.stock} className="border-2 p-1 rounded-lg w-full" />
				</div>
				<div className="w-full">
					<label className="block text-gray-400 font-medium capitalize text-lg">categoria:</label>
					{/* <select name="category" onChange={(e) => {onChangenewProductValues(e); onChangeSelectNewProduct(e)}} className="block w-full border-2 rounded-lg p-1"> */}
					<select name="category" onChange={(e) => {onChangenewProductValues(e)}} className="block w-full border-2 rounded-lg p-1">
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
					<select disabled={subcategoryActive} name="subcategory" onChange={onChangenewProductValues} className="block w-full border-2 rounded-lg p-1">
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
					<select onChange={onChangenewProductValues} name="marca" className="block w-full border-2 rounded-lg p-1">
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
					<input disabled={inputFilesActive} onChange={(e) => fileHandler(e.currentTarget.files)} name="image"  type="file" className="border-2 rounded-lg w-full" />
				</div>
				<div className="flex justify-end mt-3">
					<button onClick={onClickRegisterNewProduct} className="border-2 text-lg bg-blue-600 p-2 font-semibold text-white rounded-lg drop-shadow-lg capitalize">registrar</button>
				</div>
			</div>
		</div>
	)
}

export { AddProduct }