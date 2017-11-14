import _ from 'lodash';
import request from 'request';
import db from '../db';

const getSlackUserInfo = (emailid, cb) => {
    let res = '';
    getSlackUsersList(function(allSlackUsers) {
        if (allSlackUsers.length > 0) {
            _.forEach(allSlackUsers, function(val) {
                if (val.profile && val.profile.email == emailid) {
                    res = val;
                    cb(res)
                }
            })
            cb(res);
        }
    });

    function getSlackChannelIds() {
        return new Promise((resolve, reject) => {
            let channelIds = [];
            db.admin.find({}).then((data) => {
                if (data) {
                    let channelUrl = `https://slack.com/api/im.list?token=${data.token}`;
                    let html = '';
                    request(channelUrl, function(error, response, body) {
                        if (body) {
                            html = JSON.parse(body);
                        }
                        if (html) {
                            if (html.ims && (html.ims).length > 0) {
                                _.forEach(html.ims, function(val) {
                                    channelIds.push(val.id)
                                })
                                resolve(channelIds)
                            }
                        }
                    });
                }
            })
        })
    }




    function getSlackUsersList(cb) {
        let res = [];
        let memeberUrl = '';
        let html = '';
        let slackChannelIdsLists = [];
        db.admin.find({}).then((data) => {
            if (data) {
                getSlackChannelIds().then((channelIds) => {
                    _.forEach(channelIds, function(val) {
                        slackChannelIdsLists.push(val);
                    })
                    memeberUrl = "https://slack.com/api/users.list?client_id=" + data.client_id + "&token=" + data.token + "&client_secret=" + data.client_secret;
                    request(memeberUrl, function(error, response, body) {
                        if (body) {
                            html = JSON.parse(body);
                        }
                        if (html) {
                            if (html.members && (html.members).length > 0) {
                                _.forEach(html.members, function(val) {
                                    let slack_channel_id_info = [];
                                    let slack_channel_id = '';
                                    _.forEach(slackChannelIdsLists, function(chid) {
                                        if (val.id == chid.user) {
                                            slack_channel_id = chid.id;
                                            slack_channel_id_info.push(chid);
                                            return false;
                                        }
                                    })
                                    val.slack_channel_id_info = slack_channel_id_info;
                                    val.slack_channel_id = slack_channel_id;
                                    res.push(val);
                                })
                                cb(res)
                            }
                        }
                    });
                });
            }

        })
    }
}
export default {
    getSlackUserInfo
}