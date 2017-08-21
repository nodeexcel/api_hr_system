import fs from "fs";
import model from '../db';
import path from "path";

module.exports = {

    fileUpload: function(form, req, res) {
        return new Promise((reslove, reject) => {
            form.parse(req, function(err, field, file) {
                var oldpath = file.file.path;
                var newpath = path.join(__dirname, './uploads/' + file.file.name);
                fs.rename(oldpath, newpath, function(err) {
                    if (err) throw err;
                    else {
                        var lineReader = require('readline').createInterface({
                            input: fs.createReadStream(newpath)
                        });
                        var count = 0;
                        var line_array = [];
                        var filtered_data = [];

                        function readFile(callback) {
                            lineReader.on('line', function(line) {
                                line_array.push(line.split("\t"))
                                if (line_array[count][0] && count >= 1) {
                                    var fetched_data = {
                                        No: line_array[count][0],
                                        TMNo: line_array[count][1],
                                        EnNo: line_array[count][2],
                                        Name: line_array[count][3],
                                        GMNo: line_array[count][4],
                                        Mode: line_array[count][5],
                                        "IN/OUT": line_array[count][6],
                                        Antipass: line_array[count][7],
                                        DateTime: line_array[count][8]
                                    }
                                    filtered_data.push(fetched_data);
                                }
                                count++;
                            });
                            lineReader.on('close', function() {
                                callback(filtered_data);
                            })
                        }
                        readFile(function(response) {
                            model.details.bulkCreate(response).then(function() {
                                fs.unlink(newpath);
                                res.json('File uploaded and data moved!');
                            })
                        })
                    }
                });
            });
        })
    }
}