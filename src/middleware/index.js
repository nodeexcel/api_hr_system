import helper from '../helper';
import db from '../db';

module.exports = {
    verifyUserAction: function(req, res, next) {
        helper.verify.verifyToken(req.body.token).then((user_id, action_list) => {
            helper.verify.verifyAction(req.body.action, action_list, function(err, responses) {
                if (err) {
                    res.status(err);
                } else {
                    next()
                }
            })
        }).catch(err => reject(err));
    }
}