import db from '../db';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        db.manual_attendance.manualUpdateAttendance().then((data) => { // gets all data manually entered by employees which is not reviewed
            res.json({ "error": 0, "message": "", "data": data, })
        }).catch(err => next(err))
    },

    approvalAction: (req, res, next) => {
        db.manual_attendance.approveUpdatedAttendance(req.query, db, function(error, status) { //approves or decline the manual attendance request
            if (error) {
                next(error)
            } else {
                res.json({ "error": 0, "message": "", "data": status })
            }
        })
    }

}