const mysql = require("@server/database")

module.exports = async id => {
  const [likes, comments] = await Promise.all([
    await mysql.query(`select uuid from liked where uuidPoster = ?`, [id]),
    await mysql.query(`select uuid from comments where uuidPoster = ?`, [id])
  ])
  
  return {
    likes: likes[0].map(item => item.uuid),
    comments: comments[0].map(item => item.uuid)
  }
};