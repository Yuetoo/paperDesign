var express = require('express');           //使用express
var router = express.Router();               //放数据
var papers = require('../models/paper');
var questions = require('../models/question');

router.get("/create",async function(req,res,next){
    let param = req.query;
    //试卷相关参数
    let ep = parseFloat(param.difficulty),
        COURSE1 = parseInt(param.course1),
        COURSE2 = parseInt(param.course2),
        selectNum = parseInt(param.select),
        blankNum = parseInt(param.blank),
        QANum = parseInt(param.QA),
        testifyNum = parseInt(param.testify),
        analysisNum = parseInt(param.analysis),
        computeNum = parseInt(param.compute),
        programNum = parseInt(param.program);  
    //算法相关参数
    let FITNESS = 0.9, COUNT = 40,count = 0,size = 50,init = true,mutationRate = 0.004; //变异概率在 0.001~0.1 之间最佳;
    //初始化种群
    let population = await initialise(size,init,ep,COURSE1,COURSE2,selectNum,blankNum,QANum,testifyNum,analysisNum,computeNum,programNum);
    while(population.fittest.fitness < FITNESS && count != COUNT){
        let selection = await select(population,48); // 选择
        population = await cross(selection,50,ep,COURSE1,COURSE2); //交叉
        if(population.fittest.fitness < FITNESS){
            for(let i = 0;i<population.test.length;i++){
                population.test[i] = await change(population.test[i],mutationRate); //变异
                population.test[i].fitness = await getFitness(          //计算适应度
                    ep,
                    population.test[i].difficulty,
                    COURSE1,
                    COURSE2,
                    population.test[i].course1,
                    population.test[i].course2);
                if(i == population.test.length - 1){
                    population.getFittest();
                }
            }
            count++;
        }
    }   
    console.log("result:",population.fittest);
    res.json(population.fittest);
});


//试卷
function Paper(){
    this.genes = new Array();
    this.difficulty;
    this.fitness;
    this.total;
    this.course1;
    this.course2;
}

Paper.prototype = {
    constructor:Paper,
    initData:function(){
        this.difficulty = 0;
        this.fitness = 0;
        this.total = 0;
        this.course1 = 0;
        this.course2 = 0;
        // 难度系数 = （每题的难度*每题分值）求和/分值总和
        for(let i = 0;i<this.genes.length;i++){
            this.difficulty = this.difficulty + this.genes[i].difficulty*this.genes[i].score;
            this.total = this.total + this.genes[i].score;
            if(this.genes[i].courseGoal === '课程目标1'){
                this.course1 += this.genes[i].score;
            }
            if(this.genes[i].courseGoal === '课程目标2'){
                this.course2 += this.genes[i].score;
            }
        }
        this.difficulty = parseFloat((this.difficulty / this.total).toFixed(2));
       // this.fitness = await getFitness(ep,this.difficulty,COURSE1,COURSE2,this.course1,this.course2);
       
    } 
}
/**  f(适应度) = f(难度系数)*0.5 + f(课程目目标)*0.5    这里我设置难度系数和课程目标的权重都为0.5
 *   f(难度系数) = 1 - | EP(期望试卷难度) - P(试卷难度) |
 *   f(课程目标) = 1 - | 期望目标1分值 - 目标1分值 |*0.5 - | 期望目标2分值 - 目标2分值 |*0.5
 *   适应度函数 = 1 - |EP - P|*0.5 - |(COURSE1 - course1)/100|*0.25 - |(COURSE2 - course2)/100|*0.25
**/
function getFitness(ep,difficulty,COURSE1,COURSE2,course1,course2){
    return new Promise(resolve =>{
        let factor1 = parseFloat((Math.abs(ep - difficulty)*0.5).toFixed(2));
        let factor2 = parseFloat((Math.abs((COURSE1 - course1)/100)*0.25).toFixed(2));
        let factor3 = parseFloat((Math.abs((COURSE2 - course2)/100)*0.25).toFixed(2));
        let result = parseFloat((1 - factor1 - factor2 - factor3).toFixed(2));
        resolve(result);
        
    })
}

//随机获取试题
function getQuestion(questionType,paper){
    return new Promise(resolve =>{
        let type = questionType;
        questions.findAll({
            'where':{
                'questionType':type
            }
        }).then(result =>{
            let random,question;
             do{
                 random = Math.round(Math.random()*(result.length - 1));
                 question = result[random];
                // flag = checkQuestion(paper,question);
                //  console.log("flag:",flag);
             }
             while(checkQuestion(paper,question));
             resolve(question);
        });
    })
}
//试题查重
function checkQuestion(paper,question){
     for(let i = 0;i<paper.genes.length;i++){
        // console.log(paper);
        if(paper.genes[i]&&(paper.genes[i].questionId == question.questionId)){
           // console.log("有重！");
            return true;
        }
         else if(i == paper.genes.length - 1){
             return false;
        }
     }
 }
