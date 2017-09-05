import fs from "fs";
import _ from 'lodash';

module.exports = {
    readFile: function(newpath, callback) {
        let lineReader = require('readline').createInterface({
            input: fs.createReadStream(newpath) //read file from new path in upload folder
        });
        let count = 0;
        let line_array = [];
        let filtered_data = [];

        lineReader.on('line', function(line) {
            line_array.push(line.split("\t"))
            if (line_array[count][0] && count >= 1) {
                let fetched_data = {
                    id: line_array[count][0],
                    user_id: line_array[count][2],
                    timing: line_array[count][6]
                }
                let flag = 0;
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
}