import path from "path";
import fs from "fs";
import _ from 'lodash';
import config from '../../../config.json'
import moment from 'moment';
import helper from '../helper';

export default function(sequelize, DataTypes) {
    let attendance = sequelize.define('attendance', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    attendance.uploadAttendance = function() {
            return new Promise((resolve, reject) => {
                let oldpath = config.path;
                let newpath = path.join(__dirname, './uploads/AGL_001.TXT');
                fs.rename(oldpath, newpath, function(err) { //stores file to new path in upload folder
                    if (err) reject(err);
                    else {
                        helper.attendance.readFile(newpath, function(response) {
                            attendance.bulkCreate(response).then((data) => { // insert data into database
                                fs.unlink(newpath);
                                resolve({ "error": 0, "message": config.fileSuccessMsg, "data": "" });
                            }).catch(err => reject(err))
                        })
                    }

                })
            })
        },

        attendance.uploadAttendanceByUserId = (body, db) => {
            return new Promise((resolve, reject) => {
                helper.time.timeConvertion(body.date, body.entry_time, body.exit_time, function(entryTime, exitTime) { //converts date and time in required format
                    attendance.findOne({ where: { user_id: body.userid } }).then((data) => { //fetching all record for user id
                        let errorCode = 0;
                        if (data.length != 0) {
                            _.forEach(data, function(employee) {
                                if (employee.timing == entryTime || employee.timing == exitTime) { //comparing each fileterd entry with input time for entry and exit
                                    errorCode = 1;
                                    reject(config.recordExists)
                                }
                            })
                            if (!errorCode) { //checking for error code
                                db.manual_attendance.create({ user_id: body.userid, timing: entryTime, reason: body.reason }).then(() => { //updating entry and exit time
                                    db.manual_attendance.create({ user_id: body.userid, timing: exitTime, reason: body.reason }).then(() => {
                                        resolve({ "error": 0, "data": "", "message": config.success, "reason": body.reason })
                                    }).catch(err => reject(err))
                                })
                            }
                        } else {
                            reject(config.errMsg1)
                        }
                    }).catch(err => reject(err))
                })
            })
        },

        attendance.get_employee_hours = (body, db) => {
            return new Promise((resolve, reject) => {
                if (body.user_id != 'null' && body.user_id != 0) {
                    attendance.get_monthly_attendance(body.month, body.year, body.user_id, function(data) {
                        let no_of_days = (moment(body.year + "-" + body.month, "YYYY-MM").daysInMonth()) + 1;
                        let days_of_month = _.range(1, no_of_days);
                        let entryArray = [];
                        let exitArray = [];
                        _.forEach(days_of_month, function(day) {
                            let entryTime = 0;
                            let exitTime = 0;
                            _.forEach(data, function(value) {
                                let str = value;
                                let date = moment([str.substr(0, 19), str.substr(19)].join(' ')).format('DD');
                                if (date == day) {
                                    let timing = [str.substr(0, 19), str.substr(19)].join(' ');
                                    if (entryTime) {
                                        exitTime = new Date((timing)).getTime();
                                    } else {
                                        entryTime = new Date(timing).getTime();
                                    }
                                }
                            })
                            entryArray.push(entryTime);
                            exitArray.push(exitTime);
                        })
                        let daily_hours = [];
                        _.forEach(days_of_month, function(day) {

                            let diff = exitArray[day - 1] - entryArray[day - 1];
                            diff = diff / 1000 / 60;
                            daily_hours.push({
                                day: day + " " + body.month,
                                working_time: { hours: _.floor(diff / 60), minutes: _.floor(diff % 60) },
                                total_time: _.floor(diff / 60) + "." + _.floor((_.floor(diff % 60) * 5) / 3)
                            });
                        });
                        resolve({ error: 0, message: "", data: daily_hours })
                    })
                } else {
                    reject({ error: 1, message: config.errMsg1, data: "" })
                }

            })
        },

        attendance.get_monthly_attendance = (input_month, year, user_id, callback) => {
            let month = new Date(Date.parse(input_month + " 1, 2012")).getMonth() + 1;
            if ((month / 10) < 1) {
                month = "0" + month;
            }
            attendance.findAll({
                where: { timing: { $regexp: month + '-.*-' + year }, user_id: user_id },
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

        attendance.get_monthly_performance = (body, db) => {
            return new Promise((resolve, reject) => {
                attendance.get_enabled_users_performance(body, db, function(totalHrs, activeHrs) {
                    let month = moment().month(body.month).format("M");
                    let no_of_days = (moment(body.year + "-" + month, "YYYY-MM").daysInMonth()) + 1;
                    let days_of_month = _.range(1, no_of_days);
                    let daily = [];
                    let performance = [];

                    _.forEach(days_of_month, function(day) {
                        let day_wise_total_hrs = [];
                        let day_wise_active_hrs = [];
                        let sortTotalTime;
                        let sortActiveTime;
                        _.forEach(totalHrs, function(val, key) {
                            day_wise_total_hrs.push({ username: val.username, hours: val.hours[day - 1] })
                            if (key == (totalHrs.length - 1)) {
                                sortTotalTime = _.orderBy(day_wise_total_hrs, ['hours'], ['desc']);
                            }
                        });
                        _.forEach(activeHrs, function(val, key) {
                            day_wise_active_hrs.push({ username: val.username, hours: val.hours[day - 1] })
                            if (key == (activeHrs.length - 1)) {
                                sortActiveTime = _.orderBy(day_wise_active_hrs, ['hours'], ['desc']);
                            }
                        });
                        performance.push({ day: (day + " " + moment(month, 'MM').format('MMMM')), top_total_hrs: { username: sortTotalTime[0].username, hours: sortTotalTime[0].hours }, top_active_hrs: { username: sortActiveTime[0].username, hours: sortActiveTime[0].hours } })
                    });
                    resolve({ error: 0, message: "", data: performance });
                });
            });
        },

        attendance.get_enabled_users_performance = (body, db, callback) => {
            return new Promise((resolve, reject) => {
                let activeHrsFinal = [];
                let totalHrsFinal = [];
                db.users.get_enabled_users(function(enabled_users) {
                    _.forEach(enabled_users, function(emp, key) {
                        let activeHrs = [];
                        let totalHrs = [];
                        helper.monthly_reports.working_time_calculations(body, emp.id, db).then((data) => {
                            let monthlydetail = data.data;
                            _.forEach(monthlydetail, function(value) {
                                _.forEach(value.day_wise_detail, function(val) {
                                    totalHrs.push(val.total_hours.total_time);
                                    activeHrs.push(val.active_hours.total_time);
                                });
                            });
                            activeHrsFinal.push({ username: emp.username, hours: activeHrs });
                            totalHrsFinal.push({ username: emp.username, hours: totalHrs });
                            if (key == enabled_users.length - 1) {
                                callback(totalHrsFinal, activeHrsFinal)
                            }
                        })
                    })
                })
            })
        }


    return attendance
}