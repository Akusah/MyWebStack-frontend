<template>
  <!-- 组件模板 -->
  <div>
    <el-table :data="comments.pageComments" style="width: 100%">
      <el-table-column prop="commentId" label="评论ID"></el-table-column>
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="currentUsername" label="用户名"></el-table-column>
      <el-table-column prop="rate" label="评分"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="webId" label="留言网站">
        <template v-slot:default="scope">
          <el-button @click="toWebPage(scope.row.webId)">
            {{ scope.row.webTitle }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="deleteComment(scope.row.commentId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="pageInfo.total"
        :page-count="pageInfo.pageCount"
        @current-change="handleCurrentChange"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";

import { getAllComments } from "@/api/comment";

import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

let comments = reactive([]);
let pageInfo = reactive({});

const startPage = ref(1);

const loadComment = async (currentPage) => {
  comments = await getAllComments(currentPage);
  pageInfo = comments.pageInfo;
  console.log(comments);
  instance.proxy.$forceUpdate();
};

const handleCurrentChange = (val) => {
  console.log(`当前页：${val}`);
  loadComment(val);
};

onMounted(() => {
  loadComment(startPage.value);
});

const toWebPage = (webId) => {
  const routePath = {
    path: "/webPage",
    query: {
      webId: webId,
    },
  };
  router.push(routePath);
};
</script>
