import upload from '../models/attendance_upload';

module.exports = {

    attendance: (req, res, next) => {
        upload.uploadAttendance(req, res).then((status) => {
            res.json({ message: status })
        }).catch((err) => {
            res.json(err);
        })
    },

    attendanceByEmployee: (req, res, next) => {
        upload.uploadAttendanceByUserId(req, res).then((status) => {
            res.json(status)
        }).catch((err) => {
            res.json(err);
        })
    }

}