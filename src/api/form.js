import model from '../middleware/fileupload';
import formidable from "formidable";

module.exports = {

    attendance: (req, res, next) => {
        var form = new formidable.IncomingForm();
        model.fileUpload(form, req, res);

    }
};