export default function(sequelize, DataTypes) {

    let roles_actions = sequelize.define('roles_actions', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        role_id: { type: DataTypes.INTEGER },
        action_id: { type: DataTypes.INTEGER }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return roles_actions;
}