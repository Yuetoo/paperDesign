var Sequelize = require('sequelize');
var sequelize = require('../controllers/dbConnect.js');

var bulletin = sequelize.define('bulletin',{
    recordId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: {
        type:Sequelize.STRING(100),
        allowNull: false,
    },
   
    content:{
        type:Sequelize.STRING(500),
        allowNull: false,
    },
    date:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    authorId:{
        type:Sequelize.INTEGER(10),
        allowNull: false,
    },

},{
    timestamps: false,   // 不要默认时间戳
    tableName: 'bulletin',
    freezeTableName: true
});

module.exports = bulletin;