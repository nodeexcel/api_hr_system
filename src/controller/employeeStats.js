import db from '../db';

module.exports = {

      joiningTerminatiionStats: (req, res, next) => {
        let data = JSON.parse(req.body);
        db.user_profile.yearly_joining_termination_stats(data).then((data) => { //stats for yearly termination and joining
            res.json(data)
        }).catch(err => next(err))
    }

}