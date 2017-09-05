import db from '../db';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        db.manual_attendance.manualUpdateAttendance(req, res).then((data) => { // gets all data manually entered by employees which is not reviewed
            res.json(data)
        }).catch(err => res.json(err))
    },

    approvalAction: (req, res, next) => {
        db.manual_attendance.approveUpdatedAttendance(req, res, db, function(status) { //approves or decline the manual attendance request
            res.json(status);
        })
    }

}