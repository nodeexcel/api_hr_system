import db from '../db';

module.exports = {

    attendance: (req, res, next) => {
        db.attendance.uploadAttendance().then((status) => { //uploads attendance fie in database
            res.json({ "error": 0, "message": status, "data": "" })
        }).catch(err => next(err))
    },

    attendanceByEmployee: (req, res, next) => {
        db.attendance.uploadAttendanceByUserId(req.query, db).then((status) => { //uploads attendance  by employees in manual_attenance table
            res.json({ "error": 0, "message": status, "data": "" })
        }).catch(err => next(err))
    }

}