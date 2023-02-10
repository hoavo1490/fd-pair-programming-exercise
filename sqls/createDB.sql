CREATE DATABASE email_marketing;

USE email_marketing;

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  information TEXT
);

CREATE TABLE campaigns (
  user_id INT,
  name VARCHAR(255),
  status VARCHAR(255),
  send_time DATETIME,
  filter VARCHAR(255),
  html TEXT,
  subject VARCHAR(255),
  PRIMARY KEY (user_id, name),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE subscribers (
  subscribed_user_id INT,
  email_address VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  PRIMARY KEY (email_address),
  FOREIGN KEY (subscribed_user_id) REFERENCES users(user_id)
);