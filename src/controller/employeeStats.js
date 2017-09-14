import db from '../db';

module.exports = {

    graphStats: (req, res, next) => {
        db.user_profile.employeeGraphStats(db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    EmployeeHours: (req, res, next) => {
        db.attendance.get_employee_hours(req.body, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    }

}