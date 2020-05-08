<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:170px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:330px;">
                    <div slot="header" class="clearfix">
                        <span>课程基本信息</span>
                    </div>
                    <div class="user-info-list">
                        <p>课程代码：XZ0300101X0</p>
                        <p>课程名称（中文）：编译原理</p>
                        <p>课程名称（英文）：Compiling Principle</p>
                        <p>课程类别：专业限选课</p>
                        <p>总 学 时：48 学时（理论 48 学时）</p>
                        <p>学 分：3</p>
                        <p>适用专业：软件工程</p>
                        <p>先修课程：程序设计与问题求解，数据结构与算法，离散数学</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-text grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{questionNum}}</div>
                                    <div>试题数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-read grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{paperNum}}</div>
                                    <div>试卷数量</div>
                                </div>
                            </div>

                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{userNum}}</div>
                                    <div>用户数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>基本要求</span>
                    </div>
                    <div class="user-info-list" style="text-indent:2em;font-size:16px;line-height:35px;">
                       本课程系统介绍了编译系统的基础知识和基本方法，涉及编译系统的结构及其各组成部分的设计原理与实现技术。在教学的过程中，须贯彻理论联系实际、“精讲、多练”的原则，采用案例式、启发式、问题导入等教学方法，并引导学生查阅资料，关注编译技术的变化和发展；对于一些实际性较强的问题多采用课堂讨论的方式，提高学生的思辨能力和学习主动性；积极引导学生通过课外学习和实践（如，开发一个编译基础模块——词法分析器等），加深对课堂讲授理论内容的理解，把所学的原理应用到具体的实践中去，从而培养学生发现、分析和解决实际问题的能力。
                    </div>
                </el-card>
            </el-col>
        </el-row>
       
    </div>
</template>

<script>

import axios from 'axios';

export default {
    
    data() {
        return {
            name: sessionStorage.getItem('userName'),
            questionNum:0,
            paperNum:0,
            userNum:0
            
        };
    },
    created(){
       this.getData();
    },
    computed: {
        role() {
            let userRank = sessionStorage.getItem('userRank');
            return userRank == '1' ? '管理员' : '普通用户';
        }
    },
  
    methods: {
      
      getData(){
          axios.get(this.GLOBAL.url + "user/getData")
          .then(res =>{
              console.log(res);
              this.questionNum = res.data.questionNum;
              this.paperNum = res.data.paperNum;
              this.userNum = res.data.userNum;
          })
      } 
        
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 150px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 10px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 18px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}



.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
