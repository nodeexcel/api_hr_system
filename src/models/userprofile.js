import _ from 'lodash';

export default function(sequelize, DataTypes) {

    var user_profile = sequelize.define('user_profile', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: { type: DataTypes.STRING },
        jobtitle: { type: DataTypes.STRING },
        dateofjoining: { type: DataTypes.DATE },
        user_id: { type: DataTypes.INTEGER },
        dob: { type: DataTypes.DATE },
        gender: { type: DataTypes.STRING },
        marital_status: { type: DataTypes.STRING },
        address1: { type: DataTypes.STRING },
        address2: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING },
        zip_postal: { type: DataTypes.INTEGER },
        country: { type: DataTypes.STRING },
        home_ph: { type: DataTypes.STRING },
        mobile_ph: { type: DataTypes.STRING },
        work_email: { type: DataTypes.STRING },
        other_email: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
        bank_account_num: { type: DataTypes.BIGINT },
        special_instructions: { type: DataTypes.STRING },
        pan_card_num: { type: DataTypes.STRING },
        permanent_address: { type: DataTypes.TEXT },
        current_address: { type: DataTypes.TEXT },
        emergency_ph1: { type: DataTypes.STRING },
        emergency_ph2: { type: DataTypes.STRING },
        blood_group: { type: DataTypes.STRING },
        medical_condition: { type: DataTypes.TEXT },
        updated_on: { type: DataTypes.STRING },
        slack_id: { type: DataTypes.STRING },
        policy_document: { type: DataTypes.STRING },
        team: { type: DataTypes.STRING },
        training_completion_date: { type: DataTypes.DATE },
        termination_date: { type: DataTypes.DATE },
        holding_comments: { type: DataTypes.TEXT },
        training_month: { type: DataTypes.INTEGER },
        slack_msg: { type: DataTypes.INTEGER },
        unique_key: { type: DataTypes.STRING }
    }, {
        timestamps: false
        // associate: (model) => {
        //     user_profile.belongsTo(model.user_complete_data, { foreignKey: 'user_id' });
        // }

    }); //SELECT user_profile.name,user_profile.jobtitle,user_profile.dateofjoining,user_profile.team FROM user_profile LEFT JOIN users ON user_profile.user_Id=users.id WHERE users.status='Enabled'

    user_profile.employeeGraphStats = (db) => {
        console.log("3")
        sequelize.query("SELECT user_profile.name,user_profile.jobtitle,user_profile.dateofjoining,user_profile.team FROM user_profile LEFT JOIN users ON user_profile.user_Id=users.id WHERE users.status=:status ", { replacements: { status: 'Enabled' }, type: sequelize.QueryTypes.SELECT }).then((data) => {
            console.log(data)
            _.forEach(data, function(employee) {
                let month = new Date(employee.dateofjoining).getMonth();
                let year = new Date(employee.dateofjoining).getFullYear();
                let number_of_months = (12 - (month + 1)) + (new Date().getMonth() + 1) + ((new Date().getFullYear() - year - 1) * 12);
                console.log(month, year, number_of_months)
            })
        });

        // user_profile.findAll({
        //     attributes: ['name', 'dateofjoining', 'jobtitle', 'team'],
        //     include: [{
        //         attributes: ['id', 'status'],
        //         model: users,
        //         where: { status: 'Enabled' }
        //     }],
        //     where: { user_Id: db.sequelize.col('users.id') }
        // }).then((data) => {
        //     console.log(data)
        // })
    }

    return user_profile;
}