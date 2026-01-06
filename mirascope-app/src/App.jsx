import { useState } from "react";
import FileUpload from "./components/FileUpload";
import { SentimentAnalysis } from "./components/SentimentAnalysis";
import { getInsights } from './components/GetInsights';
import "./styling/App.css";
import Summary from "./components/Summary";
import { useEffect } from "react";
import { ExtractThemes } from "./components/ExtractThemes";

function App() {
  const [sentiment, setSentiment] = useState(null);
  const [insights,setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topThemes,setTopThemes] = useState([]);
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [topThemesVals,setTopThemesVals] = useState([]);

  const handleDataParsed = async (data) => {
    const responses = data.map((row) => Object.values(row)).flat();
    const textResponses = data.flatMap((row) => Object.values(row)).filter(value => typeof value === "string" && value.length>10 &&
      isNaN(value) );
    const themes = await ExtractThemes(textResponses);
    setTopThemes(themes.map(val => val["label"]));
    setTopThemesVals(themes);
    const sentimentResult = SentimentAnalysis(responses);
    setSentiment(sentimentResult);
  };

  const summarize = async function () {
    setLoading(true);
    try{
      const aiInsights = await getInsights(topThemes);
      setInsights(aiInsights);
    }catch (error) {
     console.error("Summarization failed:", error);
    }
    setLoading(false);
  };

  const popUp1 = () => {
    setPopup1(!popup1);
  };

  const popUp2 = () => {
    setPopup2(!popup2);
  }

  useEffect(() => {
    document.body.style.overflow = popup1 ? "hidden" : "auto";
  }, [popup1]);

  useEffect(() => {
    document.body.style.overflow = popup2 ? "hidden" : "auto";
  });

  return (
    <>
      {popup1 && (
        <div className="modal-overlay" onClick={popUp1}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={popUp1}>
              ⊗
            </button>
            <h2>About MiraScope</h2>
            <p>
              MiraScope is an AI-powered feedback summarizer that analyzes user
              feedback and extracts sentiment insights using AI.
            </p>
          </div>
        </div>
      )}
      {popup2 && (
          <div className="history-overlay" onClick={popUp2}>
            <div className="history" onClick={(e) => e.stopPropagation() }>
              <button className="close-button" onClick={popUp2}>
                ⊗
              </button>
              <h2 className="history-header">Check History</h2>
            </div>
          </div>
        )}
      <div className="header-container">
        <div className="features">
          <button className="history-button" onClick={popUp2}>
            History
          </button>
          <button className="about-button" onClick={popUp1}>
            ⓘ About
          </button>
        </div>
        <h1 className="app-title">
          Mira<span>Scope</span>
        </h1>
        <p className="app-subtitle">AI-powered Feedback Summarizer</p>

        <div className="upload-card">
          <label className="file-label">
            Upload CSV Feedback File
            <FileUpload onDataParsed={handleDataParsed} />
          </label>
          <button className="summarize-btn" onClick={summarize}>
            Summarize
          </button>
        </div>
        {loading && (
          <p className="loading">
            Analyzing feedback using <span>Google Gemini</span>...
          </p>
        )}
        { insights && sentiment && topThemesVals && <Summary info={insights} sentiment={sentiment} pieData={topThemesVals}/>}
        {/* {loading && sentiment && topThemesVals && <Summary sentiment={sentiment} pieData={topThemesVals}/>} */}
      </div>
    </>
  );
}
export default App;
