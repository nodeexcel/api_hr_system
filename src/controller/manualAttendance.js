import db from '../db';
import services from '../services';
import config from '../../../config.json';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        db.manual_attendance.manualUpdateAttendance().then((data) => { // gets all data manually entered by employees which is not reviewed
            res.json({ "error": 0, "message": "", "data": data, })
        }).catch(err => next(err))
    },

    approvalAction: (req, res, next) => {
        db.manual_attendance.approveUpdatedAttendance(req.body, db, function(error, status) { //approves or decline the manual attendance request
            if (error) {
                services.slack.slack_notify(config.reject, { type: 'user', id: body.id })
                next(error)
            } else {
                services.slack.slack_notify(config.approved, { type: 'user', id: body.id })
                res.json({ "error": 0, "message": "", "data": status })
            }
        })
    }

}