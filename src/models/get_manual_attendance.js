import db from "../db";

module.exports = {

    manualUpdate: function(req, res) {
        return new Promise((resolve, reject) => {
            db.manual.findAll({ where: { action: null } }).then((data) => {
                res.json(data)
            })
        })
    }
}