import { expect } from 'chai';

import { analyzeSentiment, getFeedbackTrends } from '../src/utils/feedbackAnalysis.js';

describe('Feedback Analysis', () => {
  // Test suite for analyzeSentiment function
  describe('analyzeSentiment', () => {
    // Test case for positive feedback
    it('should correctly analyze positive feedback', () => {
      const feedbacks = [{ feedback: 'Great service!' }];
      const result = analyzeSentiment(feedbacks);
      expect(result).to.deep.equal({ positive: 1, neutral: 0, negative: 0 });
    });

    // Test case for neutral feedback
    it('should correctly analyze neutral feedback', () => {
      const feedbacks = [{ feedback: 'It was okay.' }];
      const result = analyzeSentiment(feedbacks);
      expect(result).to.deep.equal({ positive: 0, neutral: 1, negative: 0 });
    });

    // Test case for negative feedback
    it('should correctly analyze negative feedback', () => {
      const feedbacks = [{ feedback: 'Terrible experience.' }];
      const result = analyzeSentiment(feedbacks);
      expect(result).to.deep.equal({ positive: 0, neutral: 0, negative: 1 });
    });

    // Test case for mixed feedback
    it('should handle mixed feedback', () => {
      const feedbacks = [
        { feedback: 'Great service!' },
        { feedback: 'It was okay.' },
        { feedback: 'Terrible experience.' }
      ];
      const result = analyzeSentiment(feedbacks);
      expect(result).to.deep.equal({ positive: 1, neutral: 1, negative: 1 });
    });
  });

  // Test suite for getFeedbackTrends function
  describe('getFeedbackTrends', () => {
    // Test case for calculating feedback trends
    it('should correctly calculate feedback trends', () => {
      const feedbacks = [
        { feedback: 'Great service!', createdAt: new Date('2024-12-12') },
        { feedback: 'It was okay.', createdAt: new Date('2024-12-12') },
        { feedback: 'Terrible experience.', createdAt: new Date('2024-12-13') }
      ];
      const result = getFeedbackTrends(feedbacks);
      expect(result).to.deep.equal({
        labels: ['2024-12-12', '2024-12-13'],
        data: [2, 1]
      });
    });

    // Test case for handling empty feedback array
    it('should handle empty feedback array', () => {
      const feedbacks = [];
      const result = getFeedbackTrends(feedbacks);
      expect(result).to.deep.equal({ labels: [], data: [] });
    });
  });
});

/**
 * @since 2024-12-12
 * @author gauravmahto
 */
