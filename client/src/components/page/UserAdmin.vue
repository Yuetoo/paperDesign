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
                <el-button
                    type="primary"
                    icon="el-icon-lx-tag"
                    class="handle-del mr10"
                    @click="resetPassword"
                >批量重置密码</el-button>
                <el-input v-model="userId" style="width:15%;margin-left:10%;margin-right:10px;" placeholder="请输入教师工号"></el-input>
             <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
             <el-button type="info" icon="el-icon-refresh" @click="reset">重置</el-button>
                <el-button
                    type="warning"
                    icon="el-icon-lx-add"
                    class="handle-del mr10"
                    @click="addVisible=true"
                >添加账号</el-button>
            </div>
            <el-table
                :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                stripe

                height="350"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleDelSelectionChange">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column prop="userId" sortable label="用户工号" width="" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名称" width="">
                   
                </el-table-column>
                
                <el-table-column label="用户等级" width='100'>
                    <template slot-scope="scope">
                       <span v-if="scope.row.userRank == 0">普通用户</span>
                       <span v-if="scope.row.userRank == 1">管理员</span>
                    </template>
                   
                </el-table-column>
               
                <el-table-column label="操作" align="center">
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
                            icon="el-icon-lx-tag"
                            style="color:#E6A23C"
                            @click="resetP(scope.$index, scope.row)"
                        >密码重置</el-button>
                      
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
                            :total="userList.length">    
                    </el-pagination>
                    

            </div>
             
        </div>

       
        <!-- 添加用户 -->
        <el-dialog title="添加账号" :visible.sync="addVisible" width="30%">
            <el-form label-position='top' ref="form" :model="addForm" label-width="110px">
                <el-form-item label="请输入用户账号:">
                    <el-input v-model="addForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="请输入用户姓名:">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="请输入用户初始密码:">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="请选择用户等级:">
                    <el-select v-model="addForm.userRank" placeholder="用户等级">
                        <el-option label="普通用户" value="0"></el-option>
                        <el-option label="管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑用户 -->
        <el-dialog title="编辑账号" :visible.sync="editVisible" width="30%">
            <el-form label-position='top' ref="form" :model="editForm" label-width="110px">
                <el-form-item label="用户姓名:">
                    <el-input v-model="editForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户等级:">
                    <el-select v-model="editForm.userRank" placeholder="用户等级">
                        <el-option label="普通用户" value="0"></el-option>
                        <el-option label="管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取消</el-button>
                <el-button type="primary" @click="submitEdit">确定</el-button>
            </span>
        </el-dialog>
      
    </div>
</template>

<script>

import axios from 'axios'
export default {
    
    data() {
        return {
            userList: [],
            pagesize:5,
            currentPage:1,
            delmultipleSelection:[],
            
            addVisible:false,
            editVisible:false,
            addForm:{},
           
            delList:[],
            editForm: {},
            idx: -1,
            id: -1,
            temp:'',

            userId:''
           
           
        };
    },
    created() {
        this.getList();
    },
    methods: {
        
        getList() {
            axios.get(this.GLOBAL.url+'user/userList')            
                        .then(res =>{       //收到的数据
                           console.log(res);
                            this.userList = res.data;
                            console.log(this.userList);
                            this.currentPage = 1;
                           
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
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
                    this.delList.push(row.userId);
                    console.log(this.delList);
                    
                    axios.post(this.GLOBAL.url + 'user/deleteUser',{param:this.delList})
                    .then(res =>{
                        console.log(res);
                        this.userList.splice(this.idx, 1);
                        console.log(this.userList);
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
                        return item.userId;
            });
           console.log("delList0:",delList);
                    console.log("multiple0:",this.delmultipleSelection);
            this.$confirm('确定要删除这'+length+'条用户吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log("delList1:",delList);
                   
                   
                    axios.post(this.GLOBAL.url + 'user/deleteUser',{param:delList})
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
       
        reset(){
            this.userId = '';
            this.getList();
        },

        cancel(){
            this.addVisible = false;
            this.addForm = {};
        },

        //密码重置
        resetPassword() {
            const length = this.delmultipleSelection.length;
            let resetList = this.delmultipleSelection.map(function(item){
                        return item.userId;
            });
          
                   
            this.$prompt('请输入重置后的密码', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
            })
                .then(({value}) => {
                    let data = {};
                    data.password = value;
                    data.resetList = resetList;
                    console.log(data);
                    axios.post(this.GLOBAL.url + 'user/resetPassword',{param:data})
                    .then(res =>{
                        console.log(res);
                        if(res){
                            this.$message.success('重置成功！');    
                        }
                        
                    });
                 })
                 .catch(() => {});


            this.delmultipleSelection = [];
            this.resetList = [];
        },

        resetP(index,row) {
            let list = [];
            list[0] = row.userId;
            this.$prompt('请输入重置后的密码', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
            })
                .then(({value}) => {
                    let data = {};
                    data.password = value;
                    data.resetList = list;
                    console.log(data);
                    axios.post(this.GLOBAL.url + 'user/resetPassword',{param:data})
                    .then(res =>{
                        console.log(res);
                        if(res){
                            this.$message.success('重置成功！');    
                        }
                        
                    });
                 })
                 .catch(() => {});


            this.delmultipleSelection = [];
            this.resetList = [];
        },

         // 触发搜索按钮
        handleSearch() {
           
           axios.get(this.GLOBAL.url+"user/search",{
           params:{
               'userId':this.userId,
               }
            })
           .then(res =>{
              console.log(res.data);
              this.userList = res.data;
              this.currentPage = 1;
           })
            
        },

        // 保存更新
        submit() {
            this.addVisible = false;
            axios.post(this.GLOBAL.url+"user/addAccount",this.addForm).then(res =>{
                if(res.data.code === 0){
                    this.$message.success('添加成功！');
                }
                else{
                    this.$message.error('添加失败！');
                }
            }).catch(err =>{
                console.log(err);
            });
            this.addForm = {};
        },

        handleEdit(index,row){
            this.editForm = row;
            this.editVisible = true;
        },

        cancelEdit(){
            this.editVisible = false;
            this.editForm = {};
        },
        submitEdit(){
            axios.post(this.GLOBAL.url+'user/updateUser',this.editForm)
            .then(res =>{
                console.log(res);
                if(res.data.code ===0){
                    this.$message.success("修改成功！");
                    this.getList();
                }
                else{
                    this.$message.error("修改失败！");
                }
            });
            
            this.editVisible = false;
            this.editForm = {};
            
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