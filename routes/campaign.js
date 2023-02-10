const express = require('express');
const campaignRoute = express.Router();
const db = require('../db/queries')
const emailService = require('../services/campaign.service');
// const shark = require('../mock/shark.json')
// const tuna = require('../mock/tuna.json')
const CustomerGroup = require('../constants/cGroups')

campaignRoute.post('/', async (req, res) => {
  const { user_id, name, html, send_time, subject } = req.body;
  const subscribers = await db.getSubscribersByUserId(user_id);
  const campaignContent = { subject, html, name };
  const priority = emailService.getCustomerPriority(subscribers.length);
  //only for simulating sending time, add group type to emails bulk
  const group = priority === 1 ? CustomerGroup.TUNA : priority === 2 ? CustomerGroup.SHARK : CustomerGroup.WHALE
  const emails = emailService.composeEmail(campaignContent, subscribers, group);
  await emailService.addCampaignToQueue(emails, priority, send_time);
  await db.saveCampaign({ user_id, name, html, send_time, subject })
  res.send(`Emails campaign for user_id ${user_id} added to queue`);
});

module.exports = campaignRoute;