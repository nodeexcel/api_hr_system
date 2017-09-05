export default function(sequelize, DataTypes) {
    var manual = sequelize.define('manual_attendance', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) },
        reason: { type: DataTypes.STRING },
        action: { type: DataTypes.BOOLEAN }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    manual.manualUpdate = function(req, res) {
        return new Promise((resolve, reject) => {
            manual.findAll({ where: { action: null } }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })

        })
    }

    manual.approveUpdate = function(req, res, db) {
        return new Promise((resolve, reject) => {
            manual.update({ action: req.query.action }, { where: { id: req.query.id } }).then(function() {
                manual.find({ where: { id: req.query.id } }).then(function(data) {
                    if (data.action == true) {
                        db.details.create({ user_id: data.user_id, timing: data.timing }).then(function() {
                            resolve("approved");
                        })
                    } else {
                        reject("declined");
                    }
                })
            }).catch((err) => {
                reject(err)
            })
        })
    }

    return manual
}