import vader from 'vader-sentiment';

export function SentimentAnalysis(textResponses){
  const sentimentCount = {positive : 0,negative :0,neutral :0};

  textResponses.forEach( (text) => {
    const score = vader.SentimentIntensityAnalyzer.polarity_scores(text).compound;
    if(score >= 0.05) sentimentCount.positive++;
    else if(score <= -0.05) sentimentCount.negative++;
    else sentimentCount.neutral++;
  });
  return sentimentCount;
}
