import moment from 'moment';
import db from '../db';
import _ from 'lodash';

module.exports = {
    working_time_calculations: function(body, userid) {
        return new Promise((resolve, reject) => {
            if (body.user_id) {
                userid = body.user_id;
            }
            let output;
            let data = [];
            db.attendance.get_monthly_attendance(body.month, body.year, userid, function(monthly_data) { //time array for a id
                let month = new Date(Date.parse(body.month + " 1, 2012")).getMonth() + 1;
                let no_of_days = (moment(body.year + "-" + month, "YYYY-MM").daysInMonth()) + 1;
                let days_of_month = _.range(1, no_of_days);
                let daily = [];
                _.forEach(days_of_month, function(day) {
                    let entryTime = 0;
                    let exitTime = 0;
                    let start_entry = 0;
                    let active_hours = 0;
                    _.forEach(monthly_data, function(times) {
                        let date = moment((times).slice(0, -2)).format('DD');
                        if (day == date) {
                            if (entryTime) {

                                exitTime = new Date(times).getTime();
                                active_hours = active_hours + (exitTime - entryTime);
                                entryTime = 0;
                            } else {
                                if (start_entry) {
                                    entryTime = new Date(times).getTime();
                                } else {
                                    entryTime = new Date(times).getTime();
                                    start_entry = new Date(times).getTime();
                                }
                            }
                        }
                    })
                    daily.push({
                        day: (day + " " + moment(month, 'MM').format('MMMM')),
                        total_hours: { hours: _.floor(((exitTime - start_entry) / 3600000) % 24), minutes: _.floor(((exitTime - start_entry) / 60000) % 60), total_time: _.floor(((exitTime - start_entry) / 3600000) % 24) + "." + _.floor((_.floor(((exitTime - start_entry) / 60000) % 60) * 5) / 3) },
                        active_hours: { hours: _.floor((active_hours / 3600000) % 24), minutes: _.floor(((active_hours) / 60000) % 60), total_time: _.floor((active_hours / 3600000) % 24) + "." + _.floor((_.floor(((active_hours) / 60000) % 60) * 5) / 3) }
                    })
                });
                data.push({ user_id: userid, day_wise_detail: daily });
                output = { error: 0, message: "", data: data };
                resolve(output)
            })

        })
    },

    get_monthly_attendance: (date, user_id, callback) => {
        let month = moment().month(input_month).format("M");
        if ((month / 10) < 1) {
            month = "0" + month;
        }
        attendance.findAll({
            where: { timing: { $regexp: date + '.*' }, user_id: user_id },
        }).then((data) => {
            let timings = [];
            _.forEach(data, function(value) {
                let str = value.timing
                let timing = [str.substr(0, 19), str.substr(19)].join(' ');
                timings.push(timing);
            })
            let sortData = _.sortBy(timings, function(o) {
                return new moment(o);
            });
            callback(sortData);
        })

    },
}
