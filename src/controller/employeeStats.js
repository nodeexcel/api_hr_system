import db from '../db';

module.exports = {

    graphStats: (req, res, next) => {
        db.user_profile.employeeGraphStats().then((data) => { // uploads attendance  by employees in manual_attenance table
            res.json(data)
        }).catch(err => next(err))
    }

}