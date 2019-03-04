import { activitySelectors } from 'store/selectors';

describe('Activity Selectors', () => {
  test('should have two basic selectors', () => {
    activitySelectors.getActivitiesFromEntities({ entities: { activities:{} } });
    activitySelectors.getActivitiesFromResults({ results: { activities:[] } });
  });
});