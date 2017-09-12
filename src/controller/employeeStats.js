import db from '../db';

module.exports = {

    graphStats: (req, res, next) => {
        db.user_profile.employeeGraphStats().then((data) => { // stats for no. of months completed in office
            res.json(data)
        }).catch(err => next(err))
    },

    joiningTerminatiionStats: (req, res, next) => {
        //let data = JSON.parse(req.body);
        db.user_profile.yearly_joining_termination_stats(req.body).then((data) => { //stats for yearly termination and joining
            res.json(data)
        }).catch(err => next(err))
    }

}