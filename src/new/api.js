import db from '../db';
import jwt from 'jwt-simple';
import constant from '../helper/constant.js';
import array from '../helper/array.js';
import config from '../../../config.json';
import slack from './slack.js';
import _ from 'lodash';
import request from 'request';
import md5 from 'md5';
import roles from './roles.js';
import moment from 'moment';

const login = (body) => {
    return new Promise((resolve, reject) => {
        let jwtToken = '';
        db.users.findOne({ where: { username: body.username, password: md5(body.password), status: "Enabled" } }).then((data) => {
            if (data) {
                getUserInfo(data.id).then((info) => {
                    if ((info[0][0].type).toLowerCase() != 'admin' && _.isEmpty(info[0][0].role_id) || info[0][0].role_id == '') {
                        resolve({ error: 1, message: "Role is not assigned. Contact Admin!", data: [] });
                    } else {
                        generateUserToken(info[0][0].user_Id, function(jwtToken) {
                            insertToken(info[0][0].user_Id, jwtToken, function() {
                                resolve({ error: 0, data: { token: jwtToken, userid: (info[0][0].user_Id).toString(), message: "Success Login" } })
                            });
                        });
                    }
                })
            } else {
                resolve({ error: 1, message: "Invalid Login", data: [] });
            }
        });
    })
}
const generateUserToken = (user_id, cb) => {
    let resultArray = [];
    getUserInfo(user_id).then((info) => {
        let userProfileImage = '';
        if (info.slack_profile.profile.image_192) {
            userProfileImage = info.slack_profile.profile.image_192;
        }
        let userRole = '';
        if (info) {
            if ((info[0][0].type).toLowerCase() === 'admin') {
                userRole = info[0][0].type;
                resultArray.id = info[0][0].user_Id;
                resultArray.username = info[0][0].username;
                resultArray.role = userRole;
                resultArray.name = info[0][0].name;
                resultArray.jobtitle = info[0][0].jobtitle;
                resultArray.profileImage = userProfileImage;
                resultArray.login_time = parseInt(Date.now() / 1000);
                resultArray.login_date_time = moment(new Date()).format('dd-MM-YYYY HH:mm:ss');
            } else {
                roles.getUserRole(info[0][0].user_Id).then((role) => {
                    if (role) {
                        userRole = role.name;
                    }
                    resultArray.id = info[0][0].user_Id;
                    resultArray.username = info[0][0].username;
                    resultArray.role = userRole;
                    resultArray.name = info[0][0].name;
                    resultArray.jobtitle = info[0][0].jobtitle;
                    resultArray.profileImage = userProfileImage;
                    resultArray.login_time = parseInt(Date.now() / 1000);
                    resultArray.login_date_time = moment(new Date()).format('dd-MM-YYYY HH:mm:ss');
                });
            }

            if ((info[0][0].type).toLowerCase() == 'admin') {
                resultArray.is_policy_documents_read_by_user = 1;
            } else {
                roles.is_policy_documents_read_by_user(info.user_Id, function(is_policy_documents_read_by_user) {
                    if (is_policy_documents_read_by_user == false) {
                        resultArray.is_policy_documents_read_by_user = 0;
                        roles.getGenericPagesForAllRoles('', function(role_pages) {
                            resultArray.role_pages = role_pages;
                        })
                    }
                })
            }
            if ((info[0][0].type).toLowerCase() == 'admin') {
                roles.getRolePagesForSuperAdmin(function(role_pages) {
                    resultArray.role_pages = role_pages;
                    // console.log(resultArray)
                    let jwtToken = jwt.encode(resultArray, config.secret);
                    insertToken(info[0][0].user_Id, jwtToken, function() {
                        cb(jwtToken)
                    });
                })
            } else {
                roles.getUserRole(info[0][0].user_Id).then((role) => {
                    if (role && typeof role.role_pages !== 'undefined') {
                        roles.getRolePagesForApiToken(role.id, function(role_pages) {
                            resultArray.role_pages = role_pages;
                            // console.log(resultArray)                            let jwtToken = jwt.encode(resultArray, config.secret);
                            insertToken(info[0][0].user_Id, jwtToken, function() {
                                cb(jwtToken)
                            });
                        })
                    }
                });
            }

        }
    })
}

const insertToken = (userid, token, cb) => {
    let creation_timestamp = parseInt((new Date().getTime()) / 1000);
    let creation_date_time = moment(new Date()).format('dd-MM-YYYY HH:mm:ss');
    db.login_tokens.create({ userid: userid, token: token, creation_timestamp: creation_timestamp, creation_date_time: creation_date_time }).then(() => {
        cb()
    })
}

const getUserInfo = (user_id) => {
    return new Promise((resolve, reject) => {
        db.sequelize.query("SELECT users.*, user_profile.*, roles.id as role_id, roles.name as role_name FROM users LEFT JOIN user_profile ON users.id = user_profile.user_id LEFT JOIN user_roles ON users.id = user_roles.user_id LEFT JOIN roles ON user_roles.role_id = roles.id where users.id = " + user_id).then((data) => {
            if (data) {
                slack.getSlackUserInfo(data[0][0].work_email, function(info) {
                    data.slack_profile = info;
                    resolve(data)
                });
            }

        })
    })
}

export default {
    login,
    insertToken,
    generateUserToken,
    getUserInfo
}
// function insertToken(callback) {}