const mysql = require("@server/database")
const uuid = require("uuid")
const fs = require("fs")
const path = require("path")
const getDomain = require("./getDomain")

async function savePhotos(rootDir, photos) {
  return await Promise.all(
    photos.map(item => new Promise(async (resolve, reject) => {
      const namePhoto = uuid.v4() + path.extname(item.originalname)
      await fs.writeFile(path.resolve(rootDir, "upload", namePhoto), item.buffer, err => err ? reject(err) : resolve(getDomain() + `/api/posts/upload/${namePhoto}`))
    }))
  )
}

module.exports = async (user, body, photos, rootDir) => {
  try {
    const photosUrl = await savePhotos(rootDir, photos)
    const result = (await mysql.query(`
      update posts
      set contents = ?, 
        subject = ?,
        point = ?,
        class = ?
      where id = ? and
        uuid = ? 
      
    `, [body.contents, body.subject, body.point, body.class, body.uid, user.uuid]))[0]

    if (result) {
      // remove
      await mysql.query(`
        delete from photos
        where uuidPoster = ? and
          id not in (${body.photos_not_remove.map(() => "?").join(",")})
          limit 10
      `, [body.uid, ...body.photos_not_remove])

      if (photosUrl.length > 0) {
        return !!(await mysql.query(`
        insert into photos (
          uuidPoster,
          url
        ) values 
          ${photosUrl.map(() => "(?, ?)").join(",")}
      `, photosUrl.map(item => [`${body.uid}`, item]).flat()))[0]
      } else {
        return true
      }
    } else {
      return false
    }
  } catch (e) {
    return false
  }
};