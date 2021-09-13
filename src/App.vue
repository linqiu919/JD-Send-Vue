<template>
  <div id="app">
    <el-container>

      <el-header id="headers" style="font-size:20px;font-family: 微软雅黑;font-weight: 700">
        <img src="../src/assets/logo.png" alt="logo" style="width: 20px;height: 20px;">&nbsp;京东数据提交</el-header>
      <el-main>
        <el-alert id="message"
            title="请关闭京东小额免密支付 !"
            type="error"
            effect="dark"
            :center="true">
        </el-alert>

        <!--教程框-->
        <div id="card">
          <el-card class="box-card">
           <h1 style="font-size: 10px">
             <el-link href="https://docs.qq.com/doc/DSWNpcFRYZGJsU3lF" target="_blank" type="success" :underline="false">
             点击查看京东wskey抓取教程 | 使用第一种方法
           </el-link>
           </h1>
          </el-card>
        </div>

        <!--提交表单-->
        <div id="submit">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: 700">提交数据 | JD-Send</span>
            </div>
            <div class="text-item">
              <el-form :model="formData" :rules="rules"  ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item
                    label="输入京东数据:"
                    prop="sendTxt">
                  <el-input  type="textarea" placeholder="数据格式：wskey=xxx;loginpin=xxx;" v-model="formData.sendTxt" :autosize="{minRows:2,maxRows:4}" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item
                    label="输入身份凭证:"
                    prop="sendDesc">
                  <el-input type="text" placeholder="手机尾号后四位加上姓名缩写，示例：2499cxb" v-model="formData.sendDesc" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item
                    label="重输身份凭证:"
                    prop="repeatSendDesc">
                  <el-input type="text" placeholder="请重新输入身份凭证，确定正确再点击提交！" v-model="formData.repeatSendDesc" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" size="medium" @click="submitForm" >提交</el-button>
                </el-form-item>
              </el-form>

            </div>
          </el-card>
        </div>


      </el-main>
      <el-footer><span style="font-size: 10px">Design by 彼方 | Version 1.1</span></el-footer>
    </el-container>
  </div>
</template>


<script>
import send from "@/api/send";

export default {
  data() {

    return {
      formData: {
        sendTxt: '',
        sendDesc: '',
        repeatSendDesc: '',
      },
      tableData: '',
      flag: true,
      rules: {
        sendTxt:[
          {required: true, message: '京东数据不能为空！', trigger: 'blur'},
          {pattern: /^wskey=\w{20,64}/, message: '京东数据格式非法！', trigger: 'blur'},
        ],
        sendDesc:[
          {required: true, message: '身份凭证不能为空！', trigger: 'blur'},
          {pattern: /\d{4}[A-Za-z]{2,3}$/, message: '身份凭证格式非法！', trigger: 'blur'},
        ],
        repeatSendDesc: [
          {required: true, message: '必须重新输入身份凭证！', trigger: 'blur'},
          {pattern: /\d{4}[A-Za-z]{2,3}$/, message: '身份凭证格式非法！', trigger: 'blur'},
        ]
      }
    };
  },
  methods: {

    submitForm() {
        this.$refs.form.validate(async (valid) =>{
            if(valid){
              if(this.formData.repeatSendDesc===this.formData.sendDesc){
                //校验成功，提交数据
                 await send.saveData(this.formData);
                this.$message.success("京东数据添加成功！")
              }else{
                this.$message.error("两次输入的身份凭证不一致！")
                return false;
              }
            }else{
                this.$message.error("请完善提交信息！")
                return false;
            }
        })
    },
  }
}</script>


<style lang="scss">

#headers{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
//高度设置,撑满屏幕
html,body,#app{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  width: 100%;
  height: 100%;
}
//通知消息样式
#message{
  height: 50px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
.el-container {
  height: 100%;
}
.el-header, .el-footer {
  box-shadow:0 0 6px 3px #c3c3c3;
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  box-shadow:0 0 6px 3px #c3c3c3;
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  overflow-x: hidden;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 40px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.text {
  font-size: 10px;
}

.item {
  height: 60px;
  //padding: 18px 0;
}

.box-card {

}
#card{
  width: 500px;
  height: 50px;
  line-height: 0px;
  margin: 20px auto;
  //box-shadow:0 6px 0 0 #c3c3c3;
}

#submit{
  width: 500px;
  height: 400px;
  line-height: 30px;
  margin: 30px auto;
  //box-shadow:0 6px 0 0 #c3c3c3;
}
.text-item{
  height: 300px;
}
.el-form-item--small el-form-item__content{
  margin-left: 0 !important;
}
.el-textarea__inner{
  min-height: 50px!important;
  max-height: 50px!important;
  height: 197px!important;
  margin-top: 0;
  margin-bottom: 0;
}
.el-form-item__content{
  margin-left: 0!important;
}
.el-form-item__label{
  width: 120px!important;
}
@media screen and (max-width: 500px) {
  .el-message {
    min-width: 300px !important;
  }
  .el-alert{
    width: 370px !important;
  }
  .el-card{
    width: 370px !important;
  }

}
@media screen and (max-width: 400px) {
  .el-message {
    min-width: 300px !important;
  }
  .el-alert{
    width: 280px !important;
    font-size: 10px !important;
  }
  .el-card{
    width: 68% !important;
  }

}
</style>

