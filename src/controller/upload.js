import db from '../db';
import services from '../services';
import config from '../../../config.json';

module.exports = {

    attendance: (req, res, next) => {
        db.attendance.uploadAttendance().then((status) => { //uploads attendance fie in database
            res.json(status)
        }).catch(err => next(err))
    },

    attendanceByEmployee: (req, res, next) => {
        let data = JSON.parse(req.body);
        db.attendance.uploadAttendanceByUserId(data, db).then((status) => { //uploads attendance  by employees in manual_attenance table
            services.slack.slack_notify(config.approvedRequest, { type: 'user', id: body.id })
            res.json(status)
        }).catch(err => {
            services.slack.slack_notify(config.rejectRequest, { type: 'user', id: body.id })
            next(err)
        })
    }

}