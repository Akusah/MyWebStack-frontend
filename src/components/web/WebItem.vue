<template>
  <div class="container" v-if="item?.webList !=null">
    <h4>
      {{ item?.categoryName }}
    </h4>
    <div class="row">
      <div v-for="(web, idx) in item?.webList" :key="idx" class="web-block">
        <el-card shadow="hover" :body-style="{ padding: '10px' }" class="box-card" @click="toWebPage(web.webId)">
          <div>
            <div>
              <img :src="web.logo" width="40" style="margin-right: 5%;" />
            </div>
            <p class="card-description">
              <strong>{{ web.webTitle }}</strong>
              <br />
              {{ web.webDesc }}
            </p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";

import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  item: Object
})

const toWebPage = (webId) =>{
  const routePath = {
    path: "/webPage",
    query: {
      webId: webId
    }
  };
  router.push(routePath)
}
</script>

<style scoped>
i {
  margin-right: 7px;
}

.container {
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 1px;
}

.el-card {
  overflow: hidden;
}

.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

img {
  float: left;
}

.text_line {
  clear: both;
  margin-bottom: 2px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.web-block {
  width: 25%;
  /* 每个网站元素所占的宽度修改为 25% */
  box-sizing: border-box;
  /* 添加盒模型属性 */
  padding-left: 10px;
  /* 为每个网站元素添加左内边距 */
  padding-right: 10px;
  /* 为每个网站元素添加右内边距 */
  margin-bottom: 20px;
}
</style>
