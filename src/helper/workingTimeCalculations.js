import moment from 'moment';
import db from '../db';
import _ from 'lodash';

module.exports = {
    working_time_calculations: function(body) {
        return new Promise((resolve, reject) => {
            let output;
            db.users.get_enabled_users(function(enabled_users) {
                let data = [];
                let count = 1;
                _.forEach(enabled_users, function(emp) {
                    let employee = [];
                    db.attendance.get_monthly_attendance(body.month, body.year, emp.id, function(monthly_data) { //time array for a id
                        let month = moment().month(body.month).format("M");
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
                                day: (day + "-" + body.month),
                                total_hours: { hours: _.floor(((exitTime - start_entry) / 3600000) % 24), minutes: _.floor(((exitTime - start_entry) / 60000) % 60) },
                                active_hours: { hours: _.floor((active_hours / 3600000) % 24), minutes: _.floor(((active_hours) / 60000) % 60) }
                            })
                        });
                        employee.push({ Name: emp.id, day_wise_detail: daily });
                        data.push(employee);
                        output = { status: 0, data: data };
                        if (count == Object.keys(enabled_users).length) {
                            resolve(output)
                        } else {
                            count++;
                        }
                    })

                })
            })
        })
    },
}