import { analyzeSelectors } from 'store/selectors';

describe('Activity Selectors', () => {
  test('should have two basic selectors', () => {
    analyzeSelectors.getAnalyzeState({ analyze:{} });
  });  
});