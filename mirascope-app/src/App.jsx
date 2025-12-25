import { useState } from 'react';
import FileUpload from "./components/FileUpload";
import { SentimentAnalysis } from './components/SentimentAnalysis';
import { getInsights } from './components/GetInsights';
import "./styling/App.css";
import Summary from './components/Summary';

function App() {

  const [sentiment,setSentiment] = useState(null);
  const [insights,setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [textResponses,setTextResponses] = useState(null);

  const handleDataParsed = (data) => {
    const responses = data.map((row) => Object.values(row)).flat();
    setTextResponses(responses);
    const sentimentResult = SentimentAnalysis(responses);
    setSentiment(sentimentResult);
  };

  const summarize = async function (){
      setLoading(true);
      try{
        const aiInsights = await getInsights(textResponses);
        setInsights(aiInsights);
      }catch (error) {
       console.error("Summarization failed:", error);
      }
      setLoading(false);
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
          <button className="summarize-btn" onClick={summarize}>
            Summarize
          </button>
        </div>
        {loading && <p className='loading'>Analyzing feedback using <span>HuggingFace</span>...</p>}
        {insights && sentiment && <Summary insights={insights} sentiment={sentiment}/>}
      </div>
      
    </>
  );
}
export default App;
