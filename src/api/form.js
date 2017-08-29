import model from '../middleware';
import formidable from "formidable";

module.exports = {

    attendance: (req, res, next) => {
        var form = new formidable.IncomingForm();
        model.upload.fileUpload(form, req, res).then((status) => {
            console.log(status)
            model.reader.fileReader(res).then((data) => {
                console.log("ss")
                console.log(data);
                var date = new Date();
                model.time.getTimeArray(date).then((response) => {
                    if (!response) {
                        res.json("Please Upload updated attendance sheet");
                    }
                    model.notify.todayNotify(date, response);
                })
            })

        })
    }
};