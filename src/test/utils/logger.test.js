import logger from '../../utils/logger';

describe('Logger Configuration', () => {
  test('Logger should be configured with expected options', () => {
    expect(logger.level).toBe('info');
    expect(logger.transports).toHaveLength(2);
   
  });
});
