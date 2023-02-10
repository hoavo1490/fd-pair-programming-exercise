// const EMAIL_LIMIT_PER_TASK = 5;
const emailQueue = require("../queues/queue");

function getCustomerPriority(size) {
    let priority = 1;
    switch (size) {
        case size < 5000: break;
        case size < 50000: priority = 2; break;
        case size > 100000: priority = 3; break;
        default: break;
    }
    return priority;
}

function composeEmail(campaignContent, subscribers, group) {
    const { subject, template, name } = campaignContent;
    const htmlEmails = subscribers.map(subscriber => ({
        emailAddress: subscriber.emailAddress,
        subject,
        html: template,
    }));
    return {
        htmlEmails,
        group
    };
}

async function addCampaignToQueue(emails, priority, sendTime) {
    let delay = 0;
    if (sendTime)
        delay = (sendTime.getTime() - new Date().getTime());
    try {
        await emailQueue.add(emails, {
            priority,
            delay
        });    
    } catch (e) {
        console.log("Can not add emails campaign to queue: ", e);
    }
    //wait for finished and update campaign status with db.updateCampaignStatus()
}

//   function splitEmails(emails) {
//     const emailChunks = [];
//     for (let i = 0; i < emails.length; i += EMAIL_LIMIT_PER_TASK) {
//       emailChunks.push(emails.slice(i, i + EMAIL_LIMIT_PER_TASK));
//     }
//     return emailChunks;
//   }

module.exports = {
    getCustomerPriority,
    composeEmail,
    addCampaignToQueue,
    // splitEmails
}