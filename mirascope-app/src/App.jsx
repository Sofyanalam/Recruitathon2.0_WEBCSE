import { useState } from 'react'
import FileUpload from "/Users/sofyanalam/mirascope-app/src/components/FileUpload";
import "/Users/sofyanalam/mirascope-app/src/styling/App.css";

function App() {

  const [bool,setBool] = useState(false);

  const handleDataParsed = (data) => {
    const textResponses = data.map((row) => Object.values(row)).flat();
    setBool(true);
    console.log(textResponses);
    console.log(typeof textResponses);
  };
  const analyseSentiment = () => {
      if(bool){
        console.log('analysing....');
      }
  }
  
  return (
    <>
      <div className="header-container">
        <h1 className="app-title">
          Mira<span>Scope</span>
        </h1>
        <p className="app-subtitle">AI-powered Feedback Summarizer</p>

        <div className="upload-card">
          <label className="file-label">
            Upload CSV Feedback File
            <FileUpload onDataParsed={handleDataParsed}/>
          </label>
          <button className="summarize-btn" onClick={analyseSentiment}>
            Summarize
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
