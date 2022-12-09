var getQualifications = require('./getQualifications');

jest.mock('../../db', () => {
  return {
    any: () => {
      return [
        {
          id: 1,
          label: 'CPR'
        },
        {
          id: 2,
          label: 'Firearms'
        },
        {
          id: 3,
          label: 'Fire Control Panel'
        },
        {
          id: 4,
          label: 'Security System'
        },
        {
          id: 5,
          label: 'Customer Service'
        },
        {
          id: 6,
          label: 'Detainment'
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

describe('getQualifications', () => {
  it('returns a list of qualificaitons', async () => {
    const result = await getQualifications({});
    expect(result).toEqual(expectedValue);
  });
});
