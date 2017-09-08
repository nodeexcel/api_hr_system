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
                            })
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
                                        resolve({ "error": 0, "data": "", "message": "Data entered", "reason": body.reason })
                                    }).catch(err => reject(err))
                                })
                            }
                        } else {
                            reject(config.errMsg1)
                        }
                    }).catch(err => reject(err))
                })
            })
        }

    return attendance
}