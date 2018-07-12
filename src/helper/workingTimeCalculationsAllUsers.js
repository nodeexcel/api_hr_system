import moment from 'moment';
import db from '../db';
import config from '../../../config.json'
import _ from 'lodash';

module.exports = {

    get_user_month_work_time: function ( Iyear, Imonth, Iuserid, callback ){
        db.attendance.get_monthly_attendance(Imonth, Iyear, Iuserid, function(monthly_data) {
            let ret = [];
            if( monthly_data.length == 0 ){
                
            } else {
                let month = moment().month(Imonth).format("M");
                let no_of_days = (moment(Iyear + "-" + month, "YYYY-MM").daysInMonth()) + 1;
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
                    ret.push({
                        day: (day + " " + moment(month, 'MM').format('MMMM')),
                        total_hours: { hours: _.floor(((exitTime - start_entry) / 3600000) % 24), minutes: _.floor(((exitTime - start_entry) / 60000) % 60), total_time: _.floor(((exitTime - start_entry) / 3600000) % 24) + "." + _.floor((_.floor(((exitTime - start_entry) / 60000) % 60) * 5) / 3) },
                        active_hours: { hours: _.floor((active_hours / 3600000) % 24), minutes: _.floor(((active_hours) / 60000) % 60), total_time: _.floor((active_hours / 3600000) % 24) + "." + _.floor((_.floor(((active_hours) / 60000) % 60) * 5) / 3) }
                    })
                });
            }
            callback( ret );
        })
    },

    start_getting_users_work_time: function ( users, year, month, returnData, callback ) {
        if( users.length == 0 ){
            callback( returnData )
        } else {
            var userDetails = users[0]
            users.splice(0, 1)
            var T = this;
            var user_Id = userDetails.user_Id
            var name = userDetails.name;
            this.get_user_month_work_time( year, month, user_Id, function( userData ){
                var d = {
                    user_id: user_Id,
                    name: name,
                    data: userData
                }
                returnData.push( d );
                T.start_getting_users_work_time( users, year, month, returnData, callback  )
            })
        }
    },

    working_time_calculations_all_users: function(usersList, year, month ) {
        month = "Jun"
        year ="2018"
        return new Promise((resolve, reject) => {
            var returnData = [];
            this.start_getting_users_work_time( usersList, year, month ,returnData, function( finalData ) {
                var output = { error: 0, message: "", data: finalData };
                resolve(output)
            })
        })
    }
}