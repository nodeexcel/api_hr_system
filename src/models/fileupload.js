import fs from "fs";

export default function(sequelize, DataTypes) {
    // var details = sequelize.define('attendances', {
  //     No: { type: DataTypes.INTEGER },
  //     TMNo: { type: DataTypes.INTEGER },
  //     EnNo: { type: DataTypes.INTEGER },
  //     Name: { type: DataTypes.STRING },
  //     GMNo: { type: DataTypes.INTEGER },
  //     Mode: { type: DataTypes.INTEGER },
  //     "IN/OUT": { type: DataTypes.STRING },
  //     Antipass: { type: DataTypes.STRING },
  //     DateTime: { type: DataTypes.STRING },
  // }, {
  //     timestamps: true,
  //     allowNull: true,
  //     classMethods: {
  //         fileUpload(form, req, res) {
  //             console.log(form)
  //             form.parse(req, function(err, field, file) {
  //                 var oldpath = file.file.path;
  //                 var newpath = './uploads/' + file.file.name;
  //                 fs.rename(oldpath, newpath, function(err) {
  //                     if (err) throw err;
  //                     else {
  //                         var lineReader = require('readline').createInterface({
  //                             input: fs.createReadStream(newpath)
  //                         });
  //                         var count = 0;
  //                         var line_array = [];
  //                         var filtered_data = [];
  //                         console.log("111111111111")

  //                         function readFile(callback) {
  //                             lineReader.on('line', function(line) {
  //                                 line_array.push(line.split("\t"))
  //                                 if (line_array[count][0] && count >= 1) {
  //                                     var fetched_data = {
  //                                         No: line_array[count][0],
  //                                         TMNo: line_array[count][1],
  //                                         EnNo: line_array[count][2],
  //                                         Name: line_array[count][3],
  //                                         GMNo: line_array[count][4],
  //                                         Mode: line_array[count][5],
  //                                         "IN/OUT": line_array[count][6],
  //                                         Antipass: line_array[count][7],
  //                                         DateTime: line_array[count][8]
  //                                     }
  //                                     filtered_data.push(fetched_data);
  //                                 }
  //                                 count++;
  //                             });
  //                             lineReader.on('close', function() {
  //                                 callback(filtered_data);
  //                             })
  //                         }
  //                         readFile(function(response) {
  //                             model.user.bulkCreate(response).then(function() {
  //                                 res.json('File uploaded and moved!');
  //                             })
  //                         })
  //                     }
  //                 });
  //             });
  //         }
  //     }
  // });
    console.log("sumit")

}