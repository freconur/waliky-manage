import React, { useEffect, useReducer, useRef, useState } from "react"
import { initialNewProductValues } from "../components/helpers"
import { getBrands, getCategories, getSubcategories, NewProductValues, uploadFile, validationValues } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { Product } from "../types"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoader4Line } from "react-icons/ri";
const AddProduct = () => {
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const { allCategories, allBrands, allSubcategories, warningFile, addProductWarning } = state
  const [subcategoryActive, setSubcategoryActive] = useState<boolean>(true)
  const [inputFilesActive, setInputFilesActive] = useState<boolean>(true)
  const [loaderImage, setLoaderImage] = useState<boolean>(false)
  const [loaderProduct, setLoaderProduct] = useState<boolean>(false)
  const [newProductValues, setNewProductValues] = useState<Product>(initialNewProductValues)
  const ref = useRef<HTMLInputElement | null>(null)
  const refSelect = useRef<HTMLSelectElement | null>(null)

  useEffect(() => {
    getCategories(dispatch)
    getBrands(dispatch)
    getSubcategories(dispatch, `${newProductValues.category}`, allCategories)
    const rtaValidationToInputFiles = validationValues(dispatch, newProductValues, allSubcategories)
    if (rtaValidationToInputFiles === false) setInputFilesActive(false)
    if (addProductWarning.length > 0) {
      toast.success(addProductWarning, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoaderProduct(false)
    }
  }, [newProductValues, warningFile])

  const onChangenewProductValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewProductValues({
      ...newProductValues,
      [e.target.name]: e.target.value
    })
    if (e.target.value.length > 0) setSubcategoryActive(false)
    if (e.target.value.length < 1) setSubcategoryActive(true)

  }
  const fileHandler = async (files: FileList | null) => {
    setLoaderImage(true)
    const url = await uploadFile(dispatch, files, newProductValues)
    setNewProductValues({
      ...newProductValues,
      image: url
    })
    if (url) {
      toast.success('Se cargo la imagen del producto!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoaderImage(false)
    }
    // else {
    // 	validationValues(dispatch, newProductValues, allSubcategories)
    // }
  };
  const onClickRegisterNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoaderProduct(true)
    NewProductValues(dispatch, newProductValues, allCategories)
    if (ref.current) ref.current.value = ""
    if (refSelect.current) refSelect.current.value = ""
    setSubcategoryActive(true)
    setNewProductValues(initialNewProductValues)
  }
  return (
    <form onSubmit={onClickRegisterNewProduct} className="m-2 ">
      <div className="border-4 rounded-lg border-blue-100 bg-blue-50 p-2 pb-4">

        {warningFile && <ToastContainer />}
        {addProductWarning && <ToastContainer />}
        <h1 className="text-cyan-700 font-bold uppercase ml-5 text-xl mt-3">Registrar nuevo producto</h1>
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
            <select value={newProductValues.subcategory} disabled={subcategoryActive} name="subcategory" onChange={onChangenewProductValues} className="block w-full border-2 rounded-lg p-1">
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
            <select ref={refSelect} onChange={onChangenewProductValues} name="marca" className="block w-full border-2 rounded-lg p-1">
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
            {warningFile && warningFile}
          </div>
          {/* loader */}
          {loaderImage
            &&
            <div className="w-full flex justify-center mt-5">
              <div className="items-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 m-auto " />
                <p className="text-gray-400">subiendo imagen...</p>
              </div>
            </div>}

          {loaderProduct
            ?
            <div className="w-full flex justify-center mt-5">
              <div className="items-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 m-auto " />
                <p className="text-gray-400">subiendo imagen...</p>
              </div>
            </div>
            : loaderProduct && addProductWarning && null
          }

          <div className="flex justify-end mt-3">
            <button type="submit" className="border-2 text-lg bg-blue-600 p-2 font-semibold text-white rounded-lg drop-shadow-lg capitalize">registrar</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export { AddProduct }