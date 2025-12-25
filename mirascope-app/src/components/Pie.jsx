import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,Tooltip,Legend,ArcElement } from 'chart.js';

ChartJS.register(Tooltip,Legend,ArcElement)

export const PieChart =({data}) =>{
  const options ={
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position :"bottom",
        display: true
      },
      title: {
        display :true,
        text : " This is the data representing polarity scores."
      }
    },
    animation: {
      duration: 2500,
      easing: "easeOutExpo"
    }
  };
  const pieChartData = {
    labels : Object.keys(data),
    datasets : [
      {
        label : "scores",
        data : Object.values(data),
        backgroundColor:[
          "rgba(219, 1, 1, 0.85)",
          "rgba(0, 138, 231, 1)",
          "rgba(237, 170, 0, 0.78)",
          "rgba(4, 242, 242, 0.74)",
          "rgba(73, 0, 220, 0.88)",
        ],
        borderColor:[
          "rgba(105, 0, 23, 1)",
          "rgba(1, 38, 159, 1)",
          "rgba(143, 103, 0, 1)",
          "rgba(0, 126, 126, 1)",
          "rgba(50, 0, 150, 1)",
        ],
        borderWidth : 0.7,
        hoverOffset : 4.5,
      },
    ],
  }
  return <Pie options={options} data ={pieChartData}/>
}