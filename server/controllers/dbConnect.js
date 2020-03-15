var Sequelize = require('sequelize');
// 引入数据库配置文件
var sqlConfig = require('config-lite')(__dirname).mysql;

var sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    query: { raw:true }
});



// 测试数据库是否连接成功
sequelize
    .authenticate()
    .then(res => {
        console.log('Connection Success!')
    })
    .catch(err => {
        console.log('Connection Error')
    })
    
    sequelize.sync({alter: true}).then(function() {
        console.log("db Server successed to start");
    }).catch(function(err){
        console.log("Server failed to start due to error: %s", err);
    });

module.exports = sequelize;