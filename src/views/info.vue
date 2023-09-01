<template>
    <h1 class="page-title">个人主页</h1>
    <div class="content">
        <div class="userBox">
            <h2 class="user-name">账户名：{{ user.username }}</h2>
            <h2 class="user-name">email: {{ user.email }}</h2>
            <h2 class="user-roles" v-if="user.isAdmin===0">角色：普通用户</h2>
            <h2 class="user-roles" v-if="user.isAdmin===1">角色：管理员</h2>
        </div>
        <div class="avatarBox">
            <img class="user-avatar" :src="user.avatar" alt="">
        </div>
        </div>
        <el-button class="btn" type="warning" plain @click="logout">退出登录</el-button>
</template>


<script setup>
import {  onMounted, reactive } from "vue";
import { logoutApiUser } from "@/api/user";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

let user = reactive({})

onMounted(()=>{
    user = JSON.parse(localStorage.getItem("LOGINUSER"));
    instance.proxy.$forceUpdate();
})


const logout = () => {
  logoutApiUser()
  instance.proxy.$forceUpdate();
}
</script>


<style scoped>
.content{
  display: flex;
  justify-content: center;
}
.avatarBox{
  margin-left: 300px;
}
.page-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.user-name {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.user-roles {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
  display: flex;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.btn{
  display:block;
  margin:0 auto
}
</style>