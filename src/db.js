import Sequelize from "sequelize";
import models from "./models";
import config from "./config.json";
const db = {};

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, { dialect: config.db.dialect });

Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize.DataTypes);
    db[modelName] = model;
    console.log("1")
});

sequelize.sync().then((data) => {
    console.log("5")
})

exports.default = db