var db = require('../../db');
const { shiftAvailability } = require('../../queries');

async function isShiftAvailable(postId, date) {
  const data = await db.any(shiftAvailability, [postId, date]);

  if(Array.isArray(data) && !data.length) {
    return false;
  }
  return true;
}

module.exports = isShiftAvailable;