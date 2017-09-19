import helper from '../helper';
import db from '../db';

module.exports = {
    verifyUserAction: function(req, res, next) {
        console.log("vfsdgfkjsdhlkfjsdlk")
        console.log(req.headers[2])
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