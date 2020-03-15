var Sequelize = require('sequelize');
var sequelize = require('../controllers/dbConnect.js');

var question = sequelize.define('question',{
    questionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    content: {
        type:Sequelize.STRING(500),
        allowNull: false,
    },

    answer:{
        type: Sequelize.STRING(500),  
        allowNull: false,
    },
    questionType:{
        type:Sequelize.STRING(20),
        allowNull: false,
    },
    aPicture:Sequelize.STRING(300),
    qPicture:Sequelize.STRING(300),
    knowledgePoint:{
        type:Sequelize.STRING(40),
        allowNull: false,
    },
    difficulty:{
        type:Sequelize.FLOAT(2),
        allowNull: false,
    },
    courseGoal:{
        type:Sequelize.STRING(15),
        allowNull: false,
    },
    score:{
        type:Sequelize.TINYINT(2),
        allowNull: false,
    },
    gpa:Sequelize.FLOAT(2),
},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'question',
    freezeTableName: true
});

module.exports = question;