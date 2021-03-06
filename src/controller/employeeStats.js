import db from '../db';
import helper from '../helper';
import path from 'path';

module.exports = {

    graphStats: (req, res, next) => {
        db.user_profile.employeeGraphStats(db).then((data) => { // uploads attendance  by employees in manual_attenance table
            res.json(data)
        }).catch(err => next(err))
    },

    joiningTerminatiionStats: (req, res, next) => {
        db.user_profile.yearly_joining_termination_stats(req.body).then((data) => { //stats for yearly termination and joining
            res.json(data)
        }).catch(err => next(err))
    },

    EmployeeHours: (req, res, next) => {
        db.attendance.get_employee_hours(req.body, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    monthlyReport: (req, res, next) => {
        helper.monthly_reports.working_time_calculations(req.body, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    abc: (req, res, next) => {
        res.sendFile(path.join(__dirname + '/form.html'));
    },

    monthlyPerformance: (req, res, next) => {
        db.attendance.get_monthly_performance(req.body, db).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    list: (req, res, next) => {
        db.user_profile.user_list(db).then((data) => { // uploads attendance  by employees in manual_attenance table
            res.json(data)
        }).catch(err => next(err))
    },

    monthlyReportAllUsers: (req, res, next) => {
        db.user_profile.user_list(db).then((usersList) => { // uploads attendance  by employees in manual_attenance table
            if( usersList.data && usersList.data.length > 0 ){
                helper.monthly_reports_all_users.working_time_calculations_all_users(usersList.data, req.body.year, req.body.month ).then((data) => {
                    res.json(data)
                }).catch(err => next(err))
            } else {
                res.json({ error: 1, message: "No user found", data: "" })
            }
        }).catch(err => next(err))
    },
}