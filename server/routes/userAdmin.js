var express = require('express');           //使用express
var router = express.Router();               //放数据

var user = require('../models/user');

/* 登录. */
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

router.post('/modifyPassword',function(req,res,next){
    let data = req.body,msg={};
    console.log("前端传过来的数据:",data);
    
    user.findOne({
        'where':{
            'userId':data.userId
        }
    }).then(result =>{
        console.log("查询的数据结果：",result);
        if(result.password === data.original){
            user.update({
                'password':data.newPassword
            },{
                'where':{
                    'userId':data.userId
                }
            }).then(result =>{
                console.log("修改的结果：",result);
                msg={code:0,msg:'密码修改成功！'};
                console.log(msg);
                res.json(msg);
            })
        }else{
            msg={code:1,msg:"原密码错误！"};
            console.log(msg);
            res.json(msg);
        };
        
    });
   
});


module.exports = router;