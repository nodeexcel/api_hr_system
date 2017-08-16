var model = require('../seqdb/db');
var formidable = require('formidable');
var path = require('path');
var fs = require("fs");

module.exports = {
    attendance: (req, res, next) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, field, file) {
            var oldpath = file.file.path;
            var newpath = './uploads/' + file.file.name;
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
                                    s_no: line_array[count][0],
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
                        model.user.bulkCreate(response).then(function() {
                            res.json('File uploaded and moved to database!');
                        })

                    })

                }
            });

        });
    }
}