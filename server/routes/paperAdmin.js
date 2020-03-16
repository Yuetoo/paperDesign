var express = require('express');           //使用express
var router = express.Router();               //放数据
var papers = require('../models/paper');
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
router.get('/paperHeader',function(req,res,next){
    papers.findAll().then(result => {
        if(result){
            let headerList = result.map(item =>{
                return {paperId:item.paperId,paperHeader:item.paperHeader}
            });
            console.log(headerList);
            res.json({
                code:0,
                data:headerList,
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


module.exports = router;