import path from "path";
import fs from "fs";
import _ from 'lodash';
import config from '../config.json'
import moment from 'moment';
import helper from '../helper';

export default function(sequelize, DataTypes) {
    var details = sequelize.define('attendance', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    details.uploadAttendance = function(req, res) {
            return new Promise((resolve, reject) => {
                var oldpath = config.path;
                var newpath = path.join(__dirname, './uploads/AGL_001.TXT');
                fs.rename(oldpath, newpath, function(err) { //stores file to new path in upload folder
                    if (err) reject(err);
                    else {
                        helper.attendance.readFile(newpath, function(response) {
                            details.bulkCreate(response).then((data) => { // insert data into database
                                resolve("file uploaded successfully");
                            })
                        })
                    }

                })
            })
        },

        details.uploadAttendanceByUserId = (req, res, db) => {
            return new Promise((resolve, reject) => {
                helper.time.timeConvertion(req.query.date, req.query.entry_time, req.query.exit_time, function(entryTime, exitTime) {
                    details.findAll({ where: { user_id: req.query.userid } }).then((data) => { //fetching all record for user id
                        var errorCode = 0;
                        if (data[0]) {
                            _.forEach(data, function(employee) {
                                if (employee.timing == entryTime || employee.timing == exitTime) { //comparing each fileterd entry with input time for entry and exit
                                    errorCode = 1;
                                    reject({ "error": errorCode, "data": { "message": "Record exists" } })
                                }
                            })
                            if (errorCode == 0) { //checking for error code
                                db.manual.create({ user_id: req.query.userid, timing: entryTime, reason: req.query.reason }).then(() => {
                                    db.manual.create({ user_id: req.query.userid, timing: exitTime, reason: req.query.reason }).then(() => {
                                        resolve({ "error": 0, "data": { "message": "Data entered", "reason": req.query.reason } })
                                    }).catch(err => reject({ "error": 1, "data": { err } }))
                                })
                            }
                        } else {
                            reject({ "error": 1, "data": " user_id not found" })
                        }
                    }).catch(err => reject(err))
                })
            })
        }

    return details
}