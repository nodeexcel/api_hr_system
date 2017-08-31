import model from '../middleware';
import formidable from "formidable";

module.exports = {

    attendance: (req, res, next) => {
        var form = new formidable.IncomingForm();
        model.upload.fileUpload(form, req, res).then((status) => {
            res.json({ message: status })
        });
    }
}