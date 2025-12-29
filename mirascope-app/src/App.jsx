import { useState } from "react";
import FileUpload from "./components/FileUpload";
import { SentimentAnalysis } from "./components/SentimentAnalysis";
// import { getInsights } from './components/GetInsights';
import "./styling/App.css";
import Summary from "./components/Summary";
import { useEffect } from "react";

function App() {
  const [sentiment, setSentiment] = useState(null);
  // const [insights,setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  // const [textResponses,setTextResponses] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleDataParsed = (data) => {
    const responses = data.map((row) => Object.values(row)).flat();
    // setTextResponses(responses);
    const sentimentResult = SentimentAnalysis(responses);
    setSentiment(sentimentResult);
  };

  const summarize = async function () {
    setLoading(true);
    // try{
    //   const feedback = ["This app is completely unusable and crashes constantly","Fix the crashes and stability issues"]
    //   const aiInsights = await getInsights(feedback);
    //   setInsights(aiInsights);
    // }catch (error) {
    //  console.error("Summarization failed:", error);
    // }
    // setLoading(false);
  };

  const popUp = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    document.body.style.overflow = popup ? "hidden" : "auto";
  }, [popup]);

  return (
    <>
      {popup && (
        <div className="modal-overlay" onClick={popUp}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={popUp}>
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
      <div className="header-container">
        <div>
          <button className="about-button" onClick={popUp}>
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
            Analyzing feedback using <span>HuggingFace</span>...
          </p>
        )}
        {/* {insights && sentiment && <Summary insights={insights} sentiment={sentiment}/>} */}
        {loading && sentiment && <Summary sentiment={sentiment} />}
      </div>
    </>
  );
}
export default App;
