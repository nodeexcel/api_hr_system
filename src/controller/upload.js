import db from '../db';

module.exports = {

    attendance: (req, res, next) => {
        db.attendance.uploadAttendance().then((status) => {
            res.json(status)
        }).catch(err => res.json(err))
    },

    attendanceByEmployee: (req, res, next) => {
        db.attendance.uploadAttendanceByUserId(req.query, db).then((status) => {
            res.json(status)
        }).catch(err => res.json(err))
    }

}