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
        db.machines_user.approveInventories(req.body.id, req.body.approval).then((data) => {
            res.json(data)
        }).catch(err => next(err))
    }

}