var Sequelize = require('sequelize');
var sequelize = require('../controllers/dbConnect.js');

var user = sequelize.define('user',{
    userId: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: false,
    },
    password: {
        type:Sequelize.STRING(20),  
        allowNull: false,
    },

    userName: {
        type:Sequelize.STRING(15),  
        allowNull: false,
    },
    userRank:{
        type:Sequelize.INTEGER(1),
        allowNull: false,
    }
},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'user',
    freezeTableName: true
});

module.exports = user;