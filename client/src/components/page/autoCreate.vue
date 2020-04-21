<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 生成试卷
                </el-breadcrumb-item>
                <el-breadcrumb-item>智能组卷</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="plugins-tips" style="text-indent:2em;line-height:30px;font-size:16px;">
               本课程是软件工程专业的专业限选课。课程主要讲授编译系统的结构及其各组成部分的设计原理与实现技术，包括编译程序的基本过程、语言的形式化基础、词法分析及词法分析程序、语法分析及语法分析程序、语义分析、中间代码生成、信息表格管理、运行时的存储分配。通过本课程的学习，学生能理解编译程序各个模块的基本原理和功能，能够掌握编译系统的基础理论、基本原理和方法，系统认识编译程序的结构和工作流程，以及编译程序的各组成部分的设计原理和实现技术；具备分析、设计、实现和维护编译系统的初步能力，能从语言翻译和表示变换的角度理解计算，在计算思维方面得到拓展提高。
            </div>
            <el-collapse>
                <el-collapse-item title="  课程目标 1" name="1">
                    <div>掌握语言的形式化基础知识;</div>
                    <div>掌握有限自动机理论、正规文法与正规式的理论，理解源程序单词的表示方法、识别方法；</div>
                    <div>掌握自顶向下和自底向上的语法分析方法的基本工作原理，掌握 LL（1）文法、LR 类文法的理论；</div>
                    <div>掌握属性翻译文法基础知识和基本原理，中间语言的描述形式及生成技术；</div>
                    <div>能理解并运用相关语言和问题的专业表述方法、基本原理和分析技术，对编译系统中的词法分析模块、语法分析模块和语义分析模块进行表示和分析；</div>
                </el-collapse-item>
                <el-collapse-item title="  课程目标 2" name="2">
                    <div>掌握编译程序主要组成部分的基本原理及设计方法；</div>
                    <div>掌握词法分析程序、语法分析程序及语义分析程序的结构、工作流程和设计原理及技术；</div>
                    <div>理解程序运行中的存储组织与分配方法；</div>
                    <div>掌握有限自动机理论、正规文法与正规式的理论；</div>
                    <div>掌握符号表的设计技术；</div>
                    <div>掌握自顶向下和自底向上的语法分析器的基本工作原理，掌握 LL（1）文法、LR 类文法的理论，掌握 LL（1）分析表的构造方法、LR 类分析表的构造方法，理解预测分析器、递归下降分析器、LR 类分析器的实现过程；</div>
                    <div>掌握属性翻译文法基础知识和基本原理及中间语言的生成技术，能综合运用掌握的基本原理和分析技术，对编译系统中的词法分析模块、语法分析模块和语义分析模块，选用或建立适当的模型进行表示和分析，并初步具备实现词法、语法、语义分析模块的能力；</div>
                    
                </el-collapse-item>
            </el-collapse>
            <div style="text-align:center">
                <el-button type="primary" style="margin-top:5%;" @click="openDialog">设置参数</el-button>
            </div>
        </div>
        
    </div>
   
</template>

<script>
import { fetchData } from '../../api/index';
import axios from 'axios'
export default {

    data() {
        return {
            query: {
                knowledgePoint: '',
                courseGoal: '',
                questionType:'',
            },
            difficultyColor:[{color:"#F5DEB3",percentage:50},
                        {color:"#F4A460",percentage:80},
                        {color:"#FF4500",percentage:100}],
            scoreColor:[{color:"#66CDAA",percentage:50},
                        {color:"#5F9EA0",percentage:80},
                        {color:"#20B2AA",percentage:100}],
            totalScore:0,
            difficulty:0,
            course1Score:0,
            course2Score:0,

            tableData:[],
            resultData:[],
           
            
            multipleSelection:[],
      
            createVisible:false,
            selectPaper:false,
           
        };
    },
    created() {
    },
    methods: {
        
       
        openDialog(){
           
            axios.get(this.GLOBAL.url+'autoCreate/create')
            .then(res =>{
                console.log(res);
            });
        },

    savePaper(){
         let param = {};
         var attr = ['question1','question2','question3','question4','question5','question6','question7','question8','question9','question10','question11','question12','question13','question14','question15','question16','question17','question18','question19','question20'];
         this.$prompt('请输入试卷名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
            param['paperHeader'] = value;
            param['difficulty'] = this.difficulty;
            param['course1Score'] = this.course1Score;
            param['course2Score'] = this.course2Score;
            let questionIds = this.resultData.map(item =>{
                return item.questionId;
            });
            
            for(let i = 0;i<questionIds.length;i++){
                param[attr[i]] = questionIds[i];
            }
            console.log(param);
            axios.post(this.GLOBAL.url+"paper/createPaper",param)
            .then(res =>{
               if(res.data.code===0){
                   this.$message.success("保存成功！");
               }else{
                   this.$message.error("保存失败！");
               }
               this.createVisible = false;  
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消保存！'
          });       
        });
    },
}
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.el-tooltip{
    background-color: blanchedalmond;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
   
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width:178px;
    height: 178px;
    display: block;
  }

</style>
<style lang="css">
   .el-tooltip__popper{max-width:70%;font-size: 18px;line-height: 50px;text-indent: 2em;}
  .el-tooltip__popper,.el-tooltip__popper.is-dark{background:	#FFF8DC !important;
    color: #303133 !important;}
 
 
</style>