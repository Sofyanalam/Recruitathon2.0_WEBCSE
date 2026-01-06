// import { TfIdf } from "natural";

// export function ExtractThemes({textResponses}){
//   const tfidf = new TfIdf();
//   textResponses.forEach((t) => {tfidf.addDocument(t)});

//   const scores = {}

//   tfidf.documents.forEach((_, i) => {
//     tfidf.listTerms(i).forEach((val) =>{
//       scores[val.term] = (scores[val.term] || 0) + val.tfidf;
//     })
//   })

//   return Object.entries(scores)
//           .sort((a,b) => b[1] - a[1]) // very important.
//           .slice(0,3)
//           .map(([label,value]) => ({label,value}));
// }

export async function ExtractThemes(textResponses){
  try {
    const response = await fetch("http://localhost:3000/themes",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({ textResponses })
    }
  );
  const data = await response.json();
    return data.themes ;
  } catch (err) {
    return console.log(err);
  }

}