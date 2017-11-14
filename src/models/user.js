import _ from 'lodash';
import db from '../db';
import request from "request";
import md5 from "md5";
import slack from '../service/slack.js';
import generate_password from '../service/generate_password.js';
let WebClient = require('@slack/client').WebClient;

export default function(sequelize, DataTypes) {
    let users = sequelize.define('users', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        username: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING }
    }, {
        timestamps: false,
        freezeTableName: true
    }, {
        associate: (model) => {
            users.hasOne(user_profile, { foreignKey: 'user_id' })
        }
    });

    users.get_enabled_users = (callback) => {
        users.findAll({ where: { status: "Enabled" } }).then((data) => {
            callback(data)
        })
    }

    users.forgot_password = function(req, db) {
        return new Promise((resolve, reject) => {
            if (req.body.username == "global_guest") {
                reject("You don't have permission to reset password !!")
            } else {
                db.users.find({ where: { username: req.body.username } }).then((data) => {
                    let userid = data.id
                    if (!data) {
                        reject("user not exist");
                    } else {
                        if (data.type != "Employee") {
                            reject("You can't reset pasword. Contact Admin.!")
                        } else if (data.status != "Enabled") {
                            reject("Employee is disabled!!")
                        } else {
                            let newPassword;
                            generate_password._randomString(function(result) {
                                newPassword = result;
                            });
                            db.users.update({ password: md5(newPassword) }, { where: { username: req.body.username } }).then((updated) => {
                                db.admin.findAll({}).then((admin_data, err) => {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        slack.getUserInfo(userid, admin_data, function(err, userInfo) {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                let userInfo_name = userInfo.name;
                                                let message_to_user = "Hi " + userInfo_name + "!!  \n Your new password for HR portal is : " + newPassword;
                                                let slack_userChannelid = userInfo.slack_profile.id;
                                                slack.sendSlackMessageToUser(slack_userChannelid, message_to_user, admin_data, function(err, message) {
                                                    if (err) {
                                                        reject(err);
                                                    } else {
                                                        let msg_sent = message;
                                                        resolve(msg_sent)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    }
                })
            }
        })
    }
    return users;
}