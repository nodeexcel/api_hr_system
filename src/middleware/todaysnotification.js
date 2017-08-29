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
            _.forEach(model.user_complete_data, function(value) {
                var flagtime = 0;
                var absent = 0;
                _.forEach(presentEmployee, function(presentEmp) {
                    if (value.user_id == presentEmp.user_id) {
                        absent = 1;
                        present_employees.push(value);
                        if (flagtime == 0) {
                            var entryTime = moment(presentEmp.timing).format("hh:mm:ss a")
                            flagtime = 1;
                            var entryString;
                            if (moment(entry, 'hh:mm a').isAfter(moment("01-01-2016 10:30:00 AM", 'hh:mm a'))) {
                                entryString = entryString + value.name + ": Todays Entry Time: " + entryTime;
                            }
                        }
                        var prevDate = moment(date).subtract(1, 'day');
                        var day = prevDate.format('dddd');
                        var leaveMsg;
                        models.time.getTimeArray(prevDate).then((prevData) => {
                            var flag = 0;
                            var flagPrevDayTime = 0;
                            var timeString;
                            _.forEach(prevData, function(response) {
                                if (response.user_id == present_employees.user_id) {
                                    flag = 1;
                                    if (flagPrevDayTime == 1) {
                                        var entryTimePrevDay = moment(prevData.timing).format("HH:mm:ss a")
                                        flagPrevDayTime = 1;
                                    } else {
                                        var exitTimePrevDay = moment(prevData.timing).format("HH:mm:ss a")
                                    }
                                    timeString = timeString + "On " + prevDate + " Your Entry time : " + entryTimePrevDay + "Exit time : " + exitTimePrevDay;
                                    var totalOfficeHours = (entryTimePrevDay.getTime() - exitTimePrevDay.getTime());
                                    if (totalOfficeHours < 32400000) {
                                        ifLate = ifLate + " compensate" + moment.utc(32400000 - totalOfficeHours).format("HH:mm");
                                    }
                                }
                                if (flag == 0) {
                                    if (prevData.name != "Admin") {
                                        leaveMsg = leaveMsg + prevData.name + ":  was absent on " + day;
                                        var leave = models.leave.getleaveinfo(prevData.user_id, prevDate);
                                        if (leave == 1) {
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
                if (absent == 0) {
                    if (value.name != "Admin") {
                        leaveMsg = leaveMsg + value.name + ":  Did not Come Yet! ";
                        var leave = models.leave.getleaveinfo(value.user_id, date);
                        if (leave == 1) {
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