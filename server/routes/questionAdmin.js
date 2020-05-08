var express = require('express');           //使用express
var router = express.Router();               //放数据
var multer = require('multer');
var fs = require('fs');
var Sequelize = require('sequelize');

const Op = Sequelize.Op;

const url = 'http://localhost:3000/';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/upload/');

    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './public/upload/';
  createFolder(uploadFolder);
var upload = multer({ storage: storage });


var question = require('../models/question');

// 获取试题库列表
router.get('/questionList', function (req, res, next) {
    question.findAll().then(result => {
        if(result){
            res.json({
                code:0,
                data:result,
                msg:"查询成功！"
            });
        }else{
            res.json({
                code:1,
                msg:"查询失败！"
            })
        }
      },err =>{
          res.json({
              code:2,
              msg:"服务器错误！"
          })
      })
});

// 试题查询
router.get('/search', function (req, res, next) {
    let knowledgePoint = req.query.knowledgePoint,
        courseGoal = req.query.courseGoal,
        questionType = req.query.questionType,
        query = {};
        if(knowledgePoint){
            query['knowledgePoint'] = knowledgePoint;
        }   
        if(courseGoal){
            query['courseGoal'] = courseGoal;
        }  
        if(questionType){
            query['questionType'] = questionType;
        }   
        question.findAll({
            where:query  
        }).then(result =>{
            res.json({
                code:0,
                msg:'查询成功！',
                data:result
            })
        },err =>{
            console.log(err);
            res.json({
                code:1,
                msg:'查询失败！'
            })
        }); 
});

//关键词查询
router.get('/blurSearch',function(req,res,next){
    
    let key = req.query.key;
   // key = '%'+ key +'%';
    console.log(key);
    question.findAll({
        where: {
            content: {
                [Op.like]: '%' + key + '%',
            }
        },
    }).then(result =>{
        console.log(result);
        res.json({
            code:0,
            msg:'查询成功！',
            data:result
        })
    },err =>{
        console.log(err);
        res.json({
            code:1,
            msg:"查询失败！"
        })
    });
});

//更新难度系数
router.post("/updateDifficulty",function(req,res,next){
    let questionId = parseInt(req.body.questionId),
        gpa = parseFloat(req.body.gpa),
        difficulty = parseFloat(req.body.difficulty);
       // console.log(questionId,gpa,difficulty);
        
        question.update({
            'gpa':gpa,
            'difficulty':difficulty
        },{
            'where':{
                questionId:questionId
            }
        }).then(result =>{
           if(result[0]===1){
               res.json({
                   code:0,
                   msg:'修改成功！'
               });
               console.log("1");
           }else{
               res.json({
                   code:1,
                   msg:'修改失败！'
               })
           };
        });
        console.log("2");
});

//编辑试题
router.post('/updateQuestion', upload.fields([{name:'qPicture'},{name:"aPicture"}]), function (req, res, next) {
    let qPicture = req.files['qPicture'];
    let aPicture = req.files['aPicture'];
    let qPictureUrl,aPictureUrl; 
    let ediForm = JSON.parse(req.body.ediForm);
   
    if(req.files['qPicture']){
        qPictureUrl = url + 'public/upload/'+ qPicture[0].filename;
        ediForm.qPicture = qPictureUrl;
        console.log(ediForm);
    }
    if(req.files['aPicture']){
        aPictureUrl = url + 'public/upload/'+ aPicture[0].filename;
        ediForm.aPicture = aPictureUrl;
        console.log(ediForm);
    }
    question.update(ediForm,{
        "where":{
            questionId:ediForm.questionId
        }
    }).then(result =>{
        if(result[0]===1){
            res.json({
                code:0,
                msg:'修改成功！'
            })
        }else{
            res.json({
                code:1,
                msg:'修改失败！'
            })
        };
    })
    
});

//删除试题
router.post('/deleteQuestion',function(req,res,next){
    let deleteList = req.body.param;
   // let deleteList = [14,15];
    console.log(deleteList);
    question.destroy({
        "where":{
            questionId:deleteList
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

//创建试题
router.post('/createQuestion', upload.fields([{name:'qPicture'},{name:"aPicture"}]), function (req, res, next) {
    let qPicture = req.files['qPicture'];
    let aPicture = req.files['aPicture'];
    let qPictureUrl,aPictureUrl; 
    let ediForm = JSON.parse(req.body.ediForm);
   
    if(req.files['qPicture']){
        qPictureUrl = url + 'public/upload/'+ qPicture[0].filename;
        ediForm.qPicture = qPictureUrl;
        console.log(ediForm);
    }
    if(req.files['aPicture']){
        aPictureUrl = url + 'public/upload/'+ aPicture[0].filename;
        ediForm.aPicture = aPictureUrl;
        console.log(ediForm);
    }
    question.create(ediForm).then(result =>{
        if(result.dataValues){
            res.json({
                code:0,
                msg:'添加成功！'
            })
        }else{
            res.json({
                code:1,
                msg:'添加失败！'
            })
        };
    })
    
});




module.exports = router;