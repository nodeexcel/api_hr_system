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
                            day: day,
                            working_time: { hours: _.floor(diff / 60), minutes: _.ceil(diff % 60) },
                            total_time: _.floor(diff / 60) + "." + ((_.ceil(diff % 60) * 5) / 3)
                        });
                    });
                    resolve({ error: 0, message: "", data: daily_hours })
                })

            })
        },

        attendance.get_monthly_attendance = (input_month, year, user_id, callback) => {
            let month = moment().month(input_month).format("M");
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
        }

    return attendance
}