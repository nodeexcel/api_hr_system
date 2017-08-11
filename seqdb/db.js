var Sequelize = require('sequelize');

var sequelize = new Sequelize('excellen_hr_demo', 'sumit', '123', { dialect: 'mysql' });

var details = sequelize.define('attendances', {
	id:{type:Sequelize.INTEGER,required:true,primaryKey:true},
    user_id: { type: Sequelize.INTEGER, required: true},
    timing: { type: Sequelize.STRING, required: true},
},{
    timestamps: false
});

sequelize.sync().then((data) => {

})

module.exports = {
    user: details
}