import "../styling/App.css";
import { BarChart } from "./Bar";
import { PieChart } from "./Pie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useState } from "react";

function Summary({ info,sentiment, pieData }) {
  const pdfRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const Themes = pieData.map((val) => val["label"]);

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    pdf.save("summary.pdf");
  };

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={darkMode ? "app dark" : "app"} ref={pdfRef}>
        <pre className="AI-text">
          {info || "nothing bro...."}
        </pre>
        <div className="themes">
          <h4 className="heading">Top 5 Themes</h4>
          <ol>
            {Themes.map((val) => {
              return <li>{val}</li>;
            })}
          </ol>
        </div>
        <div className="charts">
          <div className="barchart">
            <BarChart data={sentiment} />
          </div>
          <div className="piechart">
            <PieChart data={pieData} />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="download-button" onClick={downloadPDF}>
          📄 Download PDF
        </button>
        <button className="darkMode-button" onClick={toggle}>
          {darkMode ? "☀️  Light Mode" : "🌙  Dark Mode"}
        </button>
      </div>
    </>
  );
}

export default Summary;
