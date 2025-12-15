import Papa from 'papaparse';
import "/Users/sofyanalam/mirascope-app/src/styling/App.css";


function FileUpload({onDataParsed}){
  const handleFile = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header:true,
      skipEmptyLines:true,
      complete:(result) => {
        onDataParsed(result.data);
      }
    });
  }
 return(
  <input type="file" accept=".csv" className="file-input" onChange={handleFile}/>
 );
}

export default FileUpload