var Sequelize = require('sequelize');
var sequelize = require('../controllers/dbConnect.js');

var paper = sequelize.define('paper',{
    paperId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    paperHeader: {
        type:Sequelize.STRING(100),
        allowNull: false,
    },
   
    difficulty:{
        type:Sequelize.FLOAT(2),
        allowNull: false,
    },
    course1Score:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    course2Score:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    question1:Sequelize.INTEGER,
    question2:Sequelize.INTEGER,
    question3:Sequelize.INTEGER,
    question4:Sequelize.INTEGER,
    question5:Sequelize.INTEGER,
    question6:Sequelize.INTEGER,
    question7:Sequelize.INTEGER,
    question8:Sequelize.INTEGER,
    question9:Sequelize.INTEGER,
    question10:Sequelize.INTEGER,
    question11:Sequelize.INTEGER,
    question12:Sequelize.INTEGER,
    question13:Sequelize.INTEGER,
    question14:Sequelize.INTEGER,
    question15:Sequelize.INTEGER,
    question16:Sequelize.INTEGER,
    question17:Sequelize.INTEGER,
    question18:Sequelize.INTEGER,
    question19:Sequelize.INTEGER,
    question20:Sequelize.INTEGER,

},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'paper',
    freezeTableName: true
});

module.exports = paper;