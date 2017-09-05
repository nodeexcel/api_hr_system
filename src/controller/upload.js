import db from '../db';

module.exports = {

    attendance: (req, res, next) => {
        db.details.uploadAttendance(req, res).then((status) => {
            res.json({ message: status })
        }).catch(err => res.json(err))
    },

    attendanceByEmployee: (req, res, next) => {
        db.details.uploadAttendanceByUserId(req, res, db).then((status) => {
            res.json(status)
        }).catch(err => res.json(err))
    }

}