import React, { useEffect, useReducer, useState } from "react"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer";
import { getAllProducts } from '../reducer/'
import { Product } from "../types";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { OptionFilterCategories } from "../components/OptionFilterCategories";
import { ProductModal } from "../modal/ProductModal";
import { Link } from "react-router-dom";


const Productos = () => {
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const { allProducts, copyAllProducts } = state;
  const [modalActive, setModalActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemInfo, setItemInfo] = useState<Product>({})
  const [search, setSearch] = useState('')

  const filterProducts = (): Product[] => {
    if (search.length === 0) {
      return allProducts.slice(currentPage, currentPage + 5)
    } else {
      const filtered = allProducts.filter(product => product.name?.toLowerCase().includes(search.toLowerCase()))
      return filtered.slice(currentPage, currentPage + 5)
    }

  }
  useEffect(() => {
    getAllProducts(dispatch)
  }, [])
  console.log('copyAllProducts',copyAllProducts)
  function ModalState (): void {
    setModalActive(!modalActive)
  }
  const onClickResetCurrentPage = () => {
    setCurrentPage(0)
  }
  const onChangeCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type:"filterCategory", payload:allProducts, payload2: e.target.value, payload3:copyAllProducts})
    setCurrentPage(0)
  }
  const nextPage = () => {
    if (allProducts.filter(product => product.name?.includes(search)).length > currentPage + 5) {
      setCurrentPage(currentPage + 5)
    }
  }
  const previewPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5)
    }
  }
  const onSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }
  return (

    <div className="max-cz:ml-5 ml-10 mt-5 w-auto">
      {modalActive && <ProductModal onChangeCategories={ModalState} itemInfo={itemInfo} />}
      <h1 className="capitalize text-3xl font-bold text-gray-600">tus productos</h1>
      <OptionFilterCategories onChangeCategories={onChangeCategories}/>
      {/* <OptionFilterCategories /> */}
      <div className="mt-2 mr-5">
        <p className="capitalize text-xl text-gray-500 mb-2">buscar</p>
        <input className="border-2 w-full p-2 rounded-lg" onClick={onClickResetCurrentPage} onChange={onSearchChange} value={search} type="text" />
      </div>

      <div className="overflow-auto rounded-lg shadow mt-2 mr-5">
        <table className="w-full  overflow-auto">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 capitalize text-gray-500 w-10  text-sm font-semibold tracking-wide text-left">id</th>
              <th className="p-3 capitalize text-gray-500 w-[1024px] text-sm font-semibold tracking-wide text-left">nombre</th>
              <th className="p-3 capitalize text-gray-500 w-10 text-sm font-semibold tracking-wide text-left">precio</th>
              <th className="p-3 capitalize text-gray-500 w-10 max-cz:hidden text-sm font-semibold tracking-wide text-left">marca</th>
              <th className="p-3 capitalize text-gray-500 text-sm font-semibold tracking-wide text-left">imagen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 ">
            {filterProducts().map((item, index) => {
              return (
                <tr onClick={() => {setModalActive(!modalActive); item && setItemInfo(item)}} key={item.id} className="duration-1000 relative cursor-pointer bg-blue-700">
                  {/* <Link to="/"> */}
                  <td className=" cursor-pointer duration-900  bg-white p-3 capitalize text-gray-400 text-md ">
                    <div className="duration-500 rounded-full font-bold hover:underline hover:bg-blue-200 text-center bg-blue-400 text-white h-[25px] w-[25px]">
                      <CopyToClipboard text={`${item.id}`}>
                        <span>
                          {index + 1}
                        </span>
                      </CopyToClipboard>
                    </div>
                  </td>
                  <td className="p-3 capitalize text-gray-400  w-10 bg-white text-md">{item.name}</td>
                  <td className="p-3 capitalize text-gray-400  bg-white text-md">S/{item.price}</td>
                  <td className="p-3 capitalize text-gray-400 max-cz:hidden bg-white text-md">{item.marca}</td>
                  <td className="p-3 capitalize text-gray-400  bg-white text-md">
                    <img className="w-[50px] h-[50px]" src={item.image} alt={item.name} />
                  </td>
                  {/* </Link> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <button onClick={previewPage} className="p-2 mr-5 rounded bg-orange-500 duration-300 hover:bg-orange-400 font-semibold drop-shadow-xl text-white cursor-pointer">anterior</button>
        <button onClick={nextPage} className="p-2 mr-5 rounded bg-orange-500 duration-300 hover:bg-orange-400 font-semibold drop-shadow-xl text-white cursor-pointer">siguiente</button>
      </div>
    </div>
  )


}

export { Productos }