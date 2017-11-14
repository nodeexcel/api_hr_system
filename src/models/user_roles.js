export default function(sequelize, DataTypes) {

    let user_roles = sequelize.define('user_roles', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        role_id: { type: DataTypes.INTEGER }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return user_roles;
}