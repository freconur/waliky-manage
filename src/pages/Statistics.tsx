import { useEffect, useReducer, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { dataforGraphics, getProductsSold, totalSalesPerMarca } from '../reducer';
import { initialStateProducts, searchIdReducer } from '../reducer/searchId.reducer';
import { RiArrowDownFill, RiLoader4Line, RiArrowUpFill } from "react-icons/ri";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Data2022 } from '../reducer/statistics';
import { DataPerYear } from '../types';
import { SalesPerMarca } from './SalesPerMarca';
import { table } from 'console';

ChartJS.register(
  // CategoryScale,
  // LinearScale,
  // BarElement,
  // Title,
  // Tooltip,
  // Legend

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineProps {
  data: ChartData<'bar'>;
}
const Statistics = () => {
  const [state, dispatch] = useReducer(searchIdReducer, initialStateProducts)
  const { currentDate, totalSales, currentYear, monthAvailableGraphics, dataForCard, totalSalesPerYear, dataPerYear, utilidad2022, salesPerMarca } = state
  const [loader, setLoader] = useState<boolean>(true)
  const [dataForGraphics, setDataForGraphics] = useState<LineProps["data"]>()


  useEffect(() => {
    getProductsSold(dispatch)
    dataforGraphics(dispatch)
    Data2022(dispatch)
    totalSalesPerMarca(dispatch)
    // setTimeout(() => { setLoader(!loader) }, 1000)
  }, [])
  const ventas = {
    labels: monthAvailableGraphics,
    datasets: [{
      label: 'Venta del Mes',
      data: totalSales,
      backgroundColor: [
        'rgb(153, 102, 255)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 3,
      tension: 0.5,
      pointRadius: 6
    }]
  }
  return (
    // <div className='ml-5 my-5 mr-2 w-3/5 max-xm:w-min'>
    <div className='w-[99%]'>
      <div className='flex justify-end my-4'><p className='text-gray-400 text-lg font-medium capitalize'>{currentDate}</p></div>
      <h1 className='text-2xl text-cyan-700 font-semibold capitalize'>estadisticas</h1>

      {currentDate && totalSales && currentYear && monthAvailableGraphics && dataForCard && totalSalesPerYear
        ?
        <div>
          <div className='grid grid-cols-2 gap-2 mt-2'>
            <div className='w-full flex justify-end'>
              <div className=' bg-gradient-to-l from-blue-400 to-blue-600 w-full gap-10 items-center px-3 shadow-lg rounded-lg p-1'>
                <p className="text-lg text-white  capitalize font-semibold">I. total:</p>
                <div className=''>
                  <p className='text-white font-semibold'>
                    S/ {totalSalesPerYear && utilidad2022
                      &&
                      totalSalesPerYear + utilidad2022
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-end'>
              {dataPerYear && dataPerYear.map((data, index) => {
                return (
                  <div key={index} className='bg-gradient-to-l from-indigo-400 to-indigo-600 w-full rounded-lg shadow-lg p-1 text-white font-semibold text-base'>
                    <div className='ml-1 text-lg'>
                      Año {data.name}
                    </div>
                    <span className='ml-1'>S/{data.utilidad}</span>
                  </div>
                )
              })
              }
            </div>
            <div className='bg-gradient-to-l from-yellow-200 to-yellow-400 w-full rounded-lg shadow-lg p-1 text-white font-semibold text-base'>
              <div className='ml-1 text-lg'>
                <span className='block capitalize text-md font-semibold text-white'>
                  Año {currentYear}</span>
              </div>
              <span className='block ml-1 text-green-500 font-semibold'>S/{totalSalesPerYear}</span>
            </div>
          </div>

          <h2 className='text-xl text-cyan-600 font-semibold capitalize mt-5'>venta y ratio de crecimiento</h2>

          <div className='overflow-hidden rounded-lg mt-5 shadow-lg'>
            <table>
              <thead className="bg-cyan-500 border-b-2 border-gray-200">
                <tr className="text-center">
                  <th className="p-2 capitalize text-white w-10  text-lg font-semibold tracking-wide ">Mes</th>
                  <th className="p-2 capitalize text-white w-24  text-lg font-semibold tracking-wide ">venta</th>
                  <th className="p-2 capitalize text-white w-[768px]  text-lg font-semibold tracking-wide ">ratio %</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {
                  dataForCard.map((data, index) => {
                    return (
                      <tr key={index} className='w-auto text-center capitalize text-gray-400'>
                        <td className='w-[33%] font-semibold h-10'>{data.nameMonth}</td>
                        <td className='w-[33%] text-green-500'>S/ {data.sales.toFixed(2)}</td>
                        {
                          data.salesGrowth
                            ?
                            <td className={`w-[33%] text-green-500 text-center grid justify-center m-auto items-center ${data.salesGrowth < 0 && "text-red-600"} `}>
                              {/* <div className='flex items-center w-[100px] justify-center'> */}
                              <div className='flex w-full'>
                                <div className='grid place-items-center'>
                                  {data.salesGrowth < 0
                                    ? <RiArrowDownFill className='animate-bounce' />
                                    : <RiArrowUpFill className='animate-bounce' />
                                  }
                                </div>
                                <div>
                                  {data.salesGrowth?.toFixed(2)}
                                </div>
                              </div>
                              {/* </div> */}
                            </td>
                            :
                            null
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
        :
        <div className="w-full flex justify-center mt-5">
          <div className="items-center">
            <RiLoader4Line className="animate-spin text-3xl text-blue-500 m-auto " />
            <p className="text-gray-400">cargando...</p>
          </div>
        </div>
      }

      <div className='w-full '>
        <h2 className='w-full text-xl text-cyan-600 font-semibold capitalize mt-5'>grafico lineal de ventas</h2>
        <Line data={ventas} />
      </div>
      <SalesPerMarca salesPerMarca={salesPerMarca} />
    </div>
  )
}

export { Statistics }