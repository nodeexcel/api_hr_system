import model from '../middleware';

module.exports = {

    attendance: (req, res, next) => {
        model.upload.uploadAttendance(req, res).then((status) => {
            res.json({ message: status })
        });
    }

}