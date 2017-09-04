import db from "../db";

module.exports = {

    approveUpdate: function(req, res) {
        return new Promise((resolve, reject) => {
            db.manual.update({ action: req.query.action }, { where: { id: req.query.id } }).then(function() {
                db.manual.find({ where: { id: req.query.id } }).then(function(data) {
                    if (data.action == true) {
                        db.details.create({ user_id: data.user_id, timing: data.timing }).then(function() {
                            resolve("approved");
                        })
                    } else {
                        reject("declined");
                    }
                })
            }).catch((err) => {
                reject(err)
            })
        })
    }
}