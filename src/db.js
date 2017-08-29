import Sequelize from "sequelize";
import models from "./models";
import config from "./config.json";
import moment from "moment";
const db = {};

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, { dialect: config.db.dialect });

Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize.DataTypes);
    db[modelName] = model;
});

sequelize.sync().then((data) => {})

export default Object.assign({}, db, {
    sequelize,
    Sequelize
});