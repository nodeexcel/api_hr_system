import model from '../db';
import _ from 'lodash';
import dates from './datesbetween';

module.exports = {

    getleaveinfo: function(userid, date) {
        var result = 0;
        var month = date.format('MM');
        var year = date.format('YYYY');
        var list = [];

        model.leavesRecords.findAll({ where: { user_id: userid } }).then((data) => {
            _.forEach(data, function(leave) {
                pp_start = leave['from_date'];
                pp_end = leave['to_date'];
                var datesBetween = dates.getDatesBetweenTwoDates(pp_start, pp_end);


                _.forEach(datesBetween, function(day) {
                    h_month = day.format('MM');
                    h_year = day.format('YYYY');

                    if (h_year == year && h_month == month) {
                        list.push(day);
                    }

                });
                _.forEach(list, function(value) {
                    if (date == value) {
                        result = 1;
                    }

                    return result;
                });
            });
        })
    }
}