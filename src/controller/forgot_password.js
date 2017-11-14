import db from '../db';

module.exports = {

    change_password: (req, res, next) => {
        db.users.forgot_password(req, db).then((data) => { // gets all data manually entered by employees which is not reviewed
            res.json({ "error": 0, "message": data })
        }).catch(err => next(err))
    }
}