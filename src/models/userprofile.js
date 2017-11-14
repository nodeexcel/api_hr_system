import _ from 'lodash';
import moment from 'moment';
import helper from '../helper';

export default function(sequelize, DataTypes) {

    let user_profile = sequelize.define('user_profile', { // inserting data to database of attendance
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: { type: DataTypes.STRING },
        jobtitle: { type: DataTypes.STRING },
        dateofjoining: { type: DataTypes.DATE },
        user_Id: { type: DataTypes.INTEGER },
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
        slack_msg: { type: DataTypes.INTEGER }
    }, {
        timestamps: false,
        freezeTableName: true
    }, {
        associate: (model) => {

            user_profile.hasOne(db.users, { foreignKey: 'user_id' });
        }
    });

    user_profile.employeeGraphStats = (db) => {
            return new Promise((resolve, reject) => {
                db.users.findAll({ attributes: ['id'], where: { status: 'Enabled' } }).then((dataFetched) => {
                    let enabled_userIds = [];
                    _.forEach(dataFetched, function(val) {
                        enabled_userIds.push(val.id)
                    })
                    user_profile.findAll({ attributes: ['name', 'jobtitle', 'dateofjoining', 'team'], where: { user_Id: { $in: enabled_userIds } } }, ).then((data) => {
                        let teams = [];
                        _.forEach(data, function(employee) {
                            teams.push(employee.team)
                        })
                        teams = teams.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });

                        function findTeams(data, teams, callback) {
                            let team_data = []
                            _.forEach(teams, (val, key) => {
                                let members = []
                                _.forEach(data, (val1, key1) => {
                                    if (val == val1.team) {
                                        let month = new Date(val1.dateofjoining).getMonth();
                                        let year = new Date(val1.dateofjoining).getFullYear();
                                        let number_of_months = (12 - (month + 1)) + (new Date().getMonth() + 1) + ((new Date().getFullYear() - year - 1) * 12);
                                        let member_info = { name: val1.name, dateofjoining: val1.dateofjoining, number_of_months: number_of_months, jobtitle: val1.jobtitle };
                                        members.push(member_info);
                                    }
                                    if (key1 == data.length - 1) {
                                        team_data.push({ name: val, count_members: members.length, member: members })
                                    }
                                })
                                if (key == teams.length - 1) {
                                    callback(team_data)
                                }
                            })
                        }
                        findTeams(data, teams, function(response) {
                            let output = { error: 0, message: "", data: { total_teams: teams.length, teams: response } }
                            resolve(output)
                        })
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        user_profile.yearly_joining_termination_stats = (body) => {
            return new Promise((resolve, reject) => {
                user_profile.findAll({ attributes: ['dateofjoining', 'termination_date'] }).then((dataFetched) => {
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
                    resolve({ error: 0, message: "", data: data });
                }).catch(err => reject(err))
            });
        },

        user_profile.user_list = (db) => {
            return new Promise((resolve, reject) => {
                db.users.findAll({ attributes: ['id'], where: { status: 'Enabled' } }).then((dataFetched) => {
                    let enabled_userIds = [];
                    _.forEach(dataFetched, function(val) {
                        enabled_userIds.push(val.id)
                    })
                    user_profile.findAll({ attributes: ['user_Id', 'name'], where: { user_Id: { $in: enabled_userIds } } }).then((dataFetched) => {
                        resolve({ error: 0, message: "", data: dataFetched })
                    })
                })
            })
        }
    return user_profile;
}