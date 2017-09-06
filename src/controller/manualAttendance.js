import db from '../db';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        db.manual_attendance.manualUpdateAttendance().then((data) => { // gets all data manually entered by employees which is not reviewed
            res.json({ data: data })
        }).catch(err => res.json(err))
    },

    approvalAction: (req, res, next) => {
        db.manual_attendance.approveUpdatedAttendance(req.query, res, db, function(status) { //approves or decline the manual attendance request
            res.json({ message: status });
        })
    }

}