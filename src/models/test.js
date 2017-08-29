export default function(sequelize, DataTypes) { //fetching all emp data
    sequelize.query("SELECT users.*,user_profile.name,user_profile.work_email,user_profile.slack_msg FROM users LEFT JOIN user_profile ON users.id = user_profile.user_Id where status = :status ", { replacements: { status: 'Enabled' }, type: sequelize.QueryTypes.SELECT }).then((user_complete_data) => {
        return user_complete_data;
    })
}