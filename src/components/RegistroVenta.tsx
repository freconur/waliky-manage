import React, { useEffect, useReducer, useState } from "react"
import { getProductById, updateStockProduct } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"
import { SearchById } from '../types'

interface StateRegistroVentas {
    id: SearchById
}

const RegistroVenta = () => {
    const [inputIdValue, setInputIdValue] = useState<StateRegistroVentas['id']>({
        id: ''
    })
    const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
    const { product, pathProduct } = state

    useEffect(() => {

    }, [product,pathProduct])
    console.log('pathProduct',pathProduct)
    const onChangeIdFormVentas = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIdValue({
            ...inputIdValue,
            [e.target.name]: e.target.value
        })

        console.log('inputIdValue', inputIdValue)
    }
    const onSubmitCheckId = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        getProductById(dispatch, inputIdValue)
    }

    // const onSubmitFormVentas = (e: React.FormEvent<HTMLFormElement>) => {
        const onSubmitFormVentas = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        updateStockProduct(dispatch, pathProduct,inputIdValue, 2)
    }

    console.log('product///',product.state)
    return (

        <>
            <h1>Holis</h1>
            {/* <form className="form-ventas" onSubmit={onSubmitFormVentas}> */}
            <form className="form-ventas">
                <div>
                    <input onChange={onChangeIdFormVentas} type="text" placeholder="id" name="id" />
                    <button onClick={onSubmitCheckId}>✅</button>
                </div>
                <input type="text" value={product.name} placeholder="nombre" name="name" />
                <input type="text" value={product.price} placeholder="precio" name="price" />
                <input type="number" value={product.stock} placeholder="stock" name="stock" />
                <input type="number" placeholder="cantidad" name="cantidad" />
                {product.stock
                && <input type="text" value="activo" placeholder="estado" name="state" />}
                {/* <input type="boolean" value={product.state} placeholder="estado" name="state" /> */}
                <button onClick={onSubmitFormVentas}>registrar</button>
            </form>
        </>
    )
}

export { RegistroVenta }