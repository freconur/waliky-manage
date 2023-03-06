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
  const { productsSold, totalSales, monthAvailableGraphics, dataForCard } = state
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
      borderWidth: 1
    }]
  }
  console.log('dataForCard', dataForCard)

  return (
    <div className='ml-5 my-5 mr-2'>
      <h1 className='text-2xl text-cyan-700 font-semibold capitalize'>estadisticas</h1>
      <h2 className='text-xl text-cyan-600 font-semibold capitalize mt-5'>venta y ratio de crecimiento</h2>
      <ul className='flex flex-wrap mt-5'>
        {
        dataForCard 
        &&
        dataForCard.map((data, index) => {
          return(
            <li key={index} className="p-2 m-2 border-4 border-blue-200 rounded-md drop-shadow-lg bg-blue-100 w-40">
              <p className='uppercase font-semibold text-blue-400'>{data.nameMonth}</p>
              <p className='text-gray-500 capitalize'>venta: <span className={`ml-1 text-green-500 ${data.sales < 0 && "text-red-600"} `}>S/ {data.sales}</span> </p>
              {
              data.salesGrowth
              ?
              <p className='text-gray-500 capitalize'>growth: <span className={`ml-1 text-green-500 ${data.salesGrowth < 0 && "text-red-600"} `}>{data.salesGrowth?.toFixed(2)}%</span>  </p>
              :
              null
              }
            </li>
          )
        })
        }
      </ul>
      <div className='w-full '>
        
      <h2 className='w-full text-xl text-cyan-600 font-semibold capitalize mt-5'>grafico lineal de ventas</h2>

      </div>
        <Line data={ventas} />

    </div>
  )
}

export { Statistics }