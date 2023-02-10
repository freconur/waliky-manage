import { useEffect, useReducer } from "react"
import { getProductsSold } from "../reducer"
import { initialStateProducts, searchIdReducer } from "../reducer/searchId.reducer"


const TablaVentas = () => {

  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const { productsSold } = state
  useEffect(() => {
    getProductsSold(dispatch)
  }, [])
  return (

    <>
      <div className="m-7 ">
        <h1 className="text-cyan-800 uppercase font-bold text-3xl">registro de ventas</h1>
        <table className="mt-10 border rounded">
          <thead className="bg-indigo-700 text-white capitalize">
            <tr className="text-center">
              <th className="w-8">n</th>
              <th className="w-64">id registro</th>
              <th className="w-48">id producto</th>
              <th className="w-80">descripcion de producto</th>
              <th className="w-48">fecha</th>
              <th className="w-auto p-2">cantidad</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {Array.isArray(productsSold)
              &&
              productsSold.map((item, index) => {
                return (
                  <tr  key={index} className="w-auto text-center">
                    <td>{index + 1}</td>
                    {/* <td>{item.id?.substring(1, 10)}...</td> */}
                    <td>{item.id}</td>
                    <td>{item.idProduct}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.cantidad}</td>
                  </tr>

                )
              })}

          </tbody>
        </table>
      </div>
    </>
  )

}

export { TablaVentas }