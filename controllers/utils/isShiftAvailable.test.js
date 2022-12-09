var isShiftAvailable = require('./isShiftAvailable');
var db = require('../../db');

jest.mock('../../db', () => {
  return {
    any: jest.fn().mockResolvedValueOnce([])
  }
});
beforeEach(() => {
  jest.clearAllMocks()
})

describe('isShiftAvailable', () => {
  it('return false if there are no shifts available', async () => {
    const testing = await isShiftAvailable(1,2);
    expect(testing).toEqual(false);
  });
  it('return true if there are shifts available', async () => {
    db.any.mockResolvedValueOnce([0]);
    const testing = await isShiftAvailable(1,2);
    expect(testing).toEqual(true);
  });
});
