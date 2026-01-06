import express from "express";
// import bodyParser from "body-parser"; 
import natural from "natural";
const { TfIdf } = natural;

const router = express.Router();

router.post("/",(req,res) => {
  const { textResponses } = req.body;

  const tfidf = new TfIdf();
  textResponses.forEach((t) => (tfidf.addDocument(t)));

  const scores = {}

  tfidf.documents.forEach((_, i) => {
    tfidf.listTerms(i).forEach((val) =>{
      scores[val.term] = (scores[val.term] || 0) + val.tfidf;
    })
  })

  const themes = Object.entries(scores)
                .sort((a,b) => b[1] - a[1]) // very important.
                .slice(0,5)
                .map(([label,value]) => ({label,value}));
  res.json({ themes });
})

export default router;