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
        text : " This is the data representing TF-IDF scores of themes."
      }
    },
    animation: {
      duration: 2500,
      easing: "easeOutExpo"
    }
  };
  const pieChartData = {
    labels : data.map(val => val["label"]),
    datasets : [
      {
        label : "scores",
        data : data.map(val => val["value"]),
        backgroundColor:[
          "rgba(219, 12, 1, 0.85)",
          "rgba(0, 169, 231, 1)",
          "rgba(228, 184, 73, 0.78)",
          "rgba(226, 101, 178, 0.74)",
          "rgba(106, 45, 227, 0.88)",
        ],
        borderColor:[
          "rgba(100, 5, 26, 1)",
          "rgba(1, 38, 159, 1)",
          "rgba(143, 103, 0, 1)",
          "rgba(74, 0, 76, 1)",
          "rgba(50, 0, 150, 1)",
        ],
        borderWidth : 0.7,
        hoverOffset : 4.5,
      },
    ],
  }
  return <Pie options={options} data ={pieChartData}/>
}