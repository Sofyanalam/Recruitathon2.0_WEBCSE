import '../styling/App.css';

function Summary({insights}){
  return (
    <>
      <div className="summary">
        <h2>AI-Summary</h2>
        <pre>
          {insights}
        </pre>
      </div>
    </>
  );
}

export default Summary