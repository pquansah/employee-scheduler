var isUnderTotalHours = require('./isUnderTotalHours');
const transformEmployeeArray = require('./transformEmployeeArray');
var db = require('../../db');

jest.mock('../../db', () => {
  return {
    any: jest.fn().mockResolvedValueOnce([])
  };
});
jest.mock('./getEmployeeQualifications');
jest.mock('./getQualifications');
jest.mock('./transformEmployeeArray');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('isShiftAvailable', () => {
  it('return false if employee does not exist', async () => {
    const testing = await isUnderTotalHours(1, 2, 3);
    expect(testing).toEqual(false);
  });
  it('return false if daily total time is over the limit', async () => {
    db.any.mockResolvedValue([
      {
          "shift_start": "22:00:00-07",
          "shift_end": "04:00:00-07",
          "desciption": "Internal Armed Guard"
      }
  ]);
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
              }
            ],
            '2021-04-05': [
              {
                shift_start: '22:00:00-07',
                shift_end: '04:00:00-07',
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

    const testing = await isUnderTotalHours(2, 2, 3);
    expect(testing).toEqual(false);
  });

  it('return false if total time is over the limit', async () => {
    db.any.mockResolvedValue([
      {
          "shift_start": "15:00:00-07",
          "shift_end": "16:00:00-07",
          "desciption": "Internal Armed Guard"
      }
  ]);
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

    const testing = await isUnderTotalHours(2, 2, 3);
    expect(testing).toEqual(false);
  });
});
