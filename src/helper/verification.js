import _ from 'lodash';
import config from '../../config.json';
import jwt from 'jwt-simple';

module.exports = {
    verifyToken: function(token) {
        return new Promise((resolve, reject) => {
            let decode_token = jwt.decode(token, config.secret)
            let action_list = [];
            resolve(decode_token.user_id, action_list)
        }).catch(err => reject(err));
    },

    verifyAction: function(action, action_list, callback) {
        _.forEach(action_list, function(actions) {
            if (actions == action) {
                callback("", "verified")
            }
        })
        callback("", "verified")

    }
}