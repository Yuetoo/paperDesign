var express = require('express');           //使用express
var router = express.Router();               //放数据

var user = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    let userId = req.query.userId,
        password = req.query.password;
    
    user.findOne({
        'where': {
            'userId':userId,
            "password":password
        }
    }).then(result => {
        if(result){
            res.json({
                code:0,
                data:result,
                isSuccess:true,
                msg:"登录成功!"
            })
        }else{
            res.json({
                code:1,
                isSuccess:true,
                msg:"用户名密码错误!"
            })
        }
    }, err => {
        console.log("数据库查询失败！",err);
        res.json({
            code:2,
            isSuccess:false,
            msg:"数据库查询失败！"
        });
    })
});
module.exports = router;