export default function(sequelize, DataTypes) {
    sequelize.query("SELECT * FROM leaves", { // fetching leave info of all emp
        type: sequelize.QueryTypes.SELECT
    }).then(leavesRecords => {
        return leavesRecords;
    })
}