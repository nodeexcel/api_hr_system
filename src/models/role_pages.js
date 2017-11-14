export default function(sequelize, DataTypes) {

    let role_pages = sequelize.define('role_pages', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        role_id: { type: DataTypes.INTEGER },
        page_id: { type: DataTypes.INTEGER }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return role_pages;
}