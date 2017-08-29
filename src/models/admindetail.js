export default function(sequelize, DataTypes) {
    sequelize.query("SELECT * from admin ", {
        type: sequelize.QueryTypes.SELECT
    }).then(admin => {
        return admin;
    })
}