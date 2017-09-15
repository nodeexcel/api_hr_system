import config from '../../../config';

export default function(sequelize, DataTypes) {
    let manual_attendance = sequelize.define('manual_attendance', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) },
        reason: { type: DataTypes.STRING },
        status: { type: DataTypes.BOOLEAN }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    manual_attendance.manualUpdateAttendance = function() {
        return new Promise((resolve, reject) => {
            manual_attendance.findAll({ where: { status: null } }).then((data) => { //fetch all entries in manual_attendance table which are not reviewed
                resolve(data)
            }).catch(err => reject(err))

        })
    }

    manual_attendance.approveUpdatedAttendance = function(body, db, callback) {
        manual_attendance.update({ status: body.status }, { where: { id: body.id } }).then(function(rowsAffected) { //updtaes manual_attenadance table
            if (rowsAffected[0]) {
                manual_attendance.find({ where: { id: body.id } }).then(function(data) {
                    if (data) {
                        if (data.status == true) { // if approved ,data is inserted in attendance table
                            db.attendance.create({ user_id: data.user_id, timing: data.timing }).then(function() {
                                callback("", true);
                            })
                        } else {
                            callback("", false);
                        }
                    } else {
                        callback(config.errMsg1, "")
                    }
                })
            } else {
                callback(config.errMsg1, "")
            }
        }).catch(err => callback(err, ""))

    }
    return manual_attendance
}