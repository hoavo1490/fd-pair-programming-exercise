CREATE DATABASE email_marketing;

USE email_marketing;

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

CREATE TABLE campaigns (
  campaign_id INT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  status VARCHAR(255),
  send_time DATETIME,
  filter VARCHAR(255),
  html TEXT,
  subject VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE subscribers (
  subscriber_id INT PRIMARY KEY,
  subscribed_user_id INT,
  email_address VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  FOREIGN KEY (subscribed_user_id) REFERENCES users(user_id)
);  