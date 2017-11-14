export default function(sequelize, DataTypes) {

    let config = sequelize.define('config', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        type: { type: DataTypes.STRING },
        value: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return config;
}