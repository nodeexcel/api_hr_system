import moment from 'moment';

module.exports = {
    timeConvertion: function(date, entry, exit, callback) { // converts time and date entered by user in required format
        let entryTime = moment(date).format("MM-DD-YYYY") + " " + moment(entry, ["h:mm:ss A"]).format("hh:mm:ssA");
        let exitTime = moment(date).format("MM-DD-YYYY") + " " + moment(exit, ["h:mm:ss A"]).format("hh:mm:ssA");

        callback(entryTime, exitTime);
    }
}