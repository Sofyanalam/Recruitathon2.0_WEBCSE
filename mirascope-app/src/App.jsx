import { useState } from 'react';
import FileUpload from "./components/FileUpload";
import { SentimentAnalysis } from './components/SentimentAnalysis';
import { getInsights } from './components/GetInsights';
import "./styling/App.css";
// import Summary from './components/Summary';

function App() {

  const [sentiment,setSentiment] = useState(null);
  const [insights,setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDataParsed = async (data) => {
    const textResponses = data.map((row) => Object.values(row)).flat();

    const sentimentResult = SentimentAnalysis(textResponses);
    setSentiment(sentimentResult);

    try{
        const aiInsights = await getInsights(textResponses);
        setInsights(aiInsights);
      }catch (error) {
       console.error("Summarization failed:", error);
      }
  };

  const summarize = async function (){
      setLoading(true);
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
        {loading && <p>Analyzing feedback using HuggingFace...</p>}
        {/* {loading && insights && <Summary insights={insights} />} */}
      </div>
    </>
  );
}
export default App;
