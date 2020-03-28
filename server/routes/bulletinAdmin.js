var express = require('express');           //使用express
var router = express.Router();               //放数据
var bulletin = require('../models/bulletin');

router.get('/getList',function(req,res,next){
    bulletin.findAll({
        order: [
            ['date','DESC']
        ]
    })
    .then(result =>{
        console.log(result);
        if(result.length<=5){
            res.json(result);
        }else{
            result = result.splice(0,5);
            res.json(result);
        }
    })
});

router.post('/publish',function(req,res,next){
    let data = req.body;
    data.date = new Date(data.date);
    console.log(data);
    bulletin.create(data).then(result =>{
        console.log(result);
    })
});

module.exports = router;
