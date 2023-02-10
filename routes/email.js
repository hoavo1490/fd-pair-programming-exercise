const express = require('express');
const router = express.Router();
const emailQueue = require("../queues/queue");
const db = require('../db/queries')
const emailService = require('../services/emails.service');
var shark = require('../mock/shark.json')
var tuna = require('../mock/tuna.json')

router.post('/', (req, res) => {
  // Get the subscribers
  const { user_id, html } = req.body;
  const subscribers = user_id === 1 ? tuna : shark;
  // const subscriberss = db.getSubscribersByUserId(user_id)
  const emails = emailService.composeEmail(html, subscribers);
  const priority = emailService.getCustomerPriority(subscribers.length);
  console.log(priority)
  for (emailChunk of emails) {
    const queueData = {
      emailChunk,
      type: user_id === 1 ? 'tuna' : 'shark'
    }
    emailService.addEmailsToQueue(queueData, { priority: priority });
  }
  setTimeout(() => {
    res.send(emailQueue.getJobs().then(jobs => {
      // console.log(jobs)
    }));
  },2000);
});

module.exports = router;