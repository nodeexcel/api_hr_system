import path from "path";
import fs from "fs";
import _ from 'lodash';
import config from '../config.json'
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
                                resolve({ success: config.fileSuccessMsg });
                            })
                        })
                    }

                })
            })
        },

        attendance.uploadAttendanceByUserId = (query, db) => {
            return new Promise((resolve, reject) => {
                helper.time.timeConvertion(query.date, query.entry_time, query.exit_time, function(entryTime, exitTime) {
                    attendance.findAll({ where: { user_id: query.userid } }).then((data) => { //fetching all record for user id
                        let errorCode = 0;
                        if (data[0]) {
                            _.forEach(data, function(employee) {
                                if (employee.timing == entryTime || employee.timing == exitTime) { //comparing each fileterd entry with input time for entry and exit
                                    errorCode = 1;
                                    reject({ "error": errorCode, "data": { "message": "Record exists" } })
                                }
                            })
                            if (!errorCode) { //checking for error code
                                db.manual_attendance.create({ user_id: query.userid, timing: entryTime, reason: query.reason }).then(() => {
                                    db.manual_attendance.create({ user_id: query.userid, timing: exitTime, reason: query.reason }).then(() => {
                                        resolve({ "error": 0, "data": { "message": "Data entered", "reason": query.reason } })
                                    }).catch(err => reject({ "error": 1, "data": { err } }))
                                })
                            }
                        } else {
                            reject({ "error": 1, message: config.errMsg1 })
                        }
                    }).catch(err => reject(err))
                })
            })
        }

    return attendance
}