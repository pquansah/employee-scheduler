const transformEmployeeArray = require('./transformEmployeeArray');
var db = require('../../db');

jest.mock('../../db', () => {
  return {
    any: jest.fn().mockResolvedValueOnce([])
  };
});
jest.mock('./getEmployeeQualifications');
jest.mock('./getQualifications');

beforeEach(() => {
  jest.clearAllMocks();
});

const fakeArray = [
  {
    id: 2,
    fname: 'Sarah',
    lname: 'Connors',
    work_date: '2021-04-09T07:00:00.000Z',
    description: 'Internal Armed Guard',
    shift_start: '22:00:00-07',
    shift_end: '04:00:00-07'
  },
  {
    id: 2,
    fname: 'Sarah',
    lname: 'Connors',
    work_date: '2021-04-08T07:00:00.000Z',
    description: 'Internal Armed Guard',
    shift_start: '22:00:00-07',
    shift_end: '04:00:00-07'
  },
  {
    id: 2,
    fname: 'Sarah',
    lname: 'Connors',
    work_date: '2021-04-06T07:00:00.000Z',
    description: 'Internal Armed Guard',
    shift_start: '22:00:00-07',
    shift_end: '04:00:00-07'
  },
  {
    id: 2,
    fname: 'Sarah',
    lname: 'Connors',
    work_date: '2021-04-05T07:00:00.000Z',
    description: 'Internal Armed Guard',
    shift_start: '22:00:00-07',
    shift_end: '04:00:00-07'
  }
];

const result = {
  employees: {
    2: {
      fname: 'Sarah',
      id: 2,
      lname: 'Connors',
      schedule: {
        '2021-04-05': [
          {
            desciption: 'Internal Armed Guard',
            shift_end: '04:00:00-07',
            shift_start: '22:00:00-07'
          }
        ],
        '2021-04-06': [
          {
            desciption: 'Internal Armed Guard',
            shift_end: '04:00:00-07',
            shift_start: '22:00:00-07'
          }
        ],
        '2021-04-08': [
          {
            desciption: 'Internal Armed Guard',
            shift_end: '04:00:00-07',
            shift_start: '22:00:00-07'
          }
        ],
        '2021-04-09': [
          {
            desciption: 'Internal Armed Guard',
            shift_end: '04:00:00-07',
            shift_start: '22:00:00-07'
          }
        ]
      }
    }
  }
};

describe('transformEmployeeArray', () => {
  it('return a transformed object', async () => {
    const testing = await transformEmployeeArray(fakeArray, [], []);
    expect(testing).toEqual(result);
  });
});
