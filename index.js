var botkit = require('botkit');
var witbot = require('witbot');

//Must set these environment variables manually
var slackToken = process.env.SLACK_TOKEN;
var witToken = process.env.WIT_TOKEN;

console.log("slackToken: " + slackToken);