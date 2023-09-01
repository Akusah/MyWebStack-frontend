<template>
  <div class="login-page">
    <div class="login-header">
      <i class="el-icon-phone-outline" />
      <span>联系我:<a href="https://github.com/Akusah/MyWebStack-vue.git">点击前往GitHub</a></span>
    </div>
    <div class="login-box">
      <div class="left-half">
        <ul class="geek-slide">
          <li>
            <i class="iconfont iconzuhejiekou"></i>
            <span class="title">丰富</span>
            <span class="description">呈现多种类型网站</span>
          </li>
          <li>
            <i class="iconfont iconyiduiyigoutong"></i>
            <span class="title">便利</span>
            <span class="description">分门别类展现内容</span>
          </li>
          <li>
            <i class="iconfont icongaoxiao"></i>
            <span class="title">高效</span>
            <span class="description">各大网站任你挑选</span>
          </li>
        </ul>
      </div>
      <div class="right-half">
        <div class="form-box">
          <div class="form" style="padding-top: 95px;">
            <el-form :model="loginForm">
              <el-form-item prop="userAccount">
                <el-input v-model="loginForm.username" placeholder="请输入帐号" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input type="password" show-password v-model="loginForm.password" placeholder="请输入密码"
                  prefix-icon="el-icon-lock"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom: 10px;">
                <el-button type="submit" class="submit" v-preventReClick @click="submitForm(loginForm)">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { reactive } from 'vue';
import { loginApiUser } from '@/api/user'
import { ElMessage } from 'element-plus';

const loginForm = reactive({
  username:'zhangsan',
  password:'123456'
})

const submitForm = (form) => {
  if(!form.username || !form.password){
    ElMessage.warning("请填写用户名和密码")
  }else{
    loginApiUser(form)
  }
  

}

</script>
  
<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background: #5dd5c8;
  /* background: #5dd5c8 url(../../assets/login/newbg.png) center bottom no-repeat; */
}

.login-page .login-header {
  margin: 0;
  position: absolute;
  top: 50px;
  right: 75px;
  width: 250px;
  color: #FFFFFF;
  opacity: .8;
}

.login-page .login-header span {
  font-size: 16px;
}

.login-page .login-box {
  margin: 0;
  display: grid;
  grid-template-columns: 250px 1fr;
  position: absolute;
  width: 740px;
  height: 524px;
  padding: 0;
  background: #fff;
  box-shadow: 0 6px 13px 0 rgba(0 0 0 0.1);
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-page .login-box .left-half {
  height: 100%;
}

.login-page .login-box .left-half .logo {
  position: absolute;
  top: 60px;
  left: 40px;
}

.login-page .left-half .logo p {
  margin: 3px 0 0;
  line-height: 20px;
  font-size: 14px;
  text-align: left;
}

.login-page .left-half .geek-slide {
  position: absolute;
  top: 160px;
  left: 60px;
  list-style: none;
  text-align: left;
  padding: 0;
  margin: 0;
}

.login-page .left-half .geek-slide li {
  margin-bottom: 32px;
  position: relative;
}

.login-page .left-half .geek-slide li i {
  position: absolute;
  top: 16px;
  font-size: 24px;
  color: #8c8c8c;
}

.login-page .left-half .geek-slide .title {
  display: block;
  margin-left: 50px;
  line-height: 22px;
  color: #8d92a1;
  font-size: 16px;
  font-weight: 700;
}

.login-page .left-half .geek-slide .description {
  display: block;
  margin-left: 50px;
  margin-top: 2px;
  line-height: 18px;
  color: #b0b4c1;
  font-size: 13px;
}

.login-page .login-box .right-half {
  padding: 60px 40px 0 60px;
}

/*右侧登录盒子*/
.login-page .login-box .right-half .form-box {
  width: 90%;
  margin: 0 auto;
}
</style>
  