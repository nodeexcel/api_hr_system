import _ from 'lodash';
import config from '../../config.json';
import jwt from 'jwt-simple';

module.exports = {
    verifyToken: function(token) {
        return new Promise((resolve, reject) => {
            let decode_token = jwt.decode(token, config.secret)
            resolve(decode_token.user_id, decode_token.action_list)
        }).catch(err => reject(err));
    },

    verifyAction: function(action, action_list, callback) {
        _.forEach(action_list, function(actions) {
            if (actions == action) {
                callback("", "verified")
            }
        })
        callback("HTTP/1.1 401 Unauthorized", "")

    }
}