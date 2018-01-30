import db from '../db';
import helper from '../helper';
import path from 'path';

module.exports = {

    getUnapprovedInventory: (req, res, next) => {
        db.machines_user.fetchUnapprovedInventory().then((data) => {
            res.json(data)
        }).catch(err => next(err))
    },

    approveInventory: (req, res, next) => {
        db.machines_user.approveInventories(req.params.id, req.params.approval).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    }

}