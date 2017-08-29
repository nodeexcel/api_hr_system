import moment from "moment";

module.exports = {

    getDatesBetweenTwoDates: function(startDate, endDate) {
        var start = startDate;
        var days = [];
        days.push(startDate)
        var i = 1;
        if (startDate.getTime() < endDate.getTime()) {
            (function loop() {
                if (start.getTime() < endDate.getTime()) {
                    start = moment(startDate, 'MM/DD/YYYY').add(1, 'days');
                    days.push(start);
                    i++;
                    loop();
                }
            }());
        }
        return days;
    }
}