import model from '../middleware';

module.exports = {

    attendance: (req, res, next) => {
        model.upload.uploadAttendance(req, res).then((status) => {
            res.json({ message: status })
        }).catch((err) => {
            res.json(err);
        })
    },

    attendanceByEmployee: (req, res, next) => {
        model.upload.uploadAttendanceByUserId(req, res).then((status) => {
            res.json(status)
        }).catch((err) => {
            res.json(err);
        })
    }

}