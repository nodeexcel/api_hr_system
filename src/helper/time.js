import moment from 'moment';

module.exports = {
    timeConvertion: function(date, entry, exit, callback) {
        var entryTime = date + " " + moment(entry, ["h:mm:ss A"]).format("HH:mm:ss");
        entryTime = entryTime.replace(/\-/g, '/');
        var exitTime = date + " " + moment(exit, ["h:mm:ss A"]).format("HH:mm:ss");
        exitTime = exitTime.replace(/\-/g, '/');
        callback(entryTime, exitTime);
    }
}