var express = require('express');           //使用express
var router = express.Router();               //放数据
var papers = require('../models/paper');
var questions = require('../models/question');
var analysis = require('../models/analysis');

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


//查询试卷数据统计
router.get("/analysisData",function(req,res,next){
    let paperId = req.query.paperId;
    console.log(paperId);
    analysis.findOne({
        'where': {
            'paperId': paperId
        }
    }).then(result => {
        res.json(result);
    })
});

//录入试卷数据
router.post("/addAnalysis",function(req,res,next){
    let analy = req.body;
    reformat(analy);
    console.log(analy);
    analysis.destroy({
        'where':{
            paperId:analy.paperId
        }
    });
    analysis.create(analy).then(result =>{
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
    });
});

//统计知识点
router.get("/countPoint",function(req,res,next){
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
    let count = [0,0,0,0,0,0,0];
    questions.findAll({
        where:{
            questionId: questionIds     
        }
    }).then(result =>{
        console.log(result);
        for(let i =0;i<result.length;i++){
            switch(result[i].knowledgePoint){
                case '编译过程概述':
                    count[0]++;
                    break;
                case '语言的形式化基础':
                    count[1]++;
                    break;
                case '词法分析及词法分析程序':
                    count[2]++;
                    break;
                case '语法分析及语法分析程序':
                    count[3]++;
                    break;
                case '语义分析及中间代码生成':
                    count[4]++;
                    break;
                case '符号表管理':
                    count[5]++;
                    break;
                case '运行时的存储管理':
                    count[6]++;
                    break;
            }
        }
        console.log(count);
        res.json(count);
        
    },err =>{
        console.log(err);
    }); 
    
});



//格式转换
function reformat(obj){
    if(obj['max1']){
        obj.max1 = parseInt(obj.max1);
    }
    if(obj['max2']){
        obj.max2 = parseInt(obj.max2);
    }
    if(obj['max3']){
        obj.max3 = parseInt(obj.max3);
    }
    if(obj['min1']){
        obj.min1 = parseInt(obj.min1);
    }
    if(obj['min2']){
        obj.min2 = parseInt(obj.min2);
    }
    if(obj['min3']){
        obj.min3 = parseInt(obj.min3);
    }
    if(obj['gpa1']){
        obj.gpa1 = parseFloat(obj.gpa1);
    }
    if(obj['gpa2']){
        obj.gpa2 = parseFloat(obj.gpa2);
    }
    if(obj['gpa3']){
        obj.gpa3 = parseFloat(obj.gpa3);
    }
    if(obj['sd1']){
        obj.sd1 = parseFloat(obj.sd1);
    }
    if(obj['sd2']){
        obj.sd2 = parseFloat(obj.sd2);
    }
    if(obj['sd3']){
        obj.sd3 = parseFloat(obj.sd3);
    }
};

module.exports = router;