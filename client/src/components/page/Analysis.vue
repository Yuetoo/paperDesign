<template>
    <div>
        <div class="container">
            <el-table
                :data="paperList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                height="400"
                class="table"
               
                header-cell-class-name="table-header"
                >
                <el-table-column prop="paperHeader" label="试卷名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleInput(scope.$index, scope.row)"
                        >录入数据</el-button>
                    </template>
                </el-table-column>
                  <el-table-column label="" width="140" align="center">
                    <template slot-scope="scope">
                         <el-button
                                size="mini"
                                type="warning"
                                @click="handleEdit(scope.$index, scope.row)">查看统计分析</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                            
                            icon="el-icon-view"
                            @click="preExport(scope.row)"
                        >导出预览</el-button>
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

       
        <!-- 试卷数据录入 -->
        <el-dialog title="录入统计" :visible.sync="inputVisible" width="40%">
            <el-form label-position="right" label-width="100px" :model="inputForm">
                <el-form-item label="课号：" required>
                    <el-input style="width:80%;" v-model="inputForm.classNum" ></el-input> 
                </el-form-item>
                <el-form-item label="考试日期：" required>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="inputForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="最高分：">
                    <el-input style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')"  v-model="inputForm.max"></el-input> 
                </el-form-item>
                <el-form-item label="最低分：">
                    <el-input style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')"  v-model="inputForm.min"></el-input> 
                </el-form-item>
                <el-form-item label="平均分：">
                    <el-input style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')"  v-model="inputForm.gpa"></el-input> 
                </el-form-item>
                <el-form-item label="标准差：">
                    <el-input style="width:80%;" oninput="value=value.replace(/[^\d.]/g,'')"  v-model="inputForm.sd"></el-input> 
                </el-form-item>
             
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>
        <!-- 查看数据 -->
        <el-dialog title="试卷分析" :visible.sync="editVisible" width='70%'>
          
                <el-row style="padding-left:8%;margin-bottom:30px;padding-bottom:20px;">
                <el-col :span="8" style="margin-right:5%;">
                
                    <div>难度系数：</div>
                    <el-progress :percentage="parseInt(difficulty*100)" :color="difficultyColor"></el-progress>
                </el-col>
                <el-col style="text-align:center;margin-right:4%;" :span="5">
                    <el-progress :width="90" type="circle" color="#7B68EE" :percentage="course1Score"></el-progress>
                    <div>课程目标1占分值</div>
                </el-col>
                <el-col style="text-align:center" :span="5">
                    <el-progress type="circle" :width='90' color="#F08080" :percentage="course2Score" ></el-progress>
                    <div>课程目标2占分值</div>
                </el-col>  
                      
            </el-row>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="得分统计" name="first">
                     <div class="schart-box">
                       
                        <schart v-if="activeName==='first'" class="schart" canvasId="bar" :options="options1"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="趋势对比" name="second">
                    <div class="schart-box">
                        
                        <schart v-if="activeName==='second'" class="schart" canvasId="line1" :options="options2"></schart>
                    </div>
                </el-tab-pane>
                
                <el-tab-pane label="知识点分布" name="third">
                     <div class="schart-box">
                       
                        <schart v-if="activeName==='third'" class="schart" canvasId="pie" :options="options3"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="课程目标占比" name="fourth">
                    <div class="schart-box">
                        
                        <schart class="schart" v-if="activeName==='fourth'" canvasId="ring" :options="options4"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="试卷标准差" name="fifth">
                    <div class="schart-box">
                        
                        <schart v-if="activeName==='fifth'" class="schart" canvasId="line2" :options="options5"></schart>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <!-- 数据导出模板 -->
        <el-dialog :visible.sync="exportPre" width="70%">
            <div id="data" style="width:100%;padding-top:60px;padding-left:10px;padding-right:10px;">
                <div style="text-align:center">
                   <h2>{{paper.paperHeader}}</h2>
               </div>
             <el-row style="margin-top:8%;padding-left:10%;">
                    <el-col :span="5" style="margin-left:7%;">
                        <div>难度系数：</div>
                        <el-progress :percentage="parseInt(difficulty*100)" :color="difficultyColor"></el-progress>
                    </el-col>
                    <el-col style="margin-left:7%;" :span="5">
                         <div>课程目标1分值：</div>
                        <el-progress :percentage="course1Score" color="#7B68EE"></el-progress>
                    </el-col>
                    <el-col style="margin-left:7%;" :span="5">
                         <div>课程目标2分值：</div>
                        <el-progress :percentage="course2Score" color="#F08080"></el-progress>
                    </el-col>  
                </el-row>
                <div style="text-align:center;margin-top:8%;">
                     <div class="schart-box">
                        <schart class="schart" canvasId="score" :options="options1"></schart>
                    </div>
                    <div class="schart-box">
                        <schart class="schart" canvasId="years" :options="options2"></schart>
                    </div>
                     <div class="schart-box" style="margin-top:300px;">
                        <schart class="schart" canvasId="konwledge" :options="options3"></schart>
                    </div>
                    <div class="schart-box" style="margin-top:100px;"> 
                        <schart class="schart" canvasId="courseGoal" :options="options4"></schart>
                    </div>
                    <div class="schart-box" style="margin-top:350px;">
                        <schart class="schart" canvasId="sd" :options="options5"></schart>
                    </div>
                </div>
            </div>
            
                <el-button type="primary" @click="exportPdf(paper.paperHeader)" style="margin-left:85%;">导出数据</el-button>
        </el-dialog>
        
    </div>
