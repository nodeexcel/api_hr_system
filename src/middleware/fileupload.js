import fs from "fs";
import db from '../db';
import path from "path";
import _ from 'lodash';
import config from '../config.json'
import moment from 'moment'
module.exports = {

    uploadAttendance: function(req, res) {
        return new Promise((resolve, reject) => {
            var oldpath = config.path;
            var newpath = path.join(__dirname, './uploads/AGL_001.TXT');
            fs.rename(oldpath, newpath, function(err) { //stores file to new path in upload folder
                if (err) throw err;
                else {
                    var lineReader = require('readline').createInterface({
                        input: fs.createReadStream(newpath) //read file from new path in upload folder
                    });
                    var count = 0;
                    var line_array = [];
                    var filtered_data = [];

                    function readFile(callback) {
                        lineReader.on('line', function(line) {
                            line_array.push(line.split("\t"))
                            if (line_array[count][0] && count >= 1) {
                                var fetched_data = {
                                    id: line_array[count][0],
                                    user_id: line_array[count][2],
                                    timing: line_array[count][6]
                                }
                                var flag = 0;
                                _.forEach(filtered_data, function(value) {

                                    if (value.id == fetched_data.id || (fetched_data.user_id).toString().trim() == "0") { //checks duplicate id as id is primary key
                                        flag = 1;
                                    }
                                })

                                if (flag == 0) {
                                    filtered_data.push(fetched_data); // array of non repeative data from file
                                }
                            }
                            count++;
                        });
                        lineReader.on('close', function() {
                            callback(filtered_data);
                        })
                    }
                    readFile(function(response) {
                        db.details.bulkCreate(response).then((data) => { // insert data into database
                            resolve("file uploaded successfully");
                        })
                    })
                }

            })
        })
    },

    uploadAttendanceByUserId: (req, res) => {
        return new Promise((resolve, reject) => {
            var entryTime = req.query.date + " " + moment(req.query.entry_time, ["h:mm:ss A"]).format("HH:mm:ss");
            entryTime = entryTime.replace(/\-/g, '/');
            var exitTime = req.query.date + " " + moment(req.query.exit_time, ["h:mm:ss A"]).format("HH:mm:ss");
            exitTime = exitTime.replace(/\-/g, '/');
            db.details.findAll({ where: { user_id: req.query.userid } }).then((data) => { //fetching all record for user id
                var errorCode = 0;
                _.forEach(data, function(employee) {
                    if (employee.timing == entryTime || employee.timing == exitTime) { //comparing each fileterd entry with input time for entry and exit
                        errorCode = 1;
                        reject({ "error": errorCode, "data": { "message": "Record exists" } })
                    }
                })
                if (errorCode == 0) { //checking for error code
                    db.details.create({ user_id: req.query.userid, timing: entryTime }).then(() => {
                        db.details.create({ user_id: req.query.userid, timing: exitTime }).then(() => {
                            resolve({ "error": 0, "data": { "message": "Data entered" } })
                        }).catch((err) => {
                            reject({ "error": 1, "data": { err } })
                        })
                    })
                }
            })
        })
    }
}