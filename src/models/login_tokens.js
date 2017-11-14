export default function(sequelize, DataTypes) {

    let login_tokens = sequelize.define('login_tokens', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        userid: { type: DataTypes.STRING },
        token: { type: DataTypes.STRING },
        creation_timestamp: { type: DataTypes.STRING },
        creation_date_time: { type: DataTypes.STRING }

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return login_tokens;
}