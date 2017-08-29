import model from '../db';
import moment from "moment";

module.exports = {

    getTimeArray: function(date, hr = false) {
        return new Promise((resolve, reject) => {
            var final = [];
            date = moment(date).format('MM/DD/YYYY').replace(/\//g, "-");
            date = "08-16-2017";
            //fetched data of all present employees
            model.details.findAll({ where: { timing: { "$like": "%" + date + "%" } } }).then((data) => {
                resolve(data)
            })
        })
    }
}