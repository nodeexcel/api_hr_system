import fs from "fs";
import db from '../db';
import path from "path";
import _ from 'lodash';
import config from '../config.json'
module.exports = {

    uploadAttendance: function(req, res) {
        return new Promise((resolve, reject) => {
            var oldpath = config.path;
            var newpath = path.join(__dirname, './uploads/AGL_001.TXT');
            fs.rename(oldpath, newpath, function(err) {
                if (err) throw err;
                else {
                    var lineReader = require('readline').createInterface({
                        input: fs.createReadStream(newpath) //stores file to ne path in upload
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

                                    if (value.id == fetched_data.id || (fetched_data.user_id).toString().trim() == "0") {
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
    }
}