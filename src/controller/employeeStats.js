import db from '../db';
import helper from '../helper';

module.exports = {

    graphStats: (req, res, next) => {
        db.user_profile.employeeGraphStats(db).then((data) => { // uploads attendance  by employees in manual_attenance table
            res.json(data)
        }).catch(err => next(err))
    },

    joiningTerminatiionStats: (req, res, next) => {
        let data = JSON.parse(req.body);
        db.user_profile.yearly_joining_termination_stats(data).then((data) => { //stats for yearly termination and joining
            res.json(data)
        }).catch(err => next(err))
    },

    EmployeeHours: (req, res, next) => {
        let data = JSON.parse(req.body);
        db.attendance.get_employee_hours(data, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    monthlyReport: (req, res, next) => {
        // let data = JSON.parse(req.body);
        helper.monthly_reports.working_time_calculations(req.body, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    }
}