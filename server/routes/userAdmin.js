var express = require('express');           //使用express
var router = express.Router();               //放数据

var user = require('../models/user');
var question = require('../models/question');
var paper = require('../models/paper');

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
// 修改密码
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
//删除用户
router.post('/deleteUser',function(req,res,next){
    let deleteList = req.body.param;
    console.log(deleteList);
    user.destroy({
        "where":{
            userId:deleteList
        }
    })
    .then(re =>{
        console.log("re:",re);
        res.json({
            code:0,
            msg:"删除成功！"
        });
    },err =>{
        res.json({
            code:1,
            msg:"删除失败！"
        })
    });
});

//密码重置
router.post('/resetPassword',function(req,res,next){
    let password = req.body.param.password;
    let resetList = req.body.param.resetList;
    console.log(password,resetList);
    user.update({
        'password':password
    },{
        'where':{
            'userId':resetList
        }
    })
    .then(result =>{
        res.json(result);
    })
});

//获取用户列表
router.get('/userList',function(req,res,next){
    user.findAll().then(result =>{
        if(result){
            res.json(result);
        }
    })
})

//根据id查询用户
router.get('/search',function(req,res,next){
    let userId = req.query.userId;
    console.log(userId);
    user.findAll({
        'where':{
            'userId':userId
        }
    }).then(result =>{
        console.log(result);
        res.json(result);
    })
});

//添加账号
router.post('/addAccount',function(req,res,next){
    let data = req.body;
    data.userRank = parseInt(data.userRank);
    console.log(data);
    user.create(data).then(result =>{
        console.log(result.dataValues);
        if(result.dataValues){
            res.json({
                code:0,
                msg:'添加成功！'
            })
        };
    }).catch(error =>{
        console.log(error);
        res.json({
            code:1,
            msg:'添加失败！'
        })
    })
});

router.post('/updateUser',function(req,res,next){
    let data = req.body;
    console.log(data);
    user.update(data,{
        'where':{
            'userId':data.userId
        }
    }).then(result =>{
        console.log(result);
        if(result[0]){
            res.json({
                code:0,
                msg:"修改成功！"
            })
        }else{
            res.json({
                code:1,
                msg:"修改失败！"
            })
        }
    })
});

//获取统计数据
router.get('/getData',function(req,res,next){
    let userNum,paperNum,questionNum;
    user.findAndCountAll().then(result =>{
        console.log(result.count);
        userNum = result.count;
        question.findAndCountAll().then(result =>{
            console.log(result.count);
            questionNum = result.count;
            paper.findAndCountAll().then(result =>{
                console.log(result.count);
                paperNum = result.count;
                res.json({
                    userNum:userNum,
                    questionNum:questionNum,
                    paperNum:paperNum
                });
            });
        });
    });
   
   
   
});

module.exports = router;