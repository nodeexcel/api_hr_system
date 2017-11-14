import Slack from 'slack-node';
import db from '../db';
import config from '../../../config.json';
import SlackBot from 'slackbots';
import SmartSlack from 'smartslack';
import SlackClient from '@slack/client';

module.exports = {
    slack_notify: function(msg, reciever) {
        console.log(reciever)
        // let webhookUri = "https://hooks.slack.com/services/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";

        // let slack = new Slack();
        // slack.setWebhook(webhookUri);
        // if (reciever.type == "channel") {
        //     slack.webhook({
        //         channel: reciever.id,
        //         username: "hr dev",
        //         text: msg
        //     }, function(err, response) {
        //         console.log(response);
        //     });
        // } else if (reciever.type == "user") {
        //     console.log(reciever)
        //     // db.user_profile.findOne({ attributes: ['slack_id'], where: { user_Id: reciever.id } }).then((data) => {
        //     //     // console.log(data)
        //     //     slack.webhook({
        //     //         channel: "C3P9QVA8K",
        //     //         username: "hr dev",
        //     //         text: msg
        //     //     }, function(err, response) {
        //     //         console.log(response);
        //     //     });
        //     // })
        //     // let apiToken = "xoxp-124720392913-124692552128-126024783172-ab43f11e1bbfec2d49db6c9913b5ae35";

        //     // let slack = new Slack(apiToken);

        //     // slack.api("channels.list", function(err, response) {
        //     //     console.log(response);
        //     // });

        //     // slack.api('chat.postMessage', {
        //     //     text: 'hello from nodejs',
        //     //     channel: 'U3NLE8DLG'
        //     // }, function(err, response) {
        //     //     console.log(response);
        //     // });


        //     // create a bot
        //     var bot = new SlackBot({
        //         token: 'xoxb-253046880773-brCowBO269HwY2ckprwCVAS0', // Add a bot https://my.slack.com/services/new/bot and put the token 
        //         name: 'Hr System Demo'
        //     });

        //     bot.on('start', function() {
        //         // more information about additional params https://api.slack.com/methods/chat.postMessage
        //         var params = {
        //             icon_emoji: ':bust_in_silhouette:'
        //         };

        //         // // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
        //         // bot.postMessageToChannel('general', 'hello!', params);

        //         // define existing username instead of 'user_name'
        //         bot.postMessage('U3NLE8DLG', 'hello!', params)

        //         // If you add a 'slackbot' property, 
        //         // you will post to another user's slackbot channel instead of a direct message
        //         bot.postMessageToUser('abhishek', 'hello!', { 'slackbot': true, icon_emoji: ':cat:' });

        //     });

        // let apiToken = { token: "xoxb-253046880773-brCowBO269HwY2ckprwCVAS0" };

        // // let slack = new Slack(apiToken);

        // // slack.api("users.list", function(err, response) {
        // //     console.log(response);
        // // });

        // // slack.api('chat.postMessage', {
        // //     text: 'hello from nodejs',
        // //     channel: '@atul'
        // // }, function(err, response) {
        // //     console.log(response);
        // // });


        // let slackClient = new SmartSlack(apiToken);

        // slackClient.sendToUser('atul', 'message text');

        let token = 'xoxp-124720392913-124692552128-126024783172-ab43f11e1bbfec2d49db6c9913b5ae35';
        console.log(token)

        let web = new SlackClient.WebClient(token);
        console.log("mcvjdvh")
        web.chat.postMessage('@atul', 'Hello there', function(err, res) {
            if (err) {
                console.log('Error:', err)
            } else {
                console.log('Message sent: ', res);
            }
        });


    }
}