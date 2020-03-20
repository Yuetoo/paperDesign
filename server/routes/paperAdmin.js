var express = require('express');           //使用express
var router = express.Router();               //放数据
var papers = require('../models/paper');
var questions = require('../models/question');

//创建新试卷
router.post('/createPaper',function(req,res,next){
    var paper = req.body;
    console.log(paper);
    papers.create(paper).then(result =>{
        if(result.dataValues){
            res.json({
                code:0,
                msg:'保存成功！'
            })
        }else{
            res.json({
                code:1,
                msg:'保存失败！'
            })
        };
    })
});
//获取试卷列表
router.get('/paperList',function(req,res,next){
    papers.findAll().then(result => {
        if(result){
            res.json({
                code:0,
                data:result,
                msg:"查询成功！"
            });
        }
      },err =>{
          res.json({
              code:1,
              msg:"服务器错误！"
          })
      })
});

//获取试卷内容
router.get('/paperContent',function(req,res,next){
    let paper = JSON.parse(req.query.paper);
    let questionIds = [];
    console.log(paper);
    let attr = ['question1','question2','question3','question4','question5','question6','question7','question8','question9','question10',
                'question11','question12','question13','question14','question15','question16','question17','question18','question19','question20'];
    for(let i = 0;i<attr.length;i++){
        if(paper[attr[i]]){
            questionIds.push(paper[attr[i]]);
        }
    };
    console.log(questionIds);
    
    questions.findAll({
        where:{
            questionId: questionIds     
        }
    }).then(result =>{
        console.log(result);
        res.json({
            data:result
        })
    },err =>{
        console.log(err);
    }); 

});

//更新试卷
router.post('/updatePaper',function(req,res,next){
    var paper = req.body;
    papers.destroy({
        'where':{
            paperId:paper.paperId
        }
    });
    papers.create(paper).then(result =>{
        console.log(result.dataValues);
        if(result.dataValues){
            res.json({
                code:0,
                msg:'更新成功！'
            })
        }else{
            res.json({
                code:1,
                msg:'更新失败！'
            })
        };
    })
});

//删除试卷
router.post('/deletePaper',function(req,res,next){
    let deleteList = req.body.param;
    console.log(deleteList);
    papers.destroy({
        "where":{
            paperId:deleteList
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

//试卷重命名
router.post("/rename",function(req,res,next){
    let paperHeader = req.body.paperHeader,
        paperId = req.body.paperId;
        papers.update({
            'paperHeader':paperHeader,
        },{
            'where':{
                paperId:paperId
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

module.exports = router;