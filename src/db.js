import Sequelize from "sequelize";
import models from "./models";
import config from "./config.json";
const db = {};

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, { dialect: config.db.dialect });

Object.keys(models).forEach((modelName) => {
    const model = models[modelName](sequelize, Sequelize.DataTypes);
    db[modelName] = model;
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].options.associate) {
        db[modelName].options.associate(db);
    }
});

sequelize.sync().then((data) => {})

export default Object.assign({}, db, {
    sequelize,
    Sequelize
});