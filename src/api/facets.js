import model from '../models';
import formidable from "formidable";

module.exports = {

    attendance: (req, res, next) => {
        console.log("111")
        var form = new formidable.IncomingForm();
        console.log(form)
        model.fileUpload(form, req, res);
    }
};