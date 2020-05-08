<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 生成试卷
                </el-breadcrumb-item>
                <el-breadcrumb-item>手动组卷</el-breadcrumb-item>
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
                <el-button type="primary" style="margin-top:5%;" @click="openDialog">创建试卷</el-button>
            </div>
        </div>
         <el-dialog title="请选择试题" :visible.sync="createVisible" width='90%'>
           <div class="handle-box" style="padding-top:0px;">
               <el-row>
                <el-select v-model="query.knowledgePoint" placeholder="知识点" class="handle-select mr10" style="width:200px;">
                    <el-option key="1" label="编译过程概述" value="编译过程概述"></el-option>
                    <el-option key="2" label="语言的形式化基础" value="语言的形式化基础"></el-option>
                    <el-option key="3" label="词法分析及词法分析程序" value="词法分析及词法分析程序"></el-option>
                    <el-option key="4" label="语法分析及语法分析程序" value="语法分析及语法分析程序"></el-option>
                    <el-option key="5" label="语义分析及中间代码生成" value="语义分析及中间代码生成"></el-option>
                    <el-option key="6" label="符号表管理" value="符号表管理"></el-option>
                    <el-option key="7" label="运行时的存储管理" value="运行时的存储管理"></el-option>
                </el-select>
                <el-select v-model="query.courseGoal" placeholder="课程目标" class="handle-select mr10" style="width:120px;">
                    <el-option key="1" label="课程目标 1" value="课程目标1"></el-option>
                    <el-option key="2" label="课程目标 2" value="课程目标2"></el-option>
                </el-select>
                <el-select v-model="query.questionType" placeholder="题型" class="handle-select mr10" style="width:130px;">
                    <el-option key="1" label="选择题" value="选择题"></el-option>
                    <el-option key="2" label="填空题" value="填空题"></el-option>
                    <el-option key="3" label="简答题" value="简答题"></el-option>
                    <el-option key="4" label="证明题" value="证明题"></el-option>
                    <el-option key="5" label="分析题" value="分析题"></el-option>
                    <el-option key="6" label="计算题" value="计算题"></el-option>
                    <el-option key="7" label="程序设计题" value="程序设计题"></el-option>
                </el-select>
               
                <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
                 <el-input v-model="key" placeholder="请输入关键字" style="width:130px;margin-left:3%;"></el-input>
                 <el-button type="info" @click="blurSearch" style="margin-left:10px;">模糊查询</el-button>
                </el-row>
            </div>
            
                <el-table
                :data="tableData"
                border
                :row-style="{height:'16px'}"
                :header-cell-style="{height:'16px'}"
                height="300"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column prop="content" label="题目" show-overflow-tooltip>
                   
                </el-table-column>
                <el-table-column label="题目图片" width="80" align="center">
                    <template slot-scope="scope">
                        <el-image
                            v-if="scope.row.qPicture"
                            class="table-td-thumb"
                            :src="scope.row.qPicture"
                            :preview-src-list="[scope.row.qPicture]"
                        ></el-image>
                    </template>
                </el-table-column>
              
                <el-table-column prop="questionType" width='100' label="题型"></el-table-column>
                <el-table-column prop="knowledgePoint" width='180' label="知识点"></el-table-column>
                <el-table-column prop="courseGoal" width='100' label="课程目标"></el-table-column>
                <el-table-column prop="score" sortable label="分值" width='80'></el-table-column>
                <el-table-column prop="difficulty" sortable label="难度系数" width='120'></el-table-column>
                
                </el-table>
             

           
                <el-row style="margin:40px;">
                    <el-col :span="5" style="margin-top:2%;margin-left:5%;">
                        <el-button type="primary" @click="selectItems" icon="icon el-icon-d-arrow-right">添加到试卷</el-button>
                    </el-col>
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
                           
                </el-row>
            
                <div style="margin-bottom:20px;font-size:18px;">试卷题目列表
                     <el-button
                            type="text"
                            icon="el-icon-view"
                            style="color:#67C23A;margin-left:20px;"
                            @click="preview"
                        >预览</el-button>
                </div>
            
                    <el-table
                    :data="resultData"
                    :row-style="{height:'16px'}"
                    :header-cell-style="{height:'16px'}"
                    height="300"
                    class="table"
                    header-cell-class-name="table-header"
                    >
               
                    <el-table-column prop="content" label="题目" show-overflow-tooltip>
                    
                    </el-table-column>
                    <el-table-column label="题目图片" width="80" align="center">
                        <template slot-scope="scope">
                            <el-image
                                v-if="scope.row.qPicture"
                                class="table-td-thumb"
                                :src="scope.row.qPicture"
                                :preview-src-list="[scope.row.qPicture]"
                            ></el-image>
                        </template>
                    </el-table-column>
                
                    <el-table-column prop="questionType" width='100' label="题型"></el-table-column>
                    <el-table-column prop="knowledgePoint" width='180' label="知识点"></el-table-column>
                    <el-table-column prop="courseGoal" width='100' label="课程目标"></el-table-column>
                    <el-table-column prop="score" sortable label="分值" width='80'></el-table-column>
                    <el-table-column prop="difficulty" sortable label="难度系数" width='100'></el-table-column>
                    <el-table-column width='80' label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click.native.prevent="handleDelete(scope.$index, scope.row,resultData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                   
                    <el-button type="primary" @click="savePaper" style="margin-top:10px;margin-left:90%;">保存试卷</el-button>        
        </el-dialog>
                <!--试卷预览-->
        <el-dialog :visible.sync="previewVisible" width="60%">
           
           <div style="width:100%;padding:50px 80px;"> 
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
    </div>
   
