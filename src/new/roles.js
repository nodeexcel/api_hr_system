import slack from './slack.js';
import db from '../db';
import api from './api.js';
import array from '../helper/array.js';
import constant from '../helper/constant.js';
import _ from 'lodash';

const getUserRole = (userid) => {
    return new Promise((resolve, reject) => {
        api.getUserInfo(userid).then((info) => {
            if (!(info[0][0].role_id) && _.isEmpty(info[0][0].role_id) || info[0][0].role_id == '') {
                getRoleCompleteDetails(info[0][0].role_id, function(roleCompleteDetails) {
                    resolve(roleCompleteDetails)
                });
            }
        });
    });
}

const getRoleCompleteDetails = (roleid, cb) => {
    db.roles.findAll({ where: { id: roleid } }).then((data) => {
        if (data) {
            getRolePages(roleid, function(pages) {
                data.role_pages = pages;
                getRoleActions(roleid, function(actions) {
                    data.role_actions = actions;
                    // getRoleNotifications(roleid, function(notifications) {
                    //     data.role_notifications = notifications;
                    // });
                    data.role_notifications = [];
                    cb(data)
                });
            })
        }
    })

}

const getRolePages = (roleid, cb) => {
    db.role_pages.findAll({ where: { role_id: roleid } }).then((data) => {
        if (data) {
            _.forEach(data, function(key, val) {
                _.forEach(array, function(val1) {
                    if (val1.id == val.page_id) {
                        val.page_name = val1.name;
                        data[key] = val
                    }
                })

            })
            cb(data)
        }
    })
}


const getRoleActions = (roleid, cb) => {
    db.roles_actions.findAll({ where: { role_id: roleid } }).then((data) => {
        if (data) {
            _.forEach(data, function(key, val) {
                getActionById(val.action_id, function(action) {
                    val.action_name = action.name;
                    data[key] = val;
                })
            })
        }
        cb(data)
    })
}
const getActionById = (id, cb) => {
    getAllActions(function(all) {
        _.forEach(all, function(val) {
            if (val.id == id) {
                cb(val)
            }
        })
    })

    function getAllActions(cb) {
        let array = [];
        _.forEach(array, function(val) {
            if (val.actions_list) {
                _.forEach(val.actions_list, function(val1) {
                    array.push(val1);
                })
            }
        })
        cb(array)
    }
}

const getRolePagesForSuperAdmin = (cb) => {
    getGenericPagesForAllRoles(function(returnArray) {
        _.forEach(array(), function(page, key) {
            let new_page = [];
            new_page.page_id = page.id;
            new_page.page_name = page.name;

            returnArray.push(new_page);
            if (key == array().length - 1) {
                cb(returnArray.sort())
            }
        });
    })
}
const getGenericPagesForAllRoles = (cb) => {
    let returnArray = [];
    _.forEach(array(), function(page, key) {
        let pid = page.id;
        if (pid == constant().PAGE_login || pid == constant().PAGE_logout || pid == constant().PAGE_policy_documents) {
            let new_page = [];
            new_page.page_id = page.id;
            new_page.page_name = page.name;
            returnArray.push(new_page);
        }
        if (key == array().length - 1) {
            cb(returnArray);
        }
    })
}
const getRolePagesForApiToken = (roleid, cb) => {
    getGenericPagesForAllRoles(function(returnArray) {
        getRolePages(roleid, function(rolePages) {
            if (rolePages) {
                _.forEach(rolePages, function(val) {
                    returnArray.push(val);
                })
            }
            cb(returnArray.sort())
        });
    })
}
const is_policy_documents_read_by_user = (userid, cb) => {
    NEW_getUserPolicyDocument(userid, function(allDocuments) {
        if (allDocuments.length > 0) {
            _.forEach(allDocuments, function(doc) {
                if (doc.read != 1) {
                    cb(false);
                }
            })
        } else {
            cb(true);
        }
    })


    function NEW_getUserPolicyDocument(userid, cb) {
        let returnArray = [];
        db.user_profile.findAll({ where: { user_Id: userid } }).then((data) => {
            let array0 = JSON.parse(data.policy_document);
            db.config.findAll({ where: { type: 'policy_document' } }).then((config_data) => {
                let array1 = JSON.parse(config_data.value);
                if (array0.length == 0) {
                    _.forEach(array1, function(val) {
                        val.read = 0;
                        returnArray.push(val);
                    })
                }
                if (array0.length > 0) {
                    _.forEach(array1, function(val) {
                        if (inArray(val.name, array0)) {
                            val.read = 1;
                            returnArray.push(val);
                        } else {
                            val.read = 0;
                            returnArray.push(val);
                        }
                    })
                }
                cb(returnArray)
            })
        })

        function inArray(needle, haystack) {
            let length = haystack.length;
            for (let i = 0; i < length; i++) {
                if (haystack[i] == needle) return true;
            }
            return false;
        }
    }
}
export default {
    getUserRole,
    getActionById,
    getRoleActions,
    getRolePages,
    getRoleCompleteDetails,
    getRolePagesForSuperAdmin,
    getGenericPagesForAllRoles,
    is_policy_documents_read_by_user,
    getRolePagesForApiToken

}