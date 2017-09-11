import db from '../db';

module.exports = {

    attendance: (req, res, next) => {
        db.attendance.uploadAttendance().then((status) => { //uploads attendance fie in database
            res.json(status)
        }).catch(err => next(err))
    },

    attendanceByEmployee: (req, res, next) => {
        let data = JSON.parse(req.body);
        db.attendance.uploadAttendanceByUserId(data, db).then((status) => { //uploads attendance  by employees in manual_attenance table
            res.json(status)
        }).catch(err => next(err))
    }

}