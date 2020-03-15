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
                <el-button type="primary" style="margin-top:5%;" @click="createVisible = true">创建试卷</el-button>
            </div>
        </div>
         <el-dialog :visible.sync="createVisible" width="90%">
           <div class="handle-box">
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
               
                 <el-input type="number" v-model="query.score" placeholder="分值" style="width:10%;margin-right:2%;"></el-input>
               
                <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
                </el-row>
            </div>
            
                <el-table
                :data="tableData"
                border
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
                <el-table-column prop="difficulty" sortable label="难度系数" width='100'></el-table-column>
                
                </el-table>
             

           
                <div>
                    <el-button type="primary" @click="selectItems" icon="icon el-icon-d-arrow-right">添加到试卷</el-button>
                </div>
            

            
                 <el-table
                :data="resultData"
               
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
                   
                
          
        </el-dialog>
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
                score:''
            },

           

            tableKey: [{
                name: '题目',
                value: 'content',
                label: 100
              },{
                name: '题目图片',
                value: 'qPicture',
                label: 100
              },{
                  name:'题型',
                  value:'questionType',
                  label:100
              },{
                  name:'知识点',
                  value:'knowledgePoint',
                  label:100
              },{
                  name:'课程目标',
                  value:'courseGoal',
                  label:100
              },
              {
                  name:'分值',
                  value:'score',
                  label:50
              },
              {
                  name:'难度系数',
                  value:'difficulty',
                  label:50
              }],

            tableData:[],
            resultData:[],
            
            multipleSelection:[],
            
            filterTableDataEnd:[],
      
            createVisible:false,
            
            idx: -1,
            id: -1,
           
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
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
        //重置
        reset(){
            this.query = {};
            this.getData();  
        },
       
       
        /**
         * 跟据当前索引位置删除数据
         * 同时把该条删除的数据添加到左边待选table中
         */
        handleDelete(index, row,resultData) {
          resultData.splice(index,1);//右边删除数据
          this.filterBeforeData.push(row);
          this.resetData = this.filterBeforeData;
          //根据删除后得到的数据再进行一次搜索展示
          this.realTime();
          this.$emit('dispatchData',this.resultData);
        },
        handleSelectionChange(val){
          this.multipleSelection = val;
        },
        selectItems:function () {
          //等同下一行代码---数组合并,频繁使用用concat会造成内存浪费
          this.resultData.push.apply(this.resultData,this.multipleSelection);
          //把获取的数据发送到父组件
          this.$emit('dispatchData',this.resultData);
          //在返回push数据后剩余的待选列表所有数据赋值到resetData中，然后再在待选列表中显示检索删除被剩余的数据
            this.filterBeforeData = this.overlap(this.filterBeforeData,this.resultData);
            this.resetData = this.filterBeforeData;
          //删除左边被选中的数据,返回待选列表中被剩余的数据
          this.tableData = this.overlap(this.tableData,this.resultData);
          
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
      },
     
      watch:{
        receiveData(val){
          this.tableData = val;
          this.resetData = val;
          this.filterBeforeData =val;
        },
        isCheckValue(val){
            this.resultData = val;
            this.$emit('dispatchData',this.resultData);
        }

    },
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