export default function(sequelize, DataTypes) {
    sequelize.query("SELECT * FROM leaves", {
        type: sequelize.QueryTypes.SELECT
    }).then(leavesRecords => {
        return leavesRecords;
    })
}