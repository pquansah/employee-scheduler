var getEmployeeQualifications = require('./getEmployeeQualifications');

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
          qual_id: 6
        },
        {
          employee_id: 3,
          qual_id: 4
        },
        {
          employee_id: 3,
          qual_id: 3
        },
        {
          employee_id: 6,
          qual_id: 2
        },
        {
          employee_id: 6,
          qual_id: 5
        },
        {
          employee_id: 6,
          qual_id: 6
        },
        {
          employee_id: 6,
          qual_id: 3
        },
        {
          employee_id: 6,
          qual_id: 4
        }
      ];
    }
  };
});

const expectedValue = [
  { employee_id: 2, qual_id: 2 },
  { employee_id: 2, qual_id: 5 },
  { employee_id: 2, qual_id: 6 },
  { employee_id: 3, qual_id: 4 },
  { employee_id: 3, qual_id: 3 },
  { employee_id: 6, qual_id: 2 },
  { employee_id: 6, qual_id: 5 },
  { employee_id: 6, qual_id: 6 },
  { employee_id: 6, qual_id: 3 },
  { employee_id: 6, qual_id: 4 }
];

describe('getEmployeeQualifications', () => {
  it('returns a list of employee qualificaitons', async () => {
    const result = await getEmployeeQualifications({});
    expect(result).toEqual(expectedValue);
  });
});
