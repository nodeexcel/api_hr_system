import db from '../db';

module.exports = {

    graphStats: (req, res, next) => {
        console.log("1")
        db.user_profile.employeeGraphStats(db).then((data) => { //uploads attendance  by employees in manual_attenance table
            console.log("2")
            res.json(data)
        }).catch(err => next(err))
    }

}