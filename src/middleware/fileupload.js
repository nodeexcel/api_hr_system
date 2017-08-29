import fs from "fs";
import model from '../db';
import path from "path";
import _ from 'lodash';

module.exports = {

    fileUpload: function(form, req, res) {
        return new Promise((resolve, reject) => {
            form.parse(req, function(err, field, file) {
                if (file != "AGL_001.TXT") {
                    reject("Wrong file inserted");
                }
                var oldpath = file.file.path;
                var newpath = path.join(__dirname, './uploads/' + file.file.name);
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
                                        timing: line_array[count][8]
                                    }
                                    var flag = 0;
                                    _.forEach(filtered_data, function(value) {
                                        if (value.id == fetched_data.id) {
                                            flag = 1;
                                        }
                                    })
                                }
                                if (flag == 0) {
                                    filtered_data.push(fetched_data); // array of non repeative data from file
                                }
                                count++;
                            });
                            lineReader.on('close', function() {
                                callback(filtered_data);
                            })
                        }
                        readFile(function(response) {
                            model.details.bulkCreate(response).then((data) => { // insert data into database
                                resolve("ok");
                            })
                        })
                    }
                });
            });
        })
    }
}