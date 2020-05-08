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
            <!-- <div class="plugins-tips" style="text-indent:2em;line-height:30px;font-size:16px;">
               本课程是软件工程专业的专业限选课。课程主要讲授编译系统的结构及其各组成部分的设计原理与实现技术，包括编译程序的基本过程、语言的形式化基础、词法分析及词法分析程序、语法分析及语法分析程序、语义分析、中间代码生成、信息表格管理、运行时的存储分配。通过本课程的学习，学生能理解编译程序各个模块的基本原理和功能，能够掌握编译系统的基础理论、基本原理和方法，系统认识编译程序的结构和工作流程，以及编译程序的各组成部分的设计原理和实现技术；具备分析、设计、实现和维护编译系统的初步能力，能从语言翻译和表示变换的角度理解计算，在计算思维方面得到拓展提高。
            </div> -->
            <!-- <el-collapse>
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
            </el-collapse> -->
            <el-form :model="parameter">
                <label style="color:#606266;">试卷结构：</label>
                    <el-row style="padding-left:20px;">
                        <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="选择题">
                                <el-input type="number" v-model="parameter.select" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                       <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="填空题">
                                <el-input type="number" v-model="parameter.blank" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="简答题">
                                <el-input type="number" v-model="parameter.QA" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="证明题">
                                <el-input type="number" v-model="parameter.testify" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row style="padding-left:20px;margin-bottom:20px;">
                        <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="分析题">
                                <el-input type="number" v-model="parameter.analysis" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                       <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="计算题">
                                <el-input type="number" v-model="parameter.compute" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item style="margin-top:20px;" label="程序设计题">
                                <el-input type="number" v-model="parameter.program" style="width:30%;"></el-input>
                                <span style="margin-left:10px;color:#606266">道</span>
                            </el-form-item>
                        </el-col>
                       
                    </el-row>
                    <label style="color:#606266;">目标参数：</label>
                    <el-form label-position="right" label-width="125px">
                        <el-form-item label="难度系数" style="margin-top:30px;">
                            <el-input v-model="parameter.difficulty" style="width:30%;"></el-input>
                        </el-form-item>
                        <el-form-item label="课程目标1分值">
                            <el-input v-model="parameter.course1" style="width:30%;"></el-input>
                        </el-form-item>
                        <el-form-item label="课程目标2分值">
                            <el-input v-model="parameter.course2" style="width:30%;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="margin-left:2%;" type="primary" @click="autoCreate">生成试卷</el-button>
                        </el-form-item>
                    </el-form>
            </el-form>
                            <!--试卷预览-->
        <el-dialog :visible.sync="previewVisible" width="60%">
           <el-row style="margin:40px;border-bottom:1px dotted #C0C4CC;padding-bottom:20px;">
                <el-col :span="7" style="margin-right:5%;">
                    <div>总分值：</div>
                    <el-progress :percentage="totalScore" :color="scoreColor"></el-progress>
                    <div>难度系数：</div>
                    <el-progress :percentage="parseInt(difficulty*100)" :color="difficultyColor"></el-progress>
                </el-col>
                <el-col style="text-align:center;margin-right:4%;" :span="4">
                    <el-progress :width="90" type="circle" color="#7B68EE" :percentage="course1Score"></el-progress>
                    <div>课程目标1占分值</div>
                </el-col>
                <el-col style="text-align:center" :span="4">
                    <el-progress type="circle" :width='90' color="#F08080" :percentage="course2Score" ></el-progress>
                    <div>课程目标2占分值</div>
                </el-col> 
                <el-col :span='4' style="display:flex;flex-direction:column;margin-left:6%;">
                    <el-button style="width:100px;margin:10px;" @click="again">再来一次</el-button>
                    <el-button style="width:100px;" @click="savePaper">保存试卷</el-button>
                </el-col>         
            </el-row>
           <div style="width:100%;padding:30px 80px;"> 
               <ol style="list-style-type:upper-roman;">
                   <li v-if="sort.select.length">
                       <h3 style="margin-bottom:20px;">选择题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.select" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                    <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>

                   <li v-if="sort.blank.length">
                       <h3 style="margin-bottom:20px;">填空题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.blank" :key="item.questionId">
                               
                                    <p>{{item.content}}</p>
                                    <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
                   <li v-if="sort.QA.length">
                        <h3 style="margin-bottom:20px;">简答题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.QA" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                    <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
                   <li v-if="sort.testify.length">
                       <h3 style="margin-bottom:20px;">证明题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.testify" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                    <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
                   <li v-if="sort.analysis.length">
                       <h3 style="margin-bottom:20px;">分析题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.analysis" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                     <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
                   <li v-if="sort.compute.length">
                        <h3 style="margin-bottom:20px;">计算题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.compute" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                     <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
                   <li v-if="sort.program.length">
                        <h3 style="margin-bottom:20px;">程序设计题</h3>
                        <ol style="font-size:15px;line-height:25px;">
                            <li v-for="item in sort.program" :key="item.questionId">
                                    <p>{{item.content}}</p>
                                    <div style="width:100%;text-align:center;padding-top:20px;">
                                        <el-image v-if="item.qPicture" :src="item.qPicture" style="width:30%;"></el-image>
                                    </div>
                            </li>
                        </ol>
                   </li>
               </ol>    
           </div>
        </el-dialog>
        <div v-if="loading" style="font-size:100px;color:#C0C4CC;position:absolute;top:40%;left:40%;">
            <i class="el-icon-loading"></i>
        </div> 
    </div>
