import api from '../new/api.js';
import services from '../services';
import config from '../../../config.json';

module.exports = {

    new: (req, res, next) => {
        let data = JSON.parse(req.body);
        if (data.action == 'login') {
            api.login(data).then((status) => { //uploads attendance fie in database
                res.json(status)
            }).catch(err => next(err))
        } else {
            res.json({ error: 1, message: 'action not found' })
        }
    }
}