const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'email_marketing',
  password: 'password',
  port: 5432,
})

function getSubscribersByUserId(userId) {
    pool.query(`SELECT * FROM subscribers WHERE subscribed_user_id = ${userId}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getSubscribersByUserId
}
  

  