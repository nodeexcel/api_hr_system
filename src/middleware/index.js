import helper from '../helper';
import db from '../db';

module.exports = {
    verifyUserAction: function(req, res, next) {
        helper.verify.verifyToken(req.token).then((user_id, action_list) => {
            helper.verify.verifyAction(req.action, action_list, function(err, responses) {
                if (err) {
                    res.json({ "error": 1, "message": err })
                } else {
                    next()
                }
            })
        }).catch(err => reject(err));
    }
}