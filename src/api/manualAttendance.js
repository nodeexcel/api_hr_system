import model from '../middleware';

module.exports = {

    manualUpdatedAttendance: (req, res, next) => {
        model.get_manual_attendance.manualUpdate(req, res).then(() => {}).catch((err) => {
            res.json(err);
        })
    },

    approovalAction: (req, res, next) => {
        model.approoval.approoveUpdate(req, res).then((status) => {
            res.json(status);
        }).catch((err) => {
            res.json(err)
        })
    }

}