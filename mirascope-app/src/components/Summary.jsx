import "../styling/App.css";
import { BarChart } from "./Bar";
import { PieChart } from "./Pie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useState } from "react";

function Summary({ sentiment }) {
  const pdfRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

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

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 20;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("summary.pdf");
  };

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
        <div className={darkMode ? "app dark" : "app"} ref={pdfRef}>
          {/* <pre className={ darkMode ? 'AI-text dark' : 'AI-text'}>
          {insights}
        </pre> */}
          <div className="charts">
            <div className="barchart">
              <BarChart data={sentiment} />
            </div>
            <div className="piechart">
              <PieChart data={sentiment} />
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