</template>


<script>

import axios from 'axios';
import Schart from 'vue-schart';
import htmlToPdf from '../../utils/htmlToPdf';
export default {
     name: 'basecharts',
        components: {
            Schart
        },
    data() {
        return {
            exportPre:false,
            options1: {
                type: 'bar',
                title: {
                    text: '各课号考试得分情况'
                },
                bgColor: '#fbfbfb',
                labels: ['', '', '', '', ''],
                datasets: [
                    {
                        label: '最低分',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [0,0,0,0,0]
                    },
                    {
                        label: '最高分',
                        data: [0,0,0,0,0]
                    },
                    {
                        label: '平均分',
                        data: [0,0,0,0,0]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几次的考试趋势'
                },
                bgColor: '#fbfbfb',
                labels: ['', '', '','',''],
                datasets: [
                    {
                        label: '最低分',
                        data: [0,0,0,0,0]
                    },
                    {
                        label: '最高分',
                        data: [0,0,0,0,0]
                    },
                    {
                        label: '平均分',
                        data: [0,0,0,0,0]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '知识点分布'
                },
                legend: {
                    position: 'left',
                    top:10
                },
                radius:90,
                bgColor: '#fbfbfb',
                labels: ['编译过程概述', '语言的形式化基础', '词法分析及词法分析程序', '语法分析及语法分析程序', '语义分析及中间代码生成', '符号表管理', '运行时的存储管理'],
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '课程目标占比'
                },
                showValue: true,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['课程目标1', '课程目标2'],
                datasets: [
                    {
                        data: [0,0]
                    }
                ]
            },
            options5: {
                type: 'line',
                title: {
                    text: '最近几次考试标准差'
                },
                bgColor: '#fbfbfb',
                labels: ['', '', '', '', ''],
                datasets: [
                    {
                        label: '标准差',
                        data: [0, 0, 0,0,0]
                    }
                  
                ]
            },
            activeName: 'first',

            paperList: [],
            pagesize:5,
            currentPage:1,
          
            inputVisible:false,
            inputForm:{},
           
           
            ediForm: {},
            idx: -1,
            id: -1,
            temp:'',

            difficultyColor:[{color:"#F5DEB3",percentage:50},
                        {color:"#F4A460",percentage:80},
                        {color:"#FF4500",percentage:100}],
            difficulty:0,
            course1Score:0,
            course2Score:0,
        
            editVisible: false,
            paper:{}
           
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
       
        cancel(){
            this.inputVisible = false;
            this.inputForm = {};
            
        },

        reset(){
            this.options1.labels = this.options2.labels = this.options5.labels = ['','','','',''];
            this.options1.datasets[0].data = this.options1.datasets[1].data = this.options1.datasets[2].data
            = this.options2.datasets[0].data = this.options2.datasets[1].data = this.options2.datasets[2].data
            = this.options5.datasets[0].data = [0,0,0,0,0];
        },

        //查看数据统计
        handleEdit(index, row) {
            console.log(row);
            this.reset();
            this.paper = row;
            this.editVisible = true;
           
            this.difficulty = row.difficulty;
            this.course1Score = row.course1Score;
            this.course2Score = row.course2Score;  
            axios.get(this.GLOBAL.url+'paper/analysisData',{
                params:{
                    paperId:row.paperId
                }
            })
            .then(res =>{
                if(res.data){
                    let analysis = res.data;
                    console.log(analysis);
                    this.initData(analysis);
                }
            });            
        },
        
        initData(analysis){
            let max = [analysis.max1,analysis.max2,analysis.max3,analysis.max4,analysis.max5],
                min = [analysis.min1,analysis.min2,analysis.min3,analysis.min4,analysis.min5],
                gpa = [analysis.gpa1,analysis.gpa2,analysis.gpa3,analysis.gpa4,analysis.gpa5],
                sd = [analysis.sd1,analysis.sd2,analysis.sd3,analysis.sd4,analysis.sd5],
                course = [this.course1Score,this.course2Score],
                classNum = [analysis.classNum1,
                         analysis.classNum2,
                         analysis.classNum3,
                         analysis.classNum4,
                         analysis.classNum5],
                date = [analysis.date1,analysis.date2,analysis.date3,analysis.date4,analysis.date5];
            this.options1.datasets[0].data = this.options2.datasets[0].data = min;
            this.options1.datasets[1].data = this.options2.datasets[1].data = max;
            this.options1.datasets[2].data = this.options2.datasets[2].data = gpa;
            this.options1.labels = classNum;
            this.options2.labels = this.options5.labels = date;
            this.options4.datasets[0].data = course;
            this.options5.datasets[0].data = sd;
            axios.get(this.GLOBAL.url+"paper/countPoint",{
                params:{
                    "paper":this.paper
                }
            }).then(res =>{
                console.log(res.data);
                this.options3.datasets[0].data = res.data;
            });
        },


        
        //提交分析数据
        save(){
            let inputForm = this.inputForm;
            console.log(inputForm);
            this.$confirm('提交后无法修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        axios.post(this.GLOBAL.url+'paper/addAnalysis',inputForm)
                        .then(res =>{
                            console.log(res);
                            if(res.data.code === 0){
                                 this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                            }
                            else{
                                 this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
                             
                            this.inputVisible = false;
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交！'
                        });          
                    });
            
            this.inputForm = {};
           
        },
        
         // 录入数据
        handleInput(index, row) {
            this.inputVisible = true;
            let paperId = row.paperId;
            this.inputForm = {};
            this.inputForm.paperId = paperId;
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
        //数据导出
        preExport:function(row){
            this.reset();
            this.paper = row;
            this.exportPre = true;
            this.difficulty = row.difficulty;
            this.course1Score = row.course1Score;
            this.course2Score = row.course2Score;  
            axios.get(this.GLOBAL.url+'paper/analysisData',{
                params:{
                    paperId:row.paperId
                }
            })
            .then(res =>{
                if(res.data){
                    let analysis = res.data;
                    console.log(analysis);
                    this.initData(analysis);
                }
                
            });           
           
        },
        exportPdf(pdfName){
            htmlToPdf.downloadPDF( document.querySelector('#data'),pdfName);
        }
    },
};
</script>

<style scoped>
*{
    box-sizing: border-box;
}
.el-tab-pane{
    text-align: center;
   
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

  .schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

</style>
<style lang="css">
   .el-tooltip__popper{max-width:70%;font-size: 18px;line-height: 50px;text-indent: 2em;}
  .el-tooltip__popper,.el-tooltip__popper.is-dark{background:	#FFF8DC !important;
    color: #303133 !important;}
 
 
</style>