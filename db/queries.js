const Pool = require('pg').Pool
const CampaignStatus = require("../constants/campaignStatus")
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

function getSubscribersByUserId(userId) {
    pool.query(`SELECT * FROM subscribers WHERE subscribed_user_id = ${userId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

function saveCampaign(campaign) {
    const {
        user_id, html, send_time, subject, name
    } = campaign;
    pool.query(`INSERT INTO campaigns (user_id, name, status, send_time, filter, html, subject)
    VALUES (${user_id}, ${name}, ${CampaignStatus.PENDING}, ${send_time} , ${filter}, ${html}, ${subject});`)
}

function updateCampaignStatus(campaign_id, status) {
    pool.query(`UPDATE campaigns
    SET status = ${status}
    WHERE campaign_id = ${campaign_id};
    `)
}

module.exports = {
    getSubscribersByUserId,
    saveCampaign,
    updateCampaignStatus
}


