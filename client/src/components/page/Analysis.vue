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
        <el-dialog title="录入统计" :visible.sync="inputVisible" width="50%">
            <el-form label-position="right" label-width="80px" :model="inputForm">
                <el-form-item label="第一年">
                    <el-col :span='4' style="margin-right:20px;margin-left:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.max1)" type="number" v-model="inputForm.max1" placeholder="最高分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="(preData.min1!=null)" type="number" v-model="inputForm.min1" placeholder="最低分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.gpa1)" type="number" v-model="inputForm.gpa1" placeholder="评均分"></el-input>
                    </el-col>
                    <el-col :span='4'>
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.sd1)" type="number" v-model="inputForm.sd1" placeholder="标准差"></el-input>
                    </el-col>  
                </el-form-item>
                <el-form-item label="第二年">
                    <el-col :span='4' style="margin-right:20px;margin-left:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.max2)" type="number" v-model="inputForm.max2" placeholder="最高分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="(preData.min2!=null)" type="number" v-model="inputForm.min2" placeholder="最低分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.gpa2)" type="number" v-model="inputForm.gpa2" placeholder="评均分"></el-input>
                    </el-col>
                    <el-col :span='4'>
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.sd2)" type="number" v-model="inputForm.sd2" placeholder="标准差"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="第三年">
                    <el-col :span='4' style="margin-right:20px;margin-left:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.max3)" type="number" v-model="inputForm.max3" placeholder="最高分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="(preData.min3!=null)" type="number" v-model="inputForm.min3" placeholder="最低分"></el-input>
                    </el-col>
                    <el-col :span='4' style="margin-right:20px;">
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.gpa3)" type="number" v-model="inputForm.gpa3" placeholder="评均分"></el-input>
                    </el-col>
                    <el-col :span='4'>
                        <el-input oninput="value=value.replace(/[^\d.]/g,'')" :disabled="Boolean(preData.sd3)" type="number" v-model="inputForm.sd3" placeholder="标准差"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>
        <!-- 查看数据 -->
        <el-dialog title="试卷分析" :visible.sync="editVisible" width='70%'>
          
                <el-row style="margin-bottom:4%;">
                    <el-col :span="7" style="margin-left:10%;margin-right:4%;">
                        <div>难度系数：</div>
                        <el-progress :percentage="difficulty" :color="difficultyColor"></el-progress>
                    </el-col>
                    <el-col style="text-align:center;" :span="6">
                        <el-progress :width="80" type="circle" color="#7B68EE" :percentage="course1Score"></el-progress>
                        <div>课程目标1占分值</div>
                    </el-col>
                    <el-col style="text-align:center" :span="6">
                        <el-progress type="circle" :width='80' color="#F08080" :percentage="course2Score" ></el-progress>
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
                        
                        <schart v-if="activeName==='second'" class="schart" canvasId="line" :options="options2"></schart>
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
                        
                        <schart v-if="activeName==='fifth'" class="schart" canvasId="line" :options="options5"></schart>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>


<script>
import { fetchData } from '../../api/index';
import axios from 'axios';
import Schart from 'vue-schart';
export default {
     name: 'basecharts',
        components: {
            Schart
        },
    data() {
        return {
            options1: {
                type: 'bar',
                title: {
                    text: '最近三年考试得分情况'
                },
                bgColor: '#fbfbfb',
                labels: ['第一年', '第二年', '第三年'],
                datasets: [
                    {
                        label: '最低分',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [0,0,0]
                    },
                    {
                        label: '最高分',
                        data: [0,0,0]
                    },
                    {
                        label: '平均分',
                        data: [0,0,0]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近三年考试趋势'
                },
                bgColor: '#fbfbfb',
                labels: ['第一年', '第二年', '第三年'],
                datasets: [
                    {
                        label: '最低分',
                        data: [0,0,0]
                    },
                    {
                        label: '最高分',
                        data: [0,0,0]
                    },
                    {
                        label: '平均分',
                        data: [0,0,0]
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
                    text: '最近三年考试标准差'
                },
                bgColor: '#fbfbfb',
                labels: ['第一年', '第二年', '第三年'],
                datasets: [
                    {
                        label: '标准差',
                        data: [0, 0, 0]
                    }
                  
                ]
            },
            activeName: 'first',

            paperList: [],
            pagesize:5,
            currentPage:1,
          
            inputVisible:false,
            inputForm:{},
            preData:{},
           
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
            paper:{},
            analysis:{}
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
            this.preData = {};
        },

        //查看数据统计
        handleEdit(index, row) {
            console.log(row);
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
                this.analysis = res.data;
                console.log(this.analysis);
                this.initData();
            });
                         
        },
        
        initData(){
            let max = [this.analysis.max1,this.analysis.max2,this.analysis.max3],
                min = [this.analysis.min1,this.analysis.min2,this.analysis.min3],
                gpa = [this.analysis.gpa1,this.analysis.gpa2,this.analysis.gpa3],
                sd = [this.analysis.sd1,this.analysis.sd2,this.analysis.sd3],
                course = [this.course1Score,this.course2Score];
            this.options1.datasets[0].data = this.options2.datasets[0].data = min;
            this.options1.datasets[1].data = this.options2.datasets[1].data = max;
            this.options1.datasets[2].data = this.options2.datasets[2].data = gpa;
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


        

        save(){
            let inputForm = this.inputForm;
            this.$confirm('提交后无法修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        axios.post(this.GLOBAL.url+'paper/addAnalysis',inputForm)
                        .then(res =>{
                            console.log(res);
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });  
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交！'
                        });          
                    });
            this.inputVisible = false;
            this.inputForm = {};
            this.preData = {};

        },
        
         // 录入数据
        handleInput(index, row) {
            this.inputVisible = true;
            let paperId = row.paperId;
            this.inputForm.paperId = paperId;
            axios.get(this.GLOBAL.url+"paper/analysisData",{
                params:{
                    'paperId':paperId
                }
            }).then(res =>{
                console.log(res);
                if(res.data){
                    this.inputForm = res.data;
                    Object.keys(this.inputForm).forEach(key =>{
                        this.preData[key] = res.data[key]
                    });
                }
            })
        },
       
        // 分页导航
       
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        }

    },
};
</script>

<style scoped>
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