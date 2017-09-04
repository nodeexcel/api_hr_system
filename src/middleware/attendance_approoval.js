import db from "../db";

module.exports = {

    approoveUpdate: function(req, res) {
        return new Promise((resolve, reject) => {
            db.manual.update({ action: req.query.action }, { where: { id: req.query.id } }).then(() => {
                db.manual.find({ where: { id: req.query.id } }).then((data) => {
                    if (data.action == true) {
                        db.details.create({ user_id: data.user_id, timing: data.timing }).then(() => {
                            resolve("approoved");
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