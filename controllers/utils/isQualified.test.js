var isQualified = require('./isQualified');
var getPostQualifications = require('./getPostQualifications');

jest.mock('./getPostQualifications', () => {
  return jest.fn().mockResolvedValueOnce({
    1: [1, 2, 5, 6],
    2: [1, 2, 5, 6],
    3: [3, 4],
    4: [3, 4],
    5: [3, 4]
  })
});

jest.mock('../../db', () => {
  return {
    any: () => {
      return [
        {
          employee_id: 2,
          qual_id: 2
        },
        {
          employee_id: 2,
          qual_id: 5
        },
        {
          employee_id: 2,
          qual_id: 8
        }
      ];
    }
  };
});

const expectedValue = {
  1: 'CPR',
  2: 'Firearms',
  3: 'Fire Control Panel',
  4: 'Security System',
  5: 'Customer Service',
  6: 'Detainment'
};

beforeEach(() => {
  jest.clearAllMocks()
})

describe('isQualified', () => {
  it('calls get getPostQualifications', async () => {
    const testing = await isQualified(1,2);
    expect(getPostQualifications).toHaveBeenCalled();
  });
  it('return true when there are no post quals', async () => {
    getPostQualifications.mockResolvedValueOnce([])
    const result = await isQualified(1,2);
    expect(result).toEqual(true);
  });
  it('return true when employee has correct qualificaitons', async () => {
    getPostQualifications.mockResolvedValueOnce({
      2: [
        2,
        8
      ]
    })
    const result = await isQualified(1,2);
    expect(result).toEqual(true);
  });
  it('return false when employee does not have right qualificaitons', async () => {
    getPostQualifications.mockResolvedValueOnce({
      2: [
        2,
        8,
        9
      ]
    })
    const result = await isQualified(1,2);
    expect(result).toEqual(false);
  });
});
