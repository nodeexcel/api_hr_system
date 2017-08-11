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
                        input: require('fs').createReadStream(newpath)
                    });
                    var count = 0;
                    var line_array = [];
                    lineReader.on('line', function(line) {
                        line_array.push(line.split("\t"))
                        if (count >= 1) {
                            var fetched_data = new model.user({
                                id: line_array[count][0],
                                user_id: line_array[count][2],
                                timing: line_array[count][6]
                            })
                            fetched_data.save().catch((err) => {
                                next(err);
                            });
                        }
                        count++;
                    });
                    res.write('File uploaded and moved!');
                }
            });

        });
    }
}