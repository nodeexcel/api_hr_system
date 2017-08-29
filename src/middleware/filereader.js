import fs from "fs";
import model from '../db';
import path from "path";

module.exports = {

    fileReader: function(res) {
        return new Promise((reslove, reject) => {
            var newpath = path.join(__dirname, './uploads/AGL_001.TXT');
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
                            id: line_array[count][0],
                            user_id: line_array[count][2],
                            timing: line_array[count][8]
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
                reslove(response);
            })
        })
    }
}