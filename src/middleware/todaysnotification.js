import model from '../db';
import models from '../middleware';
import _ from 'lodash';
import moment from "moment";

module.exports = {

    todayNotify: function(date, presentEmployee) {
        return new Promise((reslove, reject) => {
            var present_employees = [];
            date = moment(date).subtract(1, 'day');
            date = moment(date).format('MM/DD/YYYY').replace(/\//g, "-");
            _.forEach(model.user_complete_data, function(value) { // fetched complete data of all employees
                var flagtime = 0;
                var absent = 0;
                _.forEach(presentEmployee, function(presentEmp) {
                    if (value.user_id == presentEmp.user_id) { // checking emp present or absent
                        absent = 1;
                        present_employees.push(value);
                        if (flagtime == 0) {
                            var entryTime = moment(presentEmp.timing).format("hh:mm:ss a")
                            flagtime = 1;
                            var entryString; // string for entry timing of present employees
                            if (moment(entry, 'hh:mm a').isAfter(moment("01-01-2016 10:30:00 AM", 'hh:mm a'))) { // checking for late coming employees
                                entryString = entryString + value.name + ": Todays Entry Time: " + entryTime;
                                // will check for late from databse here
                            }
                        }
                        var prevDate = moment(date).subtract(1, 'day'); // previous date
                        var day = prevDate.format('dddd');
                        var leaveMsg;
                        models.time.getTimeArray(prevDate).then((prevData) => { // get all data from prev date
                            var flag = 0;
                            var flagPrevDayTime = 0;
                            var timeString;
                            _.forEach(prevData, function(response) {
                                if (response.user_id == present_employees.user_id) { // check if emp was present yestreday or not
                                    flag = 1; //
                                    if (flagPrevDayTime == 1) { // if present fetch entry time and exit time
                                        var entryTimePrevDay = moment(prevData.timing).format("HH:mm:ss a")
                                        flagPrevDayTime = 1;
                                    } else {
                                        var exitTimePrevDay = moment(prevData.timing).format("HH:mm:ss a")
                                    } // string for previous dy work hours
                                    timeString = timeString + "On " + prevDate + " Your Entry time : " + entryTimePrevDay + "Exit time : " + exitTimePrevDay;
                                    var totalOfficeHours = (entryTimePrevDay.getTime() - exitTimePrevDay.getTime());
                                    if (totalOfficeHours < 32400000) { // check ig have to compensate or not
                                        ifLate = ifLate + " compensate" + moment.utc(32400000 - totalOfficeHours).format("HH:mm");
                                    }
                                }
                                if (flag == 0) { // if absent yesterday
                                    if (prevData.name != "Admin") {
                                        leaveMsg = leaveMsg + prevData.name + ":  was absent on " + day; // string for leave
                                        var leave = models.leave.getlLeaveInfo(prevData.user_id, prevDate);
                                        if (leave == 1) { // checking if leave applied or not
                                            leaveMsg = leaveMsg + " (Leave Applied)\n";
                                        } else {
                                            leaveMsg = leaveMsg + " (Leave Not Applied)\n";
                                        }
                                    }
                                }
                            })
                        })
                    }
                })
                if (absent == 0) { // if absent today
                    if (value.name != "Admin") {
                        leaveMsg = leaveMsg + value.name + ":  Did not Come Yet! ";
                        var leave = models.leave.getlLeaveInfo(value.user_id, date);
                        if (leave == 1) { // checking if leave applied or not
                            leaveMsg = leaveMsg + " (Leave Applied)\n";
                        } else {
                            leaveMsg = leaveMsg + " (Leave Not Applied)\n";
                        }
                    }
                }
            })
        })
    }
}