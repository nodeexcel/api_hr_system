export default function(sequelize, DataTypes) {

    var users = sequelize.define('users', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        username: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING }
    }, {
        timestamps: false
        // associate: (model) => {
        //     user_complete_data.hasOne(model.user_profile, { foreignKey: 'user_id' });
        // }
    });

    return users;
}