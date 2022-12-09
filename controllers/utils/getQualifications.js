var db = require('../../db');

async function getQualifications() {
  const data = await db.any(`select * from qualifications`);
  const result = {};
  data.forEach((element) => {
    result[element.id] = element.label;
  });
  return result;
}

module.exports = getQualifications;