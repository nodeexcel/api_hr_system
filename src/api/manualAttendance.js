import service from '../services';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        service.get_manual_attendance.manualUpdate(req, res).then(() => {}).catch((err) => { // gets all data manually entered by employees which is not reviewed
            res.json(err);
        })
    },

    approvalAction: (req, res, next) => {
        service.approval.approveUpdate(req, res).then((status) => { //approves or decline the manual attendance request
            res.json(status);
        }).catch((err) => {
            res.json(err)
        })
    }

}