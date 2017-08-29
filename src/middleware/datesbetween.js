import moment from "moment";

module.exports = {

    getDatesBetweenTwoDates: function(startDate, endDate) {
        var start = startDate;
        var days = [];
        days.push(startDate)
        var i = 1;
        if (startDate.getTime() < endDate.getTime()) { //  checking start date is less than end date of leave
            (function loop() {
                if (start.getTime() < endDate.getTime()) {
                    start = moment(startDate, 'MM/DD/YYYY').add(1, 'days');
                    days.push(start); // add date to aaray of days of leave
                    i++;
                    loop();
                }
            }());
        }
        return days;
    }
}