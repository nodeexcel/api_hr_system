import getAttendance from '../models/get_manual_attendance';
import approval from '../models/attendance_approval';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        getAttendance.manualUpdate(req, res).then(() => {}).catch((err) => { // gets all data manually entered by employees which is not reviewed
            res.json(err);
        })
    },

    approvalAction: (req, res, next) => {
        approval.approveUpdate(req, res).then((status) => { //approves or decline the manual attendance request
            res.json(status);
        }).catch((err) => {
            res.json(err)
        })
    }

}