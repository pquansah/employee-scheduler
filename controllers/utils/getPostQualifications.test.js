var getPostQualifications = require('./getPostQualifications');

jest.mock('../../db', () => {
  return {
    any: () => {
      return [
        {
          post_id: 1,
          qual_id: 1
        },
        {
          post_id: 1,
          qual_id: 2
        },
        {
          post_id: 1,
          qual_id: 5
        },
        {
          post_id: 1,
          qual_id: 6
        },
        {
          post_id: 2,
          qual_id: 1
        },
        {
          post_id: 2,
          qual_id: 2
        },
        {
          post_id: 2,
          qual_id: 5
        },
        {
          post_id: 2,
          qual_id: 6
        },
        {
          post_id: 3,
          qual_id: 3
        },
        {
          post_id: 3,
          qual_id: 4
        },
        {
          post_id: 4,
          qual_id: 3
        },
        {
          post_id: 4,
          qual_id: 4
        },
        {
          post_id: 5,
          qual_id: 3
        },
        {
          post_id: 5,
          qual_id: 4
        }
      ];
    }
  };
});

const expectedValue = {
  1: [1, 2, 5, 6],
  2: [1, 2, 5, 6],
  3: [3, 4],
  4: [3, 4],
  5: [3, 4]
};

describe('getPostQualifications', () => {
  it('returns a list of post qualificaitons', async () => {
    const result = await getPostQualifications({});
    expect(result).toEqual(expectedValue);
  });
});
