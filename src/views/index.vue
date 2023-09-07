<template>
  <el-container class="layout-container-demo">
    <el-aside width="220px">
      <img src="../assets/images/logo_dark@2x.png" alt="" />
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <div v-for="(menu, idx) in webItems">
            <el-menu-item v-if="Object.keys(menu.childrenCategory).length === 0" :index="`${idx}`">
              <el-icon :class="menu.icon"></el-icon>
              <span v-if="value === '1'">{{ menu.categoryName }}</span>
              <span v-if="value === '2'">{{ menu.categoryJpname }}</span>
              <span v-if="value === '3'">{{ menu.categoryEngname }}</span>
            </el-menu-item>
          <el-sub-menu v-if="Object.keys(menu.childrenCategory).length != 0" :index="`${idx}`">
            <template #title>
              <el-icon :class="menu.icon"></el-icon>
              <span v-if="value === '1'">{{ menu.categoryName }}</span>
              <span v-if="value === '2'">{{ menu.categoryJpname }}</span>
              <span v-if="value === '3'">{{ menu.categoryEngname }}</span>
            </template>
            <el-menu-item v-for="(submenu, index) in menu.childrenCategory" :index="`${idx}-${index}`">
              <span v-if="value === '1'">{{ submenu.categoryName }}</span>
              <span v-if="value === '2'">{{ submenu.categoryJpname }}</span>
              <span v-if="value === '3'">{{ submenu.categoryEngname }}</span>
            </el-menu-item>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px" class="container">
        <el-select v-model="value" class="m-2" placeholder="中文" @change="changeLuanguage(value)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>个人中心</span>
        </div>
      </el-header>

      <el-main>
        <div>
          <div style="
              position: relative;
              left: 0px;
              top: 0px;
              background-color: #f9f9f9;
            " v-for="(item, idx) in webItems" :key="idx" class="webBox">
            <div v-if="Object.keys(item.webList).length != 0" :id="item.categoryEngname">
              <WebItem :item="item" />
            </div>
            <div v-else v-for="(subItem, idx) in item.childrenCategory" :id="subItem.categoryEngname" :key="idx">
              <WebItem :item="subItem" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, onMounted, onBeforeMount, ref } from "vue";
import { getWebList, getWebListUnderCategory } from "@/api/web";
import { logoutApiUser, getUserByToken } from "@/api/user";
import router from "@/router";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";


import WebItem from '@/components/web/WebItem.vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const logout = () => {
  logoutApiUser()
  instance.proxy.$forceUpdate();
}

let categoryItems = reactive({});
let webItems = reactive({})

let LOGINUSER = reactive({})

const value = ref('1')

const options = [
  {
    value: '1',
    label: '中文',
  },
  {
    value: '2',
    label: '日本語',
  },
  {
    value: '3',
    label: 'English',
  }]

const changeLuanguage = (value) => {
  console.log(value);
}

onBeforeMount(() => {
  const storedCategoryData = JSON.parse(localStorage.getItem("categoryItems"));
  const storedWebData = JSON.parse(localStorage.getItem("webItems"));

  if (storedCategoryData) {
    categoryItems = storedCategoryData;
  } else {
    getWebList().then((data) => {
      categoryItems = data;
      localStorage.setItem("categoryItems", JSON.stringify(data));
    });
  }

  if (storedWebData) {
    webItems = storedWebData;
  } else {
    getWebListUnderCategory().then((data) => {
      webItems = data;
      console.log(webItems);
      localStorage.setItem("webItems", JSON.stringify(data));
    });
  }

  getUserByToken().then((data) => {
    LOGINUSER = data
    const str = JSON.stringify(LOGINUSER)
    localStorage.setItem("LOGINUSER", str)
  })
});

const toInfo = () => {
  router.push("/info")

}

</script>

<style>
.layout-container-demo .el-header {
  background-color: #e0e0e0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.container {
  overflow: hidden;
}

.m-2 {
  float: left;
  padding: 5px;
  width: 90px;
}
</style>
