import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, } from 'chart.js';
// import { color } from 'chart.js/helpers';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

export const BarChart = ({data}) => {
  const maxValue = Math.max(...Object.values(data));
  const options={
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
      duration: 2000,
      easing: "easeInOutBack",
      delay: (context) => context.dataIndex * 200
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1.3*maxValue,
      }
    }
  };
  const barChartData = {
    labels : Object.keys(data),
    datasets : [
      {
        label : "Polarity Scores",
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
        borderWidth :1,
        borderRadius: 10
      },
    ],
  };
  return <Bar options={options} data={barChartData}/>
}
