import _ from 'lodash';
import moment from 'moment';
import helper from '../helper';

export default function(sequelize, DataTypes) {

    let user_profile = sequelize.define('user_profile', { // inserting data to database of attendance
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
        timestamps: false,
        freezeTableName: true
    });

user_profile.yearly_joining_termination_stats = (body) => {
        return new Promise((resolve, reject) => {
            user_profile.findAll({}).then((dataFetched) => {
                let output = { status: 0, data: [] };
                let data = [];
                helper.yearArray.array_startyear_endyear(body, function(arrayYear) {
                    _.each(arrayYear, function(value) {
                        let countJoinee = new Uint8Array(12);
                        let countTermninted = new Uint8Array(12);
                        _.forEach(dataFetched, (employee) => {
                            if (new Date(employee.dateofjoining).getFullYear() == value) {
                                countJoinee[new Date(employee.dateofjoining).getMonth()]++;
                            }
                            if (new Date(employee.termination_date).getFullYear() == value) {
                                countTermninted[new Date(employee.termination_date).getMonth()]++;
                            }
                        })
                        let count = 0;
                        let stats = [];
                        let months = moment.months();
                        _.forEach(months, function(month) {
                            let details = [];
                            details.push({
                                "count_joinees": countJoinee[count],
                                "count_terminations": countTermninted[count]
                            });
                            stats.push({ Month: month, details: details });
                            count++;
                        })
                        data.push({
                            Year: value,
                            Stats: stats
                        })
                    });
                })
                resolve({ status: 0, data: data });
            }).catch(err => reject(err))
        });
    }
    return user_profile;
}