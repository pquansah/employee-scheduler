const shiftAvailability = require('./shiftAvailability');
var db = require('../db');

jest.mock('../db', () => {
  return {
    map: jest.fn().mockResolvedValueOnce([])
  };
});
beforeEach(() => {
  jest.clearAllMocks();
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = () => {
  const req = {};
  req.params = jest.fn().mockReturnValue(req);
  req.body = jest.fn().mockReturnValue(req);
  return req;
};

describe('shiftAvailability', () => {
  describe('getAllEmployeeAvailability', () => {
    it('return a 200 when getting all shifts', async () => {
      const res = mockResponse();
      const testing = await shiftAvailability.getAllAvailableShifts(
        {},
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
