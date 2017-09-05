export default function(sequelize, DataTypes) {
    let manual_attendance = sequelize.define('manual_attendance', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) },
        reason: { type: DataTypes.STRING },
        action: { type: DataTypes.BOOLEAN }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    manual_attendance.manualUpdateAttendance = function(req, res) {
        return new Promise((resolve, reject) => {
            manual_attendance.findAll({ where: { action: null } }).then((data) => {
                resolve(data)
            }).catch(err => reject(err))

        })
    }

    manual_attendance.approveUpdatedAttendance = function(req, res, db, callback) {
        manual_attendance.update({ action: req.query.action }, { where: { id: req.query.id } }).then(function() {
            manual_attendance.find({ where: { id: req.query.id } }).then(function(data) {
                if (data.action == true) {
                    db.attendance.create({ user_id: data.user_id, timing: data.timing }).then(function() {
                        callback(true);
                    })
                } else {
                    callback(false);
                }
            })
        }).catch(err => res.json({ error: err }))

    }
    return manual_attendance
}