var db = require('../../db');
const getPostQualifications = require('./getPostQualifications');

async function isQualified(empId, postId) {
  const postQuals = await getPostQualifications(postId);
  let returnValue = true;

  if(Array.isArray(postQuals) && !postQuals.length) {
    return true;
  }
  const data = await db.any(`select * from employee_quals eq where eq.employee_id = $1`, empId);
  const qualArray = data.map((item) => {
    return item.qual_id;
  });

  postQuals[postId].forEach((qual) => {
    if(!qualArray.includes(qual)) {
      returnValue = false;
    }
  });
  
  return returnValue;
}

module.exports = isQualified;