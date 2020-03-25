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
    max1:Sequelize.INTEGER,
    max2:Sequelize.INTEGER,
    max3:Sequelize.INTEGER,
    min1:Sequelize.INTEGER,
    min2:Sequelize.INTEGER,
    min3:Sequelize.INTEGER,
    gpa1:Sequelize.FLOAT(2), 
    gpa2:Sequelize.FLOAT(2), 
    gpa3:Sequelize.FLOAT(2), 
    sd1:Sequelize.FLOAT(2),
    sd2:Sequelize.FLOAT(2),
    sd3:Sequelize.FLOAT(2),

},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'analysis',
    freezeTableName: true
});

module.exports = analysis;