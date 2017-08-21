import fs from "fs";

export default function(sequelize, DataTypes) {
    var details = sequelize.define('attendances', {
        No: { type: DataTypes.INTEGER },
        TMNo: { type: DataTypes.INTEGER },
        EnNo: { type: DataTypes.INTEGER },
        Name: { type: DataTypes.STRING },
        GMNo: { type: DataTypes.INTEGER },
        Mode: { type: DataTypes.INTEGER },
        "IN/OUT": { type: DataTypes.STRING },
        Antipass: { type: DataTypes.STRING },
        DateTime: { type: DataTypes.STRING },
    }, {
        timestamps: true
    });
    return details
}