import { userSelectors } from 'store/selectors';

describe('User Selectors', () => {
  test('should return the User', () => {
    userSelectors.getUser({ user: {} });
  });
});