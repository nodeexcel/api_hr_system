export default function(sequelize, DataTypes) {
    var details = sequelize.define('attendances', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        user_id: { type: DataTypes.INTEGER },
        timing: { type: DataTypes.STRING(1234) }
    }, {
        timestamps: false
    });

    return details
}