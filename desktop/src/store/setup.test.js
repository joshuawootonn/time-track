import * as actions from 'store/actions';
import * as selectors from 'store/selectors';
import reducers from 'store/reducers';

describe('Store setup', () => { 
  it('should all be defined', () => {
    expect(actions).toBeDefined();
    expect(selectors).toBeDefined();
    expect(reducers).toBeDefined();
  });
});