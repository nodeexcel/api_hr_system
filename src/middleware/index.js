import helper from '../helper';
import db from '../db';

module.exports = {
    verifyUserAction: function(req, res, next) {
        let data = JSON.parse(req.body);
        helper.verify.verifyToken(data.token).then((user_id, action_list) => {
            helper.verify.verifyAction(data.action, action_list, function(err, responses) {
                if (err) {
                    res.status(err);
                } else {
                    next()
                }
            })
        }).catch(err => reject(err));
    }
}