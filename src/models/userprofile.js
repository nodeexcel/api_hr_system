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
        timestamps: false,
        freezeTableName: true
    });

    user_profile.employeeGraphStats = () => {
            return new Promise((resolve, reject) => {
                sequelize.query("SELECT user_profile.name,user_profile.user_Id, user_profile.jobtitle,user_profile.dateofjoining,user_profile.team FROM user_profile LEFT JOIN users ON user_profile.user_Id=users.id WHERE users.status=:status ", { replacements: { status: 'Enabled' }, type: sequelize.QueryTypes.SELECT }).then((data) => {
                    var teams = [
                        ['Nodejs'],
                        ['AngularJs'],
                        ['ReactJs'],
                        ['Magento'],
                        ['Trainee']
                    ];
                    var number_of_months = {};
                    _.forEach(data, function(employee) {
                        if (employee.team === "Nodejs") {
                            teams[0].push(employee);
                        }
                        if (employee.team === "AngularJs") {
                            teams[1].push(employee);
                        }
                        if (employee.team === "ReactJs") {
                            teams[2].push(employee);
                        }
                        if (employee.team === "Magento") {
                            teams[3].push(employee);
                        }
                        if (employee.team === "Trainee") {
                            teams[4].push(employee);
                        }
                    })
                    var output = { status: 0, data: { total_teams: teams.length, teams: [] } };
                    _.forEach(teams, function(team) {
                        var team_info = { team: team[0], count_members: (team.length - 1), members: [] };
                        if ((team.length - 1)) {
                            var members = [];
                            _.forEach(team, function(member) {
                                if (member != team[0]) {
                                    let month = new Date(member.dateofjoining).getMonth();
                                    let year = new Date(member.dateofjoining).getFullYear();
                                    let number_of_months = (12 - (month + 1)) + (new Date().getMonth() + 1) + ((new Date().getFullYear() - year - 1) * 12);
                                    var member_info = { name: member.name, dateofjoining: member.dateofjoining, number_of_months: number_of_months, jobtitle: member.jobtitle };
                                    members.push(member_info);
                                }
                            });
                            team_info.members = members;
                        }
                        output.data.teams.push(team_info);
                    });
                    resolve(output);
                }).catch(err => reject(err))
            });
        },

        user_profile.yearly_joining_termination_stats = (body) => {
            return new Promise((resolve, reject) => {
                var startYear;
                var endYear;
                user_profile.findAll({}).then((dataFetched) => {
                    if (body.startYear && body.endYear) {
                        startYear = body.startYear;
                        endYear = body.endYear;
                    } else if (body.startYear) {
                        startYear = body.startYear;
                        endYear = new Date().getFullYear();
                    } else {
                        startYear = new Date('2010-05-03').getFullYear();
                        endYear = new Date().getFullYear()
                    }
                    endYear = parseInt(endYear) + 1;
                    var arrayYear = _.range(startYear, endYear);
                    var output = { status: 0, data: [] };
                    var data = [];

                    _.each(arrayYear, function(value) {
                        var countJoinee = new Uint8Array(12);
                        var countTermninted = new Uint8Array(12);
                        _.forEach(dataFetched, (employee) => {
                            if (new Date(employee.dateofjoining).getFullYear() == value) {
                                countJoinee[new Date(employee.dateofjoining).getMonth()]++;
                            }
                            if (new Date(employee.termination_date).getFullYear() == value) {
                                countTermninted[new Date(employee.termination_date).getMonth()]++;
                            }
                        })

                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        var count = 0;
                        var stats = [];
                        _.forEach(months, function(month) {
                            var details = [];
                            details.push({
                                "No of new Joinees": countJoinee[count],
                                "No.of Terminations": countTermninted[count]
                            });
                            stats.push({ Month: month, details: details });
                            count++;
                        })
                        data.push({
                            Year: value,
                            Stats: stats
                        })
                    });
                    resolve({ status: 0, data: data });
                }).catch(err => reject(err))

            });
        }

    return user_profile;
}