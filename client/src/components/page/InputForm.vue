<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 试题录入
                </el-breadcrumb-item>
                <el-breadcrumb-item>手工录入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="background-color:#F5F5F5 ;">
            <div class="form-box" style="width:100%;">
                <el-form ref="form" :rules="rules" :model="ediForm" label-width="70px" style="width:90%;margin-left:5%;" label-position="top" >
                     <el-form-item style="margin-bottom:40px;" >
                        <el-col :span="6">
                            <el-form-item prop="knowledgePoint">
                                <el-select v-model="ediForm.knowledgePoint"  placeholder="知识点" class="handle-select mr10" style="width:200px;">
                                    <el-option key="1" label="编译过程概述" value="编译过程概述"></el-option>
                                    <el-option key="2" label="语言的形式化基础" value="语言的形式化基础"></el-option>
                                    <el-option key="3" label="词法分析及词法分析程序" value="词法分析及词法分析程序"></el-option>
                                    <el-option key="4" label="语法分析及语法分析程序" value="语法分析及语法分析程序"></el-option>
                                    <el-option key="5" label="语义分析及中间代码生成" value="语义分析及中间代码生成"></el-option>
                                    <el-option key="6" label="符号表管理" value="符号表管理"></el-option>
                                    <el-option key="7" label="运行时的存储管理" value="运行时的存储管理"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" style="margin-left:12%;">
                            <el-form-item prop="courseGoal">
                                <el-select v-model="ediForm.courseGoal"  placeholder="课程目标" class="handle-select mr10" style="width:120px;">
                                    <el-option key="1" label="课程目标 1" value="课程目标1"></el-option>
                                    <el-option key="2" label="课程目标 2" value="课程目标2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item prop="questionType">
                                <el-select v-model="ediForm.questionType"  placeholder="题型" class="handle-select mr10" style="width:130px;">
                                    <el-option key="1" label="选择题" value="选择题"></el-option>
                                    <el-option key="2" label="填空题" value="填空题"></el-option>
                                    <el-option key="3" label="简答题" value="简答题"></el-option>
                                    <el-option key="4" label="证明题" value="证明题"></el-option>
                                    <el-option key="5" label="分析题" value="分析题"></el-option>
                                    <el-option key="6" label="计算题" value="计算题"></el-option>
                                    <el-option key="7" label="程序设计题" value="程序设计题"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="题目" prop="content">
                        <el-input v-model="ediForm.content" placeholder="请在这里写下题目..."  type="textarea" :rows="10"></el-input>
                    </el-form-item> 
                    <el-form-item label="题目图片">
                        <div style="margin-left:calc((50%-360px)/2);width:360px;height:178px;border:1px dotted #DCDFE6;">
                            <el-upload
                            style="width:100%;height:100%;"
                            class="avatar-uploader"
                            action="aaa"
                            :show-file-list="false"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :data="ediForm">
                                <img v-if="ediForm.qPicture" :src="ediForm.qPicture" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                   <el-form-item label="答案" prop="answer">
                        <el-input v-model="ediForm.answer" placeholder="请在这里写下这道题的答案..."  type="textarea" :rows="10"></el-input>
                    </el-form-item> 
                    <el-form-item label="答案图片">
                         <div style="margin-left:calc((50%-360px)/2);width:360px;height:178px;border:1px dotted #DCDFE6;">
                            <el-upload
                            class="avatar-uploader"
                            style="width:100%;height:100%;"
                            action="aaa"
                            :show-file-list="false"
                            :on-change="hdChange"
                            :auto-upload="false"
                            :data="ediForm">    
                        <img v-if="ediForm.aPicture" :src="ediForm.aPicture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                        </el-upload>
                    </div>
                    </el-form-item>
                    <el-form-item label="难度系数预判：" prop="difficulty">
                        <el-input type="number" v-model="ediForm.difficulty" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                        <el-form-item label="分值：" prop="score">
                            <el-input type="number" v-model="ediForm.score"></el-input>
                        </el-form-item>
                     <el-form-item style="margin-top:10%;margin-left:80%;">
                        <el-button type="primary" @click="saveEdit">立即创建</el-button>
                         <el-button @click="reset">重置</el-button>  
                    </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
export default {
   
    data() {
        return {
            ediForm: {
               content:"",
               answer:"",
               qPicture:"",
               aPicture:"",
               knowledgePoint:"",
               courseGoal:"",
               questionType:"",
               score:-1,
               difficulty:-1,
            },
            param:new FormData(),
             rules: {
                content: [{ required: true, message: '请输入题目！', trigger: 'blur' }],
                answer: [{ required: true, message: '请输入答案！', trigger: 'blur' }],
                knowledgePoint:[ { required: true, message: '请选择所属知识点', trigger: 'change' }],
                courseGoal: [{ required: true, message: '请选择所属课程目标！', trigger: 'change' }],
                questionType: [{ required: true, message: '请选择所属题型！', trigger: 'change' }],
                score: [{ required: true, message: '请输入分值！', trigger: 'blur' },
                        {pattern:"^(\\d|[1-9]\\d|100)$",message:'分值在0~100之间！',trigger:'blur'}],
                difficulty: [{ required: true, message: '请输入预判难度系数！', trigger: 'blur' },
                            {pattern:/^(0.\d+|0|1)$/,maxlength:4, message: '难度系数在0~1之间！', trigger: 'blur' }]
             },
        };
    },
    methods: {
        
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
        reset() {
           this.ediForm = null;
           this.ediForm =  {
               content:"",
               answer:"",
               qPicture:"",
               aPicture:"",
               knowledgePoint:"",
               courseGoal:"",
               questionType:"",
               score:-1,
               difficulty:-1,
            };
        },
        // 创建试题
        saveEdit() {
          
          this.$refs.form.validate(valid => {  
                if (valid) {
                    var vm = this;
                    this.param.delete('ediForm');
                    this.param.append('ediForm',JSON.stringify(this.ediForm));
                    console.log(this.ediForm);
                    console.log(this.param.get('qPicture'));
                    let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
         
                    axios.post(this.GLOBAL.url+"question/createQuestion",this.param,config).then(res =>{
                        console.log(res.data);
                        if(res.data.code===0){
                            this.$message.success("添加成功！");
                        }else{
                            this.$message.error("添加失败！");
                        }
                        this.param.delete('qPicture');
                        this.param.delete('aPicture');
                        this.reset();
                    });


                } else {
                    this.$message.error('您输入的格式有误！');
                    console.log('error submit!!');
                    return false;
                }
             });  
        },
    }
}

</script>
<style scoped>
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
    width:100%;
    height: 100%;
    display: block;
  }


</style>