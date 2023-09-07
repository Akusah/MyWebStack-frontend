<template>
    <el-container class="layout-container-demo" style="height: 100%">
      <el-aside width="200px">
        <el-scrollbar>
          <h5 style="text-align: center;">后台管理界面</h5>
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="jump('usermanage')">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="jump('webmanage')">
              <el-icon>
                <document />
              </el-icon>
              <span>数据统计</span>
            </el-menu-item>
            <el-menu-item index="3" @click="jump('commentmanage')">
              <el-icon>
                <setting />
              </el-icon>
              <span>留言管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="jump('webControl')">
              <el-icon>
                <edit />
              </el-icon>
              <span>网站管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="jump('categoryControl')">
              <el-icon>
                <edit />
              </el-icon>
              <span>目录管理</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting />
              </el-icon>
              <template #dropdown>
                <el-dropdown-item @click="toInfo">个人信息</el-dropdown-item>
                <el-dropdown-menu>
                  <el-dropdown-item @click="output()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Administrator</span>
          </div>
        </el-header>
  
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script  setup>
  import { onMounted, ref, reactive } from "vue";
  import { Menu as IconMenu, Setting,Edit } from "@element-plus/icons-vue";
  import router from "@/router";
  import { ElMessage } from 'element-plus';

  import { logoutApiUser,getUserByToken } from "@/api/user";
  
  function jump(url) {
    // 跳转到指定路由
    router.push("/admin/" + url);
  }
  let LOGINUSER = reactive({})

  function output() {
    logoutApiUser()
    router.push("/");
  }
  
  onMounted(() => {
    // 组件挂载后默认跳转到用户管理页面
    jump("usermanage");
    getUserByToken().then((data)=>{
    LOGINUSER = data
    // console.log(LOGINUSER);
    const str = JSON.stringify(LOGINUSER)
    localStorage.setItem("LOGINUSER",str)
  })
  });

  const toInfo = () =>{
  router.push("/info")

}

  </script>
  
  <style scoped>
  .layout-container-demo .el-header {
    position: relative;
    background-color: #e2e1e4;
    color: var(--el-text-color-primary);
  }
  
  .layout-container-demo .el-aside {
    color: black;
    background: #cdd1d3;
  }
  
  .layout-container-demo .el-menu {
    border-right: none;
  }
  
  .layout-container-demo .el-main {
    padding: 0;
  }
  
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  .el-menu-item {
    color: #74787a;
    background: #cdd1d3;
  }
  </style>