//随机组成试卷
function getTest(selectNum,blankNum,QANum,testifyNum,analysisNum,computeNum,programNum){
    return new Promise(async(resolve) =>{
        let totalNum = selectNum + blankNum + QANum + testifyNum + analysisNum + computeNum + programNum ;
        let paper = new Paper();
        for(let i = 0;i<selectNum;i++){
            paper.genes[i] = await getQuestion('选择题',paper); 
        }
        for(let i = selectNum;i<blankNum + selectNum;i++){
            paper.genes[i] = await getQuestion('填空题', paper);
        }
        for(let i = blankNum + selectNum;i<blankNum + selectNum + QANum;i++){
            paper.genes[i] = await getQuestion('简答题',paper);
        }
        for(let i = blankNum + selectNum + QANum;i<blankNum + selectNum + QANum + testifyNum;i++){
            paper.genes[i] = await getQuestion('证明题',paper);
        }
        for(let i = blankNum + selectNum + QANum + testifyNum;i<blankNum + selectNum + QANum + testifyNum + analysisNum;i++){
            paper.genes[i] = await getQuestion('分析题',paper);
        }
        for(let i = blankNum + selectNum + QANum + testifyNum + analysisNum;i<blankNum + selectNum + QANum + testifyNum + analysisNum + computeNum;i++){
            paper.genes[i] = await getQuestion('计算题',paper);   
        }
        for(let i = totalNum - programNum;i<totalNum;i++){
            paper.genes[i] = await getQuestion('程序设计题',paper);  
            if(i === totalNum - 1){
                resolve(paper);
            } 
        }
    })
}
//种群
function Population(){
    this.test = new Array();
    this.fittest;
}
Population.prototype = {
    constructor:Population,
    getFittest:function(){
        this.fittest = this.test[0];
        for(let i = 0;i<this.test.length;i++){
            if(this.fittest.fitness < this.test[i].fitness){
                this.fittest = this.test[i];
            }
        }
    }
}
//种群初始化
function initialise(size,init,ep,COURSE1,COURSE2,selectNum,blankNum,QANum,testifyNum,analysisNum,computeNum,programNum){
    return new Promise(async(resolve)=>{
        if(init){
            let population = new Population();
            for(let i = 0;i<size;i++){
                let paper = await getTest(selectNum,blankNum,QANum,testifyNum,analysisNum,computeNum,programNum);
                paper.initData();
                paper.fitness = await getFitness(ep,paper.difficulty,COURSE1,COURSE2,paper.course1,paper.course2);
                population.test[i] = paper;
                if(i === size - 1){
                    population.getFittest();
                    resolve(population);
                }    
            }
        }
    });   
}
//选择算子  轮盘赌选择
function select(population,count){
    return new Promise((resolve)=>{
        let selection = new Population();
        let selected = new Array(population.test.length);
        let totalAdaptation = 0,times = 0;
        for(let i = 0;i<population.test.length;i++){
            totalAdaptation += population.test[i].fitness;
        }
        while(times!=count){
            let random = Math.random()*totalAdaptation,degree = 0;
            for(let j = 0;j<population.test.length;j++){
                degree += population.test[j].fitness;
                if(degree >= random){
                    //查重
                    if(!selected[j]){
                        selection.test.push(population.test[j]);
                        selected[j] = 1;
                        times++;
                    }    
                    break;
                }
            }
            if(times === count){
                console.log("selected:",selected);
                resolve(selection);
            }
        }
     })
}
//单点交叉
function cross(population,newNum,ep,COURSE1,COURSE2){
    return new Promise(async(resolve)=>{
        let count = 0;
        while(count != newNum){
            let indexOne = Math.round(Math.random()*(population.test.length-1)),
                indexTwo = Math.round(Math.random()*(population.test.length-1));
            
            if(indexOne != indexTwo){
                let paperOne = new Paper(population.test[indexOne].genes.length);
                let paperTwo = new Paper(population.test[indexTwo].genes.length);
                paperOne.genes = [].concat(population.test[indexOne].genes);
                paperTwo.genes = [].concat(population.test[indexTwo].genes);
               // console.log("paperOne:",paperOne);
                let random = Math.round(Math.random()*(paperOne.genes.length -2));
               // console.log("random",random);
                for(let i = random;i<random + 2;i++){
                    let temp1 = JSON.parse(JSON.stringify(paperOne.genes[i]));
                    let temp2 = JSON.parse(JSON.stringify(paperTwo.genes[i]));
                    if(!checkQuestion(paperOne,temp2)&& count < newNum){
                        paperOne.genes[i] = temp2;
                        paperOne.initData();
                        paperOne.fitness = await getFitness(ep,paperOne.difficulty,COURSE1,COURSE2,paperOne.course1,paperOne.course2);
                        population.test.push(paperOne);
                        //population.getFittest();
                        count++;  
                    }
                    if(!checkQuestion(paperTwo,temp1)&& count < newNum){
                        paperTwo.genes[i] = temp1;
                        paperTwo.initData();
                        paperTwo.fitness = await getFitness(ep,paperTwo.difficulty,COURSE1,COURSE2,paperTwo.course1,paperTwo.course2);
                        population.test.push(paperTwo);
                        //population.getFittest();
                        count++;
                    }
                    if(count === newNum){
                        population.getFittest();
                        resolve(population);
                        break;
                    }
                }
                
            }
        }
    })
}

//变异
function change(paper,mutationRate){
    return new Promise(async(resolve) =>{
        for(let i = 0;i<paper.genes.length;i++){
            if(Math.random()<mutationRate){
                let questionType = paper.genes[i].questionType;
                console.log("变异前：",paper.genes[i]);
                paper.genes[i] = await getQuestion(questionType,paper);   
                console.log("变异后：",paper.genes[i]);
            }
            if(i == paper.genes.length - 1){
                paper.initData();
                resolve(paper);
            }
        }
    })
}

module.exports = router;
