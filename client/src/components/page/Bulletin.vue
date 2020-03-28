<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 公告栏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane label="最新通知" name="first">
                    <el-table :data="bulletin" height="250" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="openDialog(scope.row)" class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <span>{{format(scope.row.date)}}</span>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" v-if="userRank == 1" @click="inputVisible = true">发布新公告</el-button>
                    </div>
                    <el-dialog
                        title="公告详情"
                        :visible.sync="dialogVisible"
                        width="50%"
                        style="line-height:30px;">
                        <h3>{{detail.title}}</h3>
                        
                        <el-row>
                            <span style="margin-left:1%;">发布者：{{detail.author}}</span>
                            <span style="margin-left:10%;">时间：{{format(detail.date)}}</span>
                        </el-row>
                        
                        <p style="text-indent:2em;font-size:16px;margin-top:1%;">{{detail.content}}</p>
                        
                    </el-dialog>
                    <el-dialog
                        title="发布公告"
                        :visible.sync="inputVisible"
                        width="50%">
                        <el-form v-model="inputForm" style="text-align:center;" >
                            <el-form-item>
                                <el-input placeholder="标题" style="width:50%;" v-model="inputForm.title"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input :rows="10" placeholder="内容" type="textarea" v-model="inputForm.content"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit">
                                    <i class="el-icon-lx-notification"></i>发布</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </el-tab-pane>
                
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                bulletin: [],
                dialogVisible:false,
                detail:{},
                inputVisible:false,
                inputForm:{
                    title:'',
                    content:'',
                    date:null,
                    authorId:''
                }
            }
        },
        created(){
            this.getList();
            this.userRank = sessionStorage.getItem('userRank');
        },
        methods: {
            getList(){
                axios.get(this.GLOBAL.url+'bulletin/getList')
                .then(res =>{
                    console.log(res);
                    this.bulletin = res.data;
                })
            },
            openDialog(row){
                this.detail = row;
                axios.get(this.GLOBAL.url+"user/search",{
                    params:{
                        'userId':this.detail.authorId,
                        }
                    })
                    .then(res =>{
                        console.log(res.data);
                        this.detail.author = res.data[0].userName;
                        this.dialogVisible = true;
                    });
                    
            },
           
            submit(){
                this.inputForm.authorId = sessionStorage.getItem('userId');
               // this.inputForm.date = (new Date(+new Date() + 8 * 3600 * 1000)).toISOString().substring(0, 19).replace('T', ' ');
               this.inputForm.date = new Date(+new Date() + 8 * 3600 * 1000);

               
                axios.post(this.GLOBAL.url +'bulletin/publish',this.inputForm)
                .then(res =>{
                    console.log(res);
                });
            },
           
             format: function (date) {
                let t = String(date);
                t = t.split(/[T.]/);
                console.log(t);
                return t[0] +' . ' + t[1];
            }
          
        }
        
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

