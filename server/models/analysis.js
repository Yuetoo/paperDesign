var Sequelize = require('sequelize');
var sequelize = require('../controllers/dbConnect.js');

var analysis = sequelize.define('analysis',{
    paperId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: false,
    },
    classNum1:Sequelize.STRING(10),
    classNum2:Sequelize.STRING(10),
    classNum3:Sequelize.STRING(10),
    classNum4:Sequelize.STRING(10),
    classNum5:Sequelize.STRING(10),
    date1:Sequelize.STRING(10),
    date2:Sequelize.STRING(10),
    date3:Sequelize.STRING(10),
    date4:Sequelize.STRING(10),
    date5:Sequelize.STRING(10),
    max1:Sequelize.INTEGER,
    max2:Sequelize.INTEGER,
    max3:Sequelize.INTEGER,
    max4:Sequelize.INTEGER,
    max5:Sequelize.INTEGER,
    min1:Sequelize.INTEGER,
    min2:Sequelize.INTEGER,
    min3:Sequelize.INTEGER,
    min4:Sequelize.INTEGER,
    min5:Sequelize.INTEGER,
    gpa1:Sequelize.FLOAT(2), 
    gpa2:Sequelize.FLOAT(2), 
    gpa3:Sequelize.FLOAT(2), 
    gpa4:Sequelize.FLOAT(2), 
    gpa5:Sequelize.FLOAT(2), 
    sd1:Sequelize.FLOAT(2),
    sd2:Sequelize.FLOAT(2),
    sd3:Sequelize.FLOAT(2),
    sd4:Sequelize.FLOAT(2),
    sd5:Sequelize.FLOAT(2),

},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'analysis',
    freezeTableName: true
});

module.exports = analysis;