import { useEffect, useReducer, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { dataforGraphics, getProductsSold } from '../reducer';
import { initialStateProducts, searchIdReducer } from '../reducer/searchId.reducer';
import { RiLoader4Line } from "react-icons/ri";
import { Graphics } from '../types';
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
  const { currentDate, totalSales, currentYear, monthAvailableGraphics, dataForCard, totalSalesPerYear } = state
  const [loader, setLoader] = useState<boolean>(true)
  const [dataForGraphics, setDataForGraphics] = useState<LineProps["data"]>()
  useEffect(() => {
    getProductsSold(dispatch)
    dataforGraphics(dispatch)
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
    <div className='ml-5 my-5 mr-2'>
      <div className='flex justify-end my-4'><p className='text-gray-400 text-lg font-medium capitalize'>{currentDate}</p></div>
      <h1 className='text-2xl text-cyan-700 font-semibold capitalize'>estadisticas</h1>
      {currentDate && totalSales && currentYear && monthAvailableGraphics && dataForCard && totalSalesPerYear
        ?
        <div>
          <div className='flex justify-end'>
            <div className='bg-yellow-300 drop-shadow-lg rounded-lg border-4 border-yellow-400 p-1'>
              <div className='m-auto flex justify-center'>
                <span className='block capitalize text-md font-semibold text-white'><span className='capitalize text-md font-semibold text-white mr-1'>año</span>{currentYear}</span>
              </div>
              <span className='block text-green-500 font-semibold'><span className='capitalize text-md font-semibold text-white mr-1'>total:</span>S/{totalSalesPerYear}</span>
            </div>
          </div>
          <h2 className='text-xl text-cyan-600 font-semibold capitalize mt-5'>venta y ratio de crecimiento</h2>
          <ul className='flex flex-wrap mt-5'>
            {
              dataForCard
              &&
              dataForCard.map((data, index) => {
                return (
                  <li key={index} className="p-2 m-2 border-4 border-blue-200 rounded-md drop-shadow-lg bg-blue-100 w-40">
                    <p className='uppercase font-semibold text-blue-400'>{data.nameMonth}</p>
                    <p className='text-gray-500 capitalize'>venta: <span className={`ml-1 text-green-500 ${data.sales < 0 && "text-red-600"} `}>S/ {data.sales}</span> </p>
                    {
                      data.salesGrowth
                        ?
                        <p className='text-gray-500 capitalize'>%: <span className={`ml-1 text-green-500 ${data.salesGrowth < 0 && "text-red-600"} `}>{data.salesGrowth?.toFixed(2)}%</span>  </p>
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
      </div>
      <Line data={ventas} />
    </div>
  )
}

export { Statistics }