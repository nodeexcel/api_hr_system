export default function(sequelize, DataTypes) {

    let roles = sequelize.define('roles', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        last_update: { type: DataTypes.DATE }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return roles;
}