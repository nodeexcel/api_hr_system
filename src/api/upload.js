import model from '../middleware';

module.exports = {

    attendance: (req, res, next) => {
        console.log("hello")
        model.upload.fileUpload(req, res).then((status) => {
            res.json({ message: status })
        });
    }

}