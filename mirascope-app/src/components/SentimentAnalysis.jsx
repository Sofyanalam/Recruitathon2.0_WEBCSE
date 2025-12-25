import vader from 'vader-sentiment';

export function SentimentAnalysis(textResponses){
  const sentimentCount = {VeryPositive : 0,Positive : 0,Neutral :0,Negative : 0,VeryNegative :0};

  textResponses.forEach( (text) => {
    const score = vader.SentimentIntensityAnalyzer.polarity_scores(text).compound;
    if(score >0.5) sentimentCount.VeryPositive++;
    else if(score > 0.05 && score <=0.5) sentimentCount.Positive++;
    else if (score >=-0.05 && score <=0.05)sentimentCount.Neutral++;
    else if(score >=-0.5 && score <-0.05) sentimentCount.Negative++;
    else sentimentCount.VeryNegative++; 
  });
  return sentimentCount;
}
