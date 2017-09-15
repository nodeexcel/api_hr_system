import _ from 'lodash';

module.exports = {
    array_startyear_endyear: function(body, callback) {
        let startYear;
        let endYear;
        if (body.startYear && body.endYear) {
            startYear = body.startYear;
            endYear = body.endYear;
        } else if (body.startYear) {
            startYear = body.startYear;
            endYear = new Date().getFullYear();
        } else {
            startYear = new Date('2010-05-03').getFullYear();
            endYear = new Date().getFullYear()
        }
        endYear = parseInt(endYear) + 1;
        let arrayYear = _.range(startYear, endYear);

        callback(arrayYear);
    }
}