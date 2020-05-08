<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 试题录入</el-breadcrumb-item>
                <el-breadcrumb-item>批量导入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">说明</div>
            <div class="plugins-tips" style="padding-left:50px;">
                <ul>
                    <li style="margin-bottom:20px;">此方式仅支持无图片导入</li>
                    <li>请下载提供的excel模板，为确保试题的准确录入，请按照模板格式填写</li>
                </ul>
                
            </div>
          

           
            <!-- excel上传与下载 -->
             <el-row>
                 <el-col :span="2">
                    <a :href=url><el-button style="width:100%;">模板下载</el-button></a>
                 </el-col>
                 <el-col :span="2" style="margin-left:5%;">
                      <el-upload
                             class="upload-demo"
                            style="padding:0px;"
                             ref="upload"
                             action="doUpload"
                             :limit="1"
                             :before-upload="beforeUpload">
                           
                             <el-button style="width:100%;" type="primary">上传excel</el-button>
                             
            
                        </el-upload> 
                 </el-col>
                 
                       
        </el-row>
        </div>
        <div v-if="loading" style="font-size:100px;color:#C0C4CC;position:absolute;top:40%;left:40%;">
            <i class="el-icon-loading"></i>
        </div>
    </div>
</template>

<script>
    
    import axios from 'axios';
    export default {
        name: 'upload',
        data: function(){
            return {
               loading:false,
               url:this.GLOBAL.url+'demo/demo.xlsx'
            }
        },
        components: {
            VueCropper
        },
        methods:{
            beforeUpload(file){
                // console.log(file,'文件');
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
               
                if (!extension && !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                
                 this.$confirm('确定上传文件 '+file.name+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                       this.loading = true;
                       this.fileName = file.name;
                        
                        setTimeout(() => {
                            this.submitUpload();
                        },2000);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消上传！'
                        });          
                    });
                
                return false; // 返回false不会自动上传
            },   
         
            // 上传excel
            submitUpload() {
                
                console.log('上传'+this.files.name)
                if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }
                let fileFormData = new FormData();
                fileFormData.append("code", "t_pathology_info_excel");
                fileFormData.append("description", "excel上传测试");
                //filename是键，file是值，就是要传的文件，test是要传的文件名
                fileFormData.append('files', this.files, this.fileName);
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                // 执行上传excel
                let id = '';
                console.log(fileFormData.get('files'));
                axios.post(this.GLOBAL.url+'importExcel/upload', fileFormData, requestConfig)
                .then(resp => {
                    if (resp.data.code != 200) {
                        this.$message.error("excel上传失败，请重新上传");
                    } else {
                        this.loading = false;
                        this.$message.success("已成功上传至数据库！");
                    }
                })
            },
           
    },
    created(){
            
    }
}
</script>

<style scoped>

    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>

<style>
.el-upload--text{
    height:100%;
    width:100%;
    border:none;
}
</style>