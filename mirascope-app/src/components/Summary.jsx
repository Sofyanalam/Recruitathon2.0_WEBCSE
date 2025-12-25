import '../styling/App.css';
import { BarChart } from './Bar';
import { PieChart } from './Pie';

function Summary({insights},{sentiment}){
  return (
      <div className="summary">
        <pre className='AI-text'>
          {insights}
        </pre>
        <div className='charts'>
          <div className='barchart'><BarChart data={sentiment}/></div>
          <div className='piechart'><PieChart data={sentiment}/></div>
        </div>
      </div>
  );
}

export default Summary