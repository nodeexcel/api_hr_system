export default function(sequelize, DataTypes) {
    sequelize.query("SELECT * from admin ", { // fetching admin info
        type: sequelize.QueryTypes.SELECT
    }).then(admin => {
        return admin;
    })
}