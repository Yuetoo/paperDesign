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
                            @click="handleEdit(scope.$index, scope.row)"
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

       
        <!-- 试卷重命名 -->
        <el-dialog title="试卷重命名" :visible.sync="updateVisible" width="30%">
            <el-form label-position='top' ref="form" :model="updateForm" label-width="110px">
                <el-form-item label="请输入试卷名称:">
                    <el-input v-model="updateForm.paperHeader"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary">更新</el-button>
            </span>
        </el-dialog>
        <!-- 编辑试卷 -->
        <el-dialog title="请选择试题" :visible.sync="editVisible" width='80%'>
          
                <el-row style="margin:40px;">
                    <el-col :span="7" style="margin-right:5%;">
                        <div>总分值：</div>
                        <el-progress :percentage="totalScore" :color="scoreColor"></el-progress>
                        <div>难度系数：</div>
                        <el-progress :percentage="difficulty" :color="difficultyColor"></el-progress>
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
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="柱状图" name="first">
                     <div class="schart-box">
                        <div class="content-title">柱状图</div>
                        <schart class="schart" canvasId="bar" :options="options1"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="折线图" name="second">
                    <div class="schart-box">
                        <div class="content-title">折线图</div>
                        <schart class="schart" canvasId="line" :options="options2"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="饼状图" name="third">
                     <div class="schart-box">
                        <div class="content-title">饼状图</div>
                        <schart class="schart" canvasId="pie" :options="options3"></schart>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="环形图" name="fourth">
                    <div class="schart-box">
                        <div class="content-title">环形图</div>
                        <schart class="schart" canvasId="ring" :options="options4"></schart>
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
                    text: '最近一周各品类销售图'
                },
                bgColor: '#fbfbfb',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                bgColor: '#fbfbfb',
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [114, 138, 200, 235, 190]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '服装品类销售饼状图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260, 200, 141]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '环形三等分'
                },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['vue', 'react', 'angular'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            },



            activeName: 'first',

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
       

        handleEdit(index, row) {
            console.log(row);
            
            this.editVisible = true;
           
            this.difficulty = row.difficulty;
            this.course1Score = row.course1Score;
            this.course2Score = row.course2Score;
            this.totalScore = this.course1Score + this.course2Score;   
            this.paper = row; 
                         
        },
        
        
         // 更新难度系数
        handleUpdate(index, row) {
          //  this.idx = index;
            this.updateForm = row;
            this.updateVisible = true;
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
        handleClick(tab, event) {
        console.log(tab, event);
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