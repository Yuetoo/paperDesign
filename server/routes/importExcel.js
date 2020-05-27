var express = require('express');           //使用express
var router = express.Router();  
const XLSX = require("xlsx");
var question = require('../models/question');
var PATH = require('path');
var multer = require('multer');
var fs = require('fs');

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

router.post("/upload",upload.single('files'),function(req,res,next){
    console.log(req.file);
    let filename = req.file.filename;
    console.log(filename);
    let path = PATH.resolve(__dirname, '../public/upload/'+filename);
    
    importExcel(path, function (err) {
        if(err){
            console.log(err);
        } else {
            fs.unlinkSync(path);
            res.json({
                code:200,
                msg:"已更新至数据库！"
            })
        }
    })
})

async function importExcel(filePath, callback) {
    var err = null;
    try {
        
        var workbook = XLSX.readFile(filePath);　//整个　excel　文档
        var sheetNames = workbook.SheetNames; //获取所有工作薄名
        //解析
        var sheet1 = workbook.Sheets[sheetNames[0]]; //根据工作薄名获取工作薄

        /*
         sheet1['!ref']　获取工作薄的有效范围　'A1:C20'
         XLSX.utils.decode_range 将有效范围转为　range对象
         range: {s: {r:0, c:0}, e: {r:10, 3}}
         */
        var range = XLSX.utils.decode_range(sheet1['!ref']);

        //循环获取单元格值
        for(let R = range.s.r+1; R <= range.e.r; ++R) {
            let row = {},flag = false;
            //console.log(R);
            for(let C = range.s.c; C <= range.e.c; ++C) {
               // console.log(C);
                let row_value = null;
                let cell_address = {c:C, r:R}; //获取单元格地址
                let cell = XLSX.utils.encode_cell(cell_address); //根据单元格地址获取单元格
                 if(sheet1[cell]) //获取单元格值
                    row_value = sheet1[cell].v;
                 else
                     row_value = '';
                let cap = cell.slice(0,1);
                let arr = ['content','answer','questionType','knowledgePoint','difficulty','courseGoal','score'];
                switch (cap){
                    case 'A':
                        row[arr[0]] = row_value;
                        break;
                    case 'B':
                        row[arr[1]] = row_value;
                        break;
                    case 'C':
                        row[arr[2]] = row_value;
                        break;
                    case 'D':
                        row[arr[3]] = row_value;
                        break;
                    case 'E':
                        row[arr[4]] = row_value;
                        break;              
                    case 'F':
                        row[arr[5]] = row_value;
                        break;
                    case 'G':
                        row[arr[6]] = row_value;
                        break;
                }
            }
        // data.push(row); 
            let r =  await addQuestion(row);
        }
    } catch (e) {
        err = '解析出错' + e.toString();
    }

    callback(err);
}

function addQuestion(q){
    return new Promise((resolve,reject) =>{
        question.create(q).then(result =>{
            if(result.dataValues){
               resolve("添加成功！");
            }else{
               reject("添加失败！");
            };
        })
    })
}


module.exports = router;