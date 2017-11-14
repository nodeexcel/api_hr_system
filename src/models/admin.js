export default function(sequelize, DataTypes) {
    let admin = sequelize.define('admin', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        client_id: { type: DataTypes.STRING },
        client_secret: { type: DataTypes.STRING },
        token: { type: DataTypes.STRING },
        // status: { type: DataTypes.STRING }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return admin
}