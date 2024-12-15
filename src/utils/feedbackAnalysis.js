import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export const analyzeSentiment = (feedbacks) => {
  const analysis = { positive: 0, neutral: 0, negative: 0 };
  feedbacks.forEach(feedback => {
    const result = sentiment.analyze(feedback.feedback);
    if (result.score > 0) {
      analysis.positive += 1;
    } else if (result.score < 0) {
      analysis.negative += 1;
    } else {
      analysis.neutral += 1;
    }
  });
  return analysis;
};

export const getFeedbackTrends = (feedbacks) => {
  const trends = { labels: [], data: [] };
  const feedbackByDate = feedbacks.reduce((acc, feedback) => {
    const date = feedback.createdAt.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  trends.labels = Object.keys(feedbackByDate);
  trends.data = Object.values(feedbackByDate);
  return trends;
};
