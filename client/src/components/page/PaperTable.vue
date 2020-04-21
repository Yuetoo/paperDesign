<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
            </div>
            <el-table
                :data="paperList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                stripe

                height="400"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleDelSelectionChange">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column prop="paperId" label="试卷编号" width="100" align="center"></el-table-column>
                <el-table-column prop="paperHeader" label="试卷名称" show-overflow-tooltip>
                   
                </el-table-column>
                <el-table-column prop="difficulty" sortable label="难度系数" width='100'></el-table-column>
                <el-table-column prop="course1Score" label="课程目标1分值" width='150'></el-table-column>
                <el-table-column prop="course2Score" label="课程目标2分值" width='150'></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="Delete(scope.$index, scope.row)"
                        >删除</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            style="color:#E6A23C"
                            @click="handleUpdate(scope.$index, scope.row)"
                        >重命名</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="paperList.length">    
                    </el-pagination>
            </div>
        </div>

       
        <!-- 试卷重命名 -->
        <el-dialog title="试卷重命名" :visible.sync="updateVisible" width="30%">
            <el-form label-position='top' ref="form" :model="updateForm" label-width="110px">
                <el-form-item label="请输入试卷名称:">
                    <el-input v-model="updateForm.paperHeader"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUpdate">更新</el-button>
            </span>
        </el-dialog>
        <!-- 编辑试卷 -->
        <el-dialog title="请选择试题" :visible.sync="editVisible" width='90%'>
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
                        <el-progress :percentage="difficulty*100" :color="difficultyColor"></el-progress>
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
            
                <div style="margin-bottom:20px;font-size:18px;">试卷题目列表</div>
            
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
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import axios from 'axios'
export default {
    
    data() {
        return {
            paperList: [],
            pagesize:5,
            currentPage:1,
            delmultipleSelection:[],
            delList: [],
            updateVisible:false,
            updateForm:{},
           
            ediForm: {},
            idx: -1,
            id: -1,
            temp:'',

            query: {
                knowledgePoint: '',
                courseGoal: '',
                questionType:'',
            },
            paper:{},
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
            editVisible: false,
        };
    },
    created() {
        this.getList();
    },
    methods: {
        
        getList() {
            axios.get(this.GLOBAL.url+'paper/paperList')            
                        .then(res =>{       //收到的数据
                           if(res.data.code ===0){
                            this.paperList = res.data.data;
                            console.log(this.paperList);
                             this.currentPage = 1;
                           }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
        },
        getData() {
            axios.get(this.GLOBAL.url+'question/questionList')            
                        .then(res =>{       //收到的数据
                           if(res.data.code ===0){
                            this.tableData = res.data.data;
                            console.log(this.paperList);
                            
                           }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
        },
        getResultData(paper){
             axios.get(this.GLOBAL.url+"paper/paperContent",{
             params:{
                'paper':paper
            }
            })
           .then(res =>{
              console.log(res.data.data);
              this.resultData = res.data.data;
              
           })       
        },
        // 删除操作
        Delete(index, row) {
            // 二次确认删除
            this.idx = this.pagesize*(this.currentPage-1)+index;
            console.log(this.idx);
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.delList.push(row.paperId);
                    console.log(this.delList);
                    
                    axios.post(this.GLOBAL.url + 'paper/deletePaper',{param:this.delList})
                    .then(res =>{
                        console.log(res);
                        this.paperList.splice(this.idx, 1);
                        console.log(this.paperList);
                        this.$message.success('删除成功');
                        this.delList = [];
                    });
                 })
                 .catch(() => {});
        },
        // 多选操作
        handleDelSelectionChange(val) {
            this.delmultipleSelection = val;
            console.log(this.delmultipleSelection);
        },
        delAllSelection() {
            const length = this.delmultipleSelection.length;
            let delList = this.delmultipleSelection.map(function(item){
                        return item.paperId;
            });
           console.log("delList0:",delList);
                    console.log("multiple0:",this.delmultipleSelection);
            this.$confirm('确定要删除这'+length+'条试题吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log("delList1:",delList);
                   
                   
                    axios.post(this.GLOBAL.url + 'paper/deletePaper',{param:delList})
                    .then(res =>{
                        console.log(res);
                        this.getList();
                        this.$message.success('删除成功');
                    });
                 })
                 .catch(() => {});


            this.delmultipleSelection = [];
            this.delList = [];
        },

        handleEdit(index, row) {
            console.log(row);
            this.getResultData(row);
            this.editVisible = true;
            this.reset();
            this.difficulty = row.difficulty;
            this.course1Score = row.course1Score;
            this.course2Score = row.course2Score;
            this.totalScore = this.course1Score + this.course2Score;   
            this.paper = row; 
                         
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
              console.log(res.data.data);
              this.tableData = res.data.data;
              this.currentPage = 1;
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
                this.difficulty = this.difficulty + this.resultData[i].difficulty * this.resultData[i].score;
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
            this.$confirm('确定保存修改吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(() => {
                param['paperId'] = this.paper.paperId;
                param['paperHeader'] = this.paper.paperHeader;
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
                axios.post(this.GLOBAL.url+"paper/updatePaper",param)
                .then(res =>{
                if(res.data.code===0){
                    this.$message.success("保存成功！");
                    this.getList();
                }else{
                    this.$message.error("保存失败！");
                }
                this.editVisible = false;  
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消保存！'
            });       
            });
        },
       
        
        
         // 更新难度系数
        handleUpdate(index, row) {
          //  this.idx = index;
            this.updateForm = row;
            this.updateVisible = true;
        },
        // 保存更新
        saveUpdate() {
            this.updateVisible = false;
            let that = this;
            axios.post(this.GLOBAL.url+"paper/rename",{
                paperId:this.updateForm.paperId,
                paperHeader:this.updateForm.paperHeader
            }).then(res =>{
                if(res.data.code === 0){
                    this.$message.success('更新成功！');
                }
                else{
                    this.$message.error('更新失败！');
                }
            }).catch(err =>{
                console.log(err);
            });
        },

        // 分页导航
       
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },


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