import { useEffect, useReducer, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { dataforGraphics, getProductsSold } from '../reducer';
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
  const { currentDate, totalSales, currentYear, monthAvailableGraphics, dataForCard, totalSalesPerYear, dataPerYear, utilidad2022 } = state
  const [loader, setLoader] = useState<boolean>(true)
  const [dataForGraphics, setDataForGraphics] = useState<LineProps["data"]>()


  useEffect(() => {
    getProductsSold(dispatch)
    dataforGraphics(dispatch)
    Data2022(dispatch)
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
  console.log('utilidad2022', utilidad2022)
  console.log('totalSalesPerYear', totalSalesPerYear)
  return (
    <div className='ml-5 my-5 mr-2'>
      <div className='flex justify-end my-4'><p className='text-gray-400 text-lg font-medium capitalize'>{currentDate}</p></div>
      <h1 className='text-2xl text-cyan-700 font-semibold capitalize'>estadisticas</h1>

      {currentDate && totalSales && currentYear && monthAvailableGraphics && dataForCard && totalSalesPerYear
        ?
        <div>
          <div className='flex justify-end'>
            <div className='bg-blue-400 border-4 border-blue-500 drop-shadow-lg rounded-lg p-1'>
              <p className="text-lg text-white  capitalize font-semibold">ingreso total:</p>
              <div className='flex justify-center'> 
                <p className='text-white font-semibold mx-auto'>
                  S/ {totalSalesPerYear && utilidad2022
                    &&
                    totalSalesPerYear + utilidad2022
                  }
                </p>

              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl text-cyan-600 font-semibold capitalize my-5'>resultados por año</h2>
            <div className='flex justify-end'>
              {dataPerYear && dataPerYear.map((data, index) => {
                return (
                  <div key={index} className='bg-yellow-300 drop-shadow-lg rounded-lg border-4 border-yellow-400 p-1 mr-1'>
                    <div className='m-auto flex justify-center'>
                      <span className='block capitalize text-md font-semibold text-white'><span className='capitalize text-md font-semibold text-white mr-1'>año</span>{data.name}</span>
                    </div>
                    <span className='block text-green-500 font-semibold'><span className='capitalize text-md font-semibold text-white mr-1'>total:</span>S/{data.utilidad}</span>
                  </div>
                )
              })
              }

              <div className='bg-yellow-300 drop-shadow-lg rounded-lg border-4 border-yellow-400 p-1 mr-1'>
                <div className='m-auto flex justify-center'>
                  <span className='block capitalize text-md font-semibold text-white'><span className='capitalize text-md font-semibold text-white mr-1'>año</span>{currentYear}</span>
                </div>
                <span className='block text-green-500 font-semibold'><span className='capitalize text-md font-semibold text-white mr-1'>total:</span>S/{totalSalesPerYear}</span>
              </div>
            </div>

          </div>
          <h2 className='text-xl text-cyan-600 font-semibold capitalize mt-5'>venta y ratio de crecimiento</h2>
          <ul className='flex flex-wrap mt-5'>
            {
              dataForCard
              &&
              dataForCard.map((data, index) => {
                return (
                  <li key={index} className="p-2 m-2 border-4 border-blue-200 rounded-md drop-shadow-lg bg-blue-100 w-34">
                    <p className='uppercase font-semibold text-blue-400'>{data.nameMonth}</p>
                    <p className='text-gray-500 capitalize'>venta: <span className={`ml-1 text-green-500 ${data.sales < 0 && "text-red-600"} `}>S/ {data.sales}</span> </p>
                    {
                      data.salesGrowth
                        ?
                        <div className='text-gray-500 capitalize flex'>
                          %: <div className={`ml-1 text-green-500 ${data.salesGrowth < 0 && "text-red-600"} `}>
                            <div className='flex'>
                              {data.salesGrowth < 0
                                ? <RiArrowDownFill className='animate-bounce' />
                                : <RiArrowUpFill className='animate-bounce' />
                              }
                              {data.salesGrowth?.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        :
                        null
                    }
                  </li>
                )
              })
            }
          </ul>
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
    </div>
  )
}

export { Statistics }