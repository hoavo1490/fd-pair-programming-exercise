const EMAIL_LIMIT_PER_TASK  = 5;
const emailQueue = require("../queues/queue");

function getCustomerPriority(size) {
    switch (size) {
      case size < 5000: return 1;
      case size < 50000: return 2;
      case size > 100000: return 3;
      default: return 0;
    }
  }
  
  function composeEmail(template, subscribers, type) {
    const htmlEmails = subscribers.map(subscriber => ({
      emailAddress: subscriber.emailAddress,
      metadata: subscriber.metadata,
      html: template,
      type
    }));
    return htmlEmails;
  }
  
  async function addEmailsToQueue(emailChunk, priority) {
    await emailQueue.add(emailChunk, priority);
  }
  
  function splitEmails(emails) {
    const emailChunks = [];
    for (let i = 0; i < emails.length; i += EMAIL_LIMIT_PER_TASK) {
      emailChunks.push(emails.slice(i, i + EMAIL_LIMIT_PER_TASK));
    }
    return emailChunks;
  }

module.exports = {
    getCustomerPriority,
    composeEmail,
    addEmailsToQueue,
    splitEmails
}