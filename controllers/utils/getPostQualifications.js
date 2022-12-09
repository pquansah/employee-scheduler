var db = require('../../db');

async function getPostQualifications(postId) {
  const data = await db.any(`select * from post_quals pq where pq.post_id = $1`, postId);
  const result = {};
  if(Array.isArray(data) && !data.length) {
    return [];
  }
  data.forEach((postQuals) => {
    if(result[postQuals.post_id]) {
      result[postQuals.post_id].push(postQuals.qual_id)
    } else {
      result[postQuals.post_id] = [postQuals.qual_id]
    }
  });
  return result;
}

module.exports = getPostQualifications;