import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
  import { Line } from 'react-chartjs-2';
  // import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
    // CategoryScale,
    // LinearScale,
    // BarElement,
    // Title,
    // Tooltip,
    // Legend
  );
  
const Statistics = () => {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const ventas = ['123', '234', '345', '456', '567', '678', '789'];
    const data={
        labels: labels,
        datasets: [{
          label: 'Expenses by Month',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
    }
    return(
        <>
        <h1>holi</h1>
        <Line data={data} />
        </>
    )
}

export { Statistics }