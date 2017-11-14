import _ from 'lodash';
import db from '../db';
import request from "request";
import md5 from "md5";
let fill = require('fill-range');
let WebClient = require('@slack/client').WebClient;

const getUserInfo = (userid, admin_data, callback) => {
    db.sequelize.query("SELECT users.*, user_profile.*, roles.id as role_id, roles.name as role_name FROM users LEFT JOIN user_profile ON users.id = user_profile.user_id LEFT JOIN user_roles ON users.id = user_roles.user_id LEFT JOIN roles ON user_roles.role_id = roles.id where users.id = " + userid).then((data) => {
        let work_email = data[0][0].work_email;
        getSlackUserInfo(work_email, admin_data, function(err, result) {
            if (err) {
                callback(err, null)
            } else {
                data[0][0].slack_profile = result;
                callback(null, data[0][0])
            }
        });
    })

    function getSlackUserInfo(work_email, admin_data, callback) {
        let res = '';
        getSlackUsersList(admin_data, function(err, allSlackUsers) {
            if (err) {
                callback(err, null)
            } else {
                if (allSlackUsers.length > 0) {
                    _.forEach(allSlackUsers, function(val) {
                        if (val.profile && val.profile.email == work_email) {
                            res = val;
                            return false;
                        }
                    })
                    callback(null, res);
                }
            }
        })
    }

    function getSlackUsersList(admin_data, callback) {
        let slack_user_lists = [];
        let channel_ids;
        getSlackChannelIds(admin_data, function(err, get_ids) {
            channel_ids = get_ids;
        });
        let url = "https://slack.com/api/users.list?client_id=" + admin_data[0].client_id + "&token=" + admin_data[0].token + "&client_secret=" + admin_data[0].client_secret;
        request(url, function(err, html) {
            if (!html) {
                callback(err, null)
            } else {
                let result = JSON.parse(html.body);
                if (result['members'] && result['members'].length > 0) {
                    _.forEach(result['members'], function(get_users_id) {
                        let slack_channel_id_info = [];
                        let slack_channel_id = '';
                        _.forEach(channel_ids, function(ch_id) {
                            if (get_users_id['id'] == ch_id['user']) {
                                slack_channel_id += ch_id['id'];
                                slack_channel_id_info.push(ch_id);
                                get_users_id.slack_channel_id = slack_channel_id;
                                return false;
                            }
                            get_users_id.slack_channel_id_info = slack_channel_id_info;
                            slack_user_lists.push(get_users_id);
                        })
                    })
                    callback(null, slack_user_lists)
                }
            }
        })
    }

    function getSlackChannelIds(admin_data, callback) {
        let channel_ids = [];
        let url = "https://slack.com/api/im.list?token=" + admin_data[0].token;
        request(url, function(err, html) {
            if (err) {
                callback(err, null)
            } else {
                let result = JSON.parse(html.body);
                if (result['ims'] && result['ims'].length > 0) {
                    _.forEach(result['ims'], function(get_id) {
                        channel_ids.push(get_id);
                        callback(null, channel_ids);
                    })
                }
            }
        })
    }
}
const sendSlackMessageToUser = (channelid, message, admin_data, callback) => {
    let web = new WebClient(admin_data[0].token);
    web.chat.postMessage(channelid, message, function(err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, "Password reset Successfully. Check you slack for new password!!")
        }
    });
}

export default {
    getUserInfo,
    sendSlackMessageToUser
}