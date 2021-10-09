import { delay } from './delay';

describe('delay', () => {
  it('should be wait', async () => {
    const time = Date.now();
    await delay(3000);
    expect(Date.now() - time).toBeGreaterThanOrEqual(3000);
  });
});