</template>

<script>

import axios from 'axios'
export default {

    data() {
        return {
            query: {
                knowledgePoint: '',
                courseGoal: '',
                questionType:'',
            },
            key:'',
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
           
           previewVisible:false,
           sort:{
                select:[],
                blank:[],
                QA:[],
                testify:[],
                analysis:[],
                compute:[],
                program:[]
            }
        };
    },
    created() {
    },
    methods: {
        
        getData() {
            axios.get(this.GLOBAL.url+'question/questionList')            
                        .then(res =>{       //收到的数据
                           if(res.data.code ===0){
                            this.tableData = res.data.data;
                            console.log(this.tableData);
                             this.currentPage = 1;
                           }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
        },

        openDialog(){
            this.createVisible = true;
            this.reset();
             this.resultData = [];
               this.difficulty = 0;
               this.course1Score = 0;
               this.course2Score = 0;
               this.totalScore = 0;
        },

        //重置
        reset(){
            this.query = {};
            this.getData();  
        },
         // 触发搜索按钮
        handleSearch() {
           
           axios.get(this.GLOBAL.url+"question/search",{
           params:{
               'knowledgePoint':this.query.knowledgePoint,
               'courseGoal':this.query.courseGoal,
               'questionType':this.query.questionType
               }
            })
           .then(res =>{
               if(res.data.code === 0 ){
                   console.log(res.data.data);
                   this.tableData = res.data.data;
                   this.currentPage = 1;
                   this.$message.success("查询成功！");
               }
               else{
                   this.$message.error("查询失败！");
               }
           })
            
        },

           blurSearch() {  
                axios.get(this.GLOBAL.url+"question/blurSearch",{
                params:{
                    'key':this.key,
                    }
                })
                .then(res =>{
                    console.log(res.data.data);
                    if(res.data.code === 0){
                        this.tableData = res.data.data;
                        this.currentPage = 1;
                        this.key = '';
                        this.$message.success("查询成功！");
                    }
                    else{
                        this.$message.error("查询失败！");
                    }
                    
                })
                    
        },
       
        /**
         * 跟据当前索引位置删除数据
         * 同时把该条删除的数据添加到左边待选table中
         */
        handleDelete(index, row,resultData) {
          resultData.splice(index,1);//右边删除数据
          this.tableData.push(row);
          this.calcul();
        },
        handleSelectionChange(val){
          this.multipleSelection = val;
        },
        selectItems:function () {
          //等同下一行代码---数组合并,频繁使用用concat会造成内存浪费
          this.resultData.push.apply(this.resultData,this.multipleSelection);
          this.multipleSelection = [];
          this.tableData = this.overlap(this.tableData,this.resultData);
          this.calcul();
        },
        /**
         * 删除选中item
         * @param arr 数据
         * @param arr2
         * @returns {Array}
         */
        overlap:function(arr, arr2) {
          var arr3 = new Array();
          var index = 0, i = 0, j = 0;
          for (i = 0; i < arr.length; i++) {
            var has = false;
            for (j = 0; j < arr2.length; j++) {
              if (arr[i] == arr2[j]) {
                has = true;
                break;
              }
            }
            if (!has) {
              arr3[index++] = arr[i];
            }
          }
          return arr3;
        }, 


        calcul() {
            this.totalScore = 0;
            this.course1Score = 0;
            this.course2Score = 0;
            this.difficulty = 0;
            for(let i=0;i<this.resultData.length;i++){
                this.totalScore = this.totalScore + this.resultData[i].score;
                this.difficulty = this.difficulty + this.resultData[i].difficulty*this.resultData[i].score;
                
                this.course1Score = this.addupScore(1);
                this.course2Score = this.addupScore(2);
            }
            this.difficulty = parseFloat((this.difficulty / this.totalScore).toFixed(2));
            console.log(this.difficulty);
        },

    addupScore(courseGoal){
        let temp = [],total=0;
        if(courseGoal == 1){
            temp = this.resultData.filter(item =>{
                return item.courseGoal === '课程目标1'
            })
        }else{
             temp = this.resultData.filter(item =>{
                return item.courseGoal === '课程目标2'
            })
        }
        for(let i = 0;i<temp.length;i++){
            total = total + temp[i].score;
        }
        return total;
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
    preview(){
        this.previewVisible = true;
        this.sortType(this.resultData);
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