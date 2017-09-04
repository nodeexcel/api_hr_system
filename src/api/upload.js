import service from '../services';

module.exports = {

    attendance: (req, res, next) => {
        service.upload.uploadAttendance(req, res).then((status) => {
            res.json({ message: status })
        }).catch((err) => {
            res.json(err);
        })
    },

    attendanceByEmployee: (req, res, next) => {
        service.upload.uploadAttendanceByUserId(req, res).then((status) => {
            res.json(status)
        }).catch((err) => {
            res.json(err);
        })
    }

}