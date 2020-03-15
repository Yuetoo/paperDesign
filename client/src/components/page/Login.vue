<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">《编译原理》试题库与辅助出卷系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userId" style="margin-bottom:30px;" >
                    <el-input v-model="param.userId" placeholder="教师工号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
 
export default {
    data: function() {
        return {
            param: {
                userId: '',
                password: '',
            },
            rules: {
                userId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {  
                if (valid) {
                    var vm = this;
                    
                    axios.get(this.GLOBAL.url+'login',{
                        params:{'userId':this.param.userId,'password':this.param.password}
                    })            
                        .then(function (response) {       //收到的数据
                            console.log(response.data.data);   //展示数据（看看是否拿到，和数据长啥样） 
                           
                           if(response.data.code===0){
                                vm.$message.success('登录成功');
                                localStorage.setItem('user',JSON.stringify(response.data.data));
                                
                                vm.$router.push('/').catch(err => { console.log(err) });
                            }else if(response.data.code===1){
                               vm.$message.warning("登录名密码错误！");
                            }else{
                                vm.$message.error("服务出错！");
                            }        
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
             });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color:rgba(0, 0, 0, 0.65);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    margin: -195px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.596);
    overflow: hidden;
}
.ms-content {
    padding: 40px 50px;
    
}
.login-btn {
    text-align: center;
   
}
.login-btn button {
   width: 70%;
    height: 36px;
    margin-top: 10px;
}

</style>