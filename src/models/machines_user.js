export default function(sequelize, DataTypes) {
    let machines_user = sequelize.define('machines_user', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        machine_id: { type: DataTypes.INTEGER },
        user_Id: { type: DataTypes.INTEGER },
        assign_date: { type: DataTypes.DATE },
        is_admin_approved: { type: DataTypes.BOOLEAN }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    machines_user.fetchUnapprovedInventory = function() {
        return new Promise((resolve, reject) => {
            machines_user.findAll({ where: { is_admin_approved: false } }).then((data) => {
                resolve({ status: 1, data: data, });
            }).catch(err => reject(err))
        })
    }

    machines_user.approveInventories = function(id, approval) {
        return new Promise((resolve, reject) => {
            machines_user.update({ is_admin_approved: approval }, { where: { id: id } }).then((data) => {
                resolve({ status: 1, data: data, });
            }).catch(err => reject(err))
        })
    }

    return machines_user
}