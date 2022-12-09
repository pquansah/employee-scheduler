const employee = require('./employee');
const transformEmployeeArray = require('./utils/transformEmployeeArray');
var db = require('../db');

jest.mock('../db', () => {
  return {
    any: jest.fn().mockResolvedValueOnce([])
  };
});
jest.mock('./utils/getEmployeeQualifications');
jest.mock('./utils/getQualifications');
jest.mock('./utils/transformEmployeeArray');

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

describe('employee', () => {
  describe('getAllEmployeeAvailability', () => {
    it('return a 400 when the employee does not exist', async () => {
      const res = mockResponse();
      const testing = await employee.getAllEmployeeAvailability(
        {},
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('return a 200 when the employee exist', async () => {
      const res = mockResponse();
      transformEmployeeArray.mockReturnValueOnce({
        employees: {
          2: {
            id: 2,
            fname: 'Sarah',
            lname: 'Connors',
            schedule: {
              '2021-04-09': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-08': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-06': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                },
                {
                  shift_start: '09:00:00-07',
                  shift_end: '17:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-05': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                },
                {
                  shift_start: '09:00:00-07',
                  shift_end: '17:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ]
            },
            qualifications: [
              {
                qual_id: 2,
                label: 'Firearms'
              },
              {
                qual_id: 5,
                label: 'Customer Service'
              },
              {
                qual_id: 6,
                label: 'Detainment'
              }
            ]
          }
        }
      });
      const testing = await employee.getAllEmployeeAvailability(
        {},
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getEmployeeSchedule', () => {
    it('return a 400 when the employee does not exist', async () => {
      db.any.mockResolvedValueOnce([])
      const req = mockRequest();
      const res = mockResponse();
      const testing = await employee.getEmployeeSchedule(
        req,
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('return a 200 when the employee exist', async () => {
      const req = mockRequest();
      const res = mockResponse();
      transformEmployeeArray.mockReturnValueOnce({
        employees: {
          2: {
            id: 2,
            fname: 'Sarah',
            lname: 'Connors',
            schedule: {
              '2021-04-09': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-08': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-06': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                },
                {
                  shift_start: '09:00:00-07',
                  shift_end: '17:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ],
              '2021-04-05': [
                {
                  shift_start: '22:00:00-07',
                  shift_end: '04:00:00-07',
                  desciption: 'Internal Armed Guard'
                },
                {
                  shift_start: '09:00:00-07',
                  shift_end: '17:00:00-07',
                  desciption: 'Internal Armed Guard'
                }
              ]
            },
            qualifications: [
              {
                qual_id: 2,
                label: 'Firearms'
              },
              {
                qual_id: 5,
                label: 'Customer Service'
              },
              {
                qual_id: 6,
                label: 'Detainment'
              }
            ]
          }
        }
      });
      const testing = await employee.getEmployeeSchedule(
        req,
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deleteEmployeeShift', () => {
    it('return a 200 when the employee shift is deleted', async () => {
      db.any.mockResolvedValueOnce([])
      const req = mockRequest();
      const res = mockResponse();
      const testing = await employee.deleteEmployeeShift(
        req,
        res,
        () => {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
