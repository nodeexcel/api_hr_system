export default function(sequelize, DataTypes) {

    let users = sequelize.define('users', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        username: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return users;
}