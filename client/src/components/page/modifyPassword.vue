<template>
  <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-form :model="inputForm" label-position="top" class="demo-form-inline">
            <el-form-item label="请输入原密码：" prop="original">
                <el-input style="width:30%;" type="password" v-model="inputForm.original" placeholder="原始密码"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码：" prop="newPassword">
                <el-input style="width:30%;" type="password" v-model="inputForm.newPassword" placeholder="不超过20个字符"></el-input>
            </el-form-item>
            <el-form-item label="请再次确认新密码：" prop="confirm">
                <el-input style="width:30%;" type="password" v-model="inputForm.confirm" placeholder="确认新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
           

        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            inputForm:{
                original:'',
                newPassword:'',
                confirm:'',
                userId:''
            },
           
        }
    },
    methods:{
        onSubmit(){
            this.inputForm.userId = sessionStorage.getItem('userId');
            if(this.inputForm.original&&this.inputForm.newPassword&&this.inputForm.confirm){
               if(this.inputForm.newPassword != this.inputForm.confirm){
                   this.$message.error("两次密码输入不一致！");
               }
               else{
                   axios.post(this.GLOBAL.url+'user/modifyPassword',this.inputForm)
                   .then(res =>{
                       console.log(res);
                       if(res.data.code === 0){
                           this.$message.success("修改成功！");
                       }
                       else if(res.data.code === 1){
                           this.$message.error("原密码不正确！");
                       }
                       
                   })
               }
            }else{
                this.$message("请输入完整信息！");
            }
        },
    }
}
</script>
<style scoped>

</style>
