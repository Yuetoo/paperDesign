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
            </div>
            <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                height="400"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column prop="questionId" label="试题编号" width="55" align="center"></el-table-column>
                <el-table-column prop="content" label="题目" width='80' show-overflow-tooltip>
                   
                </el-table-column>
                <el-table-column label="题目图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            v-if="scope.row.qPicture"
                            class="table-td-thumb"
                            :src="scope.row.qPicture"
                            :preview-src-list="[scope.row.qPicture]"
                        ></el-image>
                    </template>
                </el-table-column>
               <el-table-column prop="answer" label="答案" width='80' show-overflow-tooltip>
                   
                </el-table-column>
                <el-table-column label="答案图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            v-if="scope.row.aPicture"
                            class="table-td-thumb"
                            :src="scope.row.aPicture"
                            :preview-src-list="[scope.row.aPicture]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="questionType" label="题型"></el-table-column>
                <el-table-column prop="knowledgePoint" label="知识点"></el-table-column>
                <el-table-column prop="courseGoal" label="课程目标"></el-table-column>
                <el-table-column prop="difficulty" sortable label="难度系数" width='50'></el-table-column>
                <el-table-column prop="score" sortable label="分值" width='50'></el-table-column>
                <el-table-column prop="gpa" sortable label="平均分" width='50'></el-table-column>
                <el-table-column label="操作" width="140" align="center">
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
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            style="color:#E6A23C"
                            @click="handleUpdate(scope.$index, scope.row)"
                        >更新难度系数</el-button>
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
                            :total="tableData.length">    
                    </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="70%">
            <el-form ref="form" :model="ediForm" label-width="70px">
                <el-form-item label="题目">
                    <el-col :span="11">
                        <el-input v-model="ediForm.content" type="textarea" :rows="9"></el-input>
                    </el-col>
                    <el-col :span="10.5" style="margin-left:20px;">
                        <el-upload
                        class="avatar-uploader"
                        
                        action="aaa"
                        :show-file-list="false"
                        
                        :on-change="handleChange"
                        :auto-upload="false"
                        :data="ediForm"
                        
                       >
                            <img v-if="ediForm.qPicture" style="width:100%;" :src="ediForm.qPicture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                        </el-upload>
                    </el-col>
                </el-form-item>

                <el-form-item label="答案">
                    <el-col :span="11">
                        <el-input v-model="ediForm.answer" type="textarea" :rows="9"></el-input>
                    </el-col>
                   <el-col :span="10.5" style="margin-left:20px;">
                        <el-upload
                        class="avatar-uploader"
                        action="aaa"
                        :show-file-list="false"
                       
                        
                        :on-change="hdChange"
                        :auto-upload="false"
                        :data="ediForm">
                            <img v-if="ediForm.aPicture" style="width:100%;" :src="ediForm.aPicture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                   </el-col>

                </el-form-item>
            <el-form-item>
                <el-col :span="6">
                    <el-select v-model="ediForm.knowledgePoint" placeholder="知识点" class="handle-select mr10" style="width:200px;">
                        <el-option key="1" label="编译过程概述" value="编译过程概述"></el-option>
                        <el-option key="2" label="语言的形式化基础" value="语言的形式化基础"></el-option>
                        <el-option key="3" label="词法分析及词法分析程序" value="词法分析及词法分析程序"></el-option>
                        <el-option key="4" label="语法分析及语法分析程序" value="语法分析及语法分析程序"></el-option>
                        <el-option key="5" label="语义分析及中间代码生成" value="语义分析及中间代码生成"></el-option>
                        <el-option key="6" label="符号表管理" value="符号表管理"></el-option>
                        <el-option key="7" label="运行时的存储管理" value="运行时的存储管理"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" style="margin-left:10px;">
                    <el-select v-model="ediForm.courseGoal" placeholder="课程目标" class="handle-select mr10" style="width:120px;">
                        <el-option key="1" label="课程目标 1" value="课程目标1"></el-option>
                        <el-option key="2" label="课程目标 2" value="课程目标2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ediForm.questionType" placeholder="题型" class="handle-select mr10" style="width:130px;">
                        <el-option key="1" label="选择题" value="选择题"></el-option>
                        <el-option key="2" label="填空题" value="填空题"></el-option>
                        <el-option key="3" label="简答题" value="简答题"></el-option>
                        <el-option key="4" label="证明题" value="证明题"></el-option>
                        <el-option key="5" label="分析题" value="分析题"></el-option>
                        <el-option key="6" label="计算题" value="计算题"></el-option>
                        <el-option key="7" label="程序设计题" value="程序设计题"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="分值：">
                        <el-input type="number" v-model="ediForm.score"></el-input>
                    </el-form-item>
                </el-col>
                    
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rescind">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 更新难度系数 -->
        <el-dialog title="更新难度系数" :visible.sync="updateVisible" width="30%">
            <el-form ref="form" :model="updateForm" label-width="110px">
                <el-form-item label="请输入平均分:">
                    <el-input v-model="updateForm.gpa" type='number' oninput="value=value.replace(/[^\d.]/g,'')" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUpdate">更新</el-button>
            </span>
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
            },

            tableData: [],
            pagesize:5,
            currentPage:1,
          
            multipleSelection: [],
            delList: [],
            
            updateVisible:false,
            updateForm:{},

            editVisible: false,
            ediForm: {},
            
            idx: -1,
            id: -1,

            temp:''
           
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

        // 触发搜索按钮
        handleSearch() {
           // this.$set(this.query, 'pageIndex', 1);
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
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.idx = this.pagesize*(this.currentPage-1)+index;
            console.log(this.idx);
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.delList.push(row.questionId);
                    console.log(this.delList);
                    
                    axios.post(this.GLOBAL.url + 'question/deleteQuestion',{param:this.delList})
                    .then(res =>{
                        console.log(res);
                        this.tableData.splice(this.idx, 1);
                        console.log(this.tableData);
                        this.$message.success('删除成功');
                        this.delList = [];
                    });
                 })
                 .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let delList = this.multipleSelection.map(function(item){
                        return item.questionId;
            });
           console.log("delList0:",delList);
                    console.log("multiple0:",this.multipleSelection);
            this.$confirm('确定要删除这'+length+'条试题吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log("delList1:",delList);
                    axios.post(this.GLOBAL.url + 'question/deleteQuestion',{param:delList})
                    .then(res =>{
                        console.log(res);
                        this.getData();
                        this.$message.success('删除成功');
                    });
                 })
                 .catch(() => {});


            this.multipleSelection = [];
            this.delList = [];
        },
        // 编辑操作
        handleEdit(index, row) {
           // this.idx = index;
            this.ediForm = row;
            this.temp = JSON.stringify(row);
            this.editVisible = true;
            this.param = new FormData();
        },
        handleChange (file, fileList) { 
                this.ediForm.qPicture = URL.createObjectURL(file.raw);
                 this.param.delete('qPicture');
                 this.param.append('qPicture',file.raw);
                 console.log(this.param.get('qPicture'));       
        },
        hdChange (file, fileList) {
                this.ediForm.aPicture = URL.createObjectURL(file.raw);
                 this.param.delete('aPicture');
                 this.param.append('aPicture',file.raw); 
        },
        rescind() {
            this.editVisible = false;
            let obj = JSON.parse(this.temp);
            Object.keys(obj).forEach(key => this.ediForm[key] = obj[key]);
            this.param = null;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.param.delete('ediForm');
            this.param.append('ediForm',JSON.stringify(this.ediForm));
            
           let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
         
           axios.post(this.GLOBAL.url+"question/updateQuestion",this.param,config).then(res =>{
               console.log(res.data);
               if(res.data.code===0){
                   this.$message.success("修改成功！");
               }else{
                   this.$message.error("修改失败！");
               }
               this.param.delete('qPicture');
               this.param.delete('aPicture');
           })
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
            this.updateForm.difficulty = (1 - (this.updateForm.gpa/this.updateForm.score)).toFixed(2);
            console.log('平均分：',this.updateForm.gpa);
            console.log('难度系数：',this.updateForm.difficulty);
            let that = this;
            axios.post(this.GLOBAL.url+"question/updateDifficulty",{
                questionId:this.updateForm.questionId,
                gpa:this.updateForm.gpa,
                difficulty:this.updateForm.difficulty
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
   .el-tooltip__popper{max-width:70%;font-size: 18px;line-height: 50px;padding-left:20px;padding-right:20px;}
  .el-tooltip__popper,.el-tooltip__popper.is-dark{background:	#FFF8DC !important;
    color: #303133 !important;}
 
 
</style>