</div>  
</template>

<script>

import axios from 'axios';

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
           parameter:{
               select:0,
               blank:3,
               QA:3,
               analysis:3,
               compute:2,
               program:1,
               testify:1,
               difficulty:0.5,
               course1:53,
               course2:47
           },
           previewVisible:false,
           sort:{
                select:[],
                blank:[],
                QA:[],
                testify:[],
                analysis:[],
                compute:[],
                program:[]
            },
            questions:[],
            loading: false
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
            let questionIds = this.questions.map(item =>{
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
    again(){
        this.previewVisible = false;
        this.autoCreate();
    },
    autoCreate(){
        this.loading = true;
        console.log("parameter",this.parameter);
        axios.get(this.GLOBAL.url+'autoCreate/create',{
            params:this.parameter
        })
        .then(res =>{
            console.log(res.data);
            this.loading = false;
            let data = res.data;
            this.questions = data.genes;
            this.course1Score = data.course1;
            this.course2Score = data.course2;
            this.totalScore = data.course1 + data.course2;
            this.difficulty = data.difficulty;
            this.sortType(data.genes);
            this.previewVisible = true;
        })
    },
         //试题分类
    sortType:function(arr){
            this.sort ={
                select:[],
                blank:[],
                QA:[],
                testify:[],
                analysis:[],
                compute:[],
                program:[]
            };
            for(let i = 0;i<arr.length;i++){
                if(arr[i].questionType === '选择题'){
                    this.sort.select.push(arr[i]);
                }
                if(arr[i].questionType === '填空题'){
                    this.sort.blank.push(arr[i]);
                }
                if(arr[i].questionType === '简答题'){
                    this.sort.QA.push(arr[i]);
                }
                if(arr[i].questionType === '证明题'){
                    this.sort.testify.push(arr[i]);
                }
                if(arr[i].questionType === '分析题'){
                    this.sort.analysis.push(arr[i]);
                }
                if(arr[i].questionType === '计算题'){
                    this.sort.compute.push(arr[i]);
                }
                if(arr[i].questionType === '程序设计题'){
                    this.sort.program.push(arr[i]);
                }
            }
        }
    }

};
</script>

<style scoped>

*{
    box-sizing: border-box;
}

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