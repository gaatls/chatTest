//"use strict";
console.log('started');

//Taking care of the different api authorization tokens, use the bash script to start the bot.
let slackToken = process.env.SLACK_TOKEN;
let apiaiToken = process.env.AI_TOKEN;

let Botkit = require('botkit');
let apiai = require('apiai');
let nlProcessor = apiai(apiaiToken);

//var witbot = Witbot(process.env.WIT_TOKEN)
let controller = Botkit.slackbot({
    debug: false
});
controller.spawn({
        token: slackToken
    }).startRTM(function (err, bot, payload) {
        if (err) throw new Error('Error connecting to Slack: ', err)
        console.log('Connected to Slack')
    });

    // wire up DMs and direct mentions to wit.ai
controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
    console.log("someone said something to me!");
    let request = nlProcessor.textRequest(message.text);
    
    request.on('response', function(response){
       console.log(response);
        if( checkResponseConfidence(response) ){
            bot.reply(message, response.result.fulfillment.speech);
        }    
    });
    
    request.on('error', function(response){
       console.log(response); 
    });
    
    request.end();
});

function checkResponseConfidence(response){
    let retVal = false;
    if( response.result.score > 0.5){
        console.log("we're confident!");
        retVal = true;
    }
    return retVal;
}