<template>
  <div v-if="isDataLoaded">
    <div class="pageBox">
      <div class="logo">
        <el-card
          class="box-card"
          :body-style="{ padding: '5px' }"
          shadow="always"
        >
          <img :src="web.logo" class="image" />
        </el-card>
      </div>
      <div class="web-item">
        <h3 class="title">{{ web.webTitle }}</h3>
        <div class="rateBox" v-if="isCommentLoaded">
          大众评分：
          <el-rate
            v-model="comments.rate"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            allow-half
            :texts="['极差', '失望', '一般', '满意', '惊喜']"
            show-text
            disabled
          />
        </div>
        <p class="desc">网站简介：{{ web.webDesc }}</p>
        <el-button type="success">
          <el-icon style="vertical-align: middle">
            <Link />
          </el-icon>
          <span style="vertical-align: middle">
            <a class="url" :href="web.url" target="_blank">链接直达</a>
          </span>
        </el-button>
        <el-button type="warning" style="margin-left: 20px">
          <el-icon style="vertical-align: middle">
            <Warning />
          </el-icon>
          <span style="vertical-align: middle" @click="logout"> 反馈 </span>
        </el-button>
      </div>
    </div>
    <div class="commentBox">
      <!-- 附上icon -->
      <div class="title">
        <el-icon size="30" style="vertical-align: middle">
          <ChatLineRound />
        </el-icon>
        <span style="vertical-align: middle; font-size: large">
          <strong>评论区</strong>
        </span>
      </div>
      <div class="rateBox">
        您的评分：
        <el-rate
          v-model="commentedMessage.rate"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          allow-half
          :texts="['极差', '失望', '一般', '满意', '惊喜']"
          show-text
        />
      </div>
      <el-input
        type="textarea"
        placeholder="请输入评论"
        v-model="commentedMessage.content"
      ></el-input>
      <div style="text-align: right; margin: 10px 0">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
      <div class="pastComment" v-if="isCommentLoaded">
        历史评论
        <div
          style="margin: 20px 0; text-align: left"
          v-if="comments.pageComment.comments.length != 0"
        >
          <div
            class="comBox"
            v-for="item in comments.pageComment.comments"
            :key="item.commentId"
          >
            <div style="display: flex">
              <div style="width: 70px">
                <img
                  class="user-avatar"
                  :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"
                  alt=""
                />
              </div>
              <div style="flex: 1">
                <div style="display: flex; justify-content: space-between">
                  <b>{{ item.currentUsername }}</b>
                  <span>{{ item.createtime }}</span>
                </div>
                <div style="margin-top: 10px; color: #666">
                  {{ item.content }}
                </div>
                <!--多级回复-->
                <div style="text-align: right; padding: 6px 0">
                  <el-button
                    type="default"
                    @click="reply(item.commentId, item.userId)"
                    >回复</el-button
                  >
                </div>
                <!--回复列表-->
                <div v-if="item.children">
                  <div v-for="sub in item.children" :key="sub.commentId">
                    <div
                      style="border-left: 2px dashed #666; padding-left: 20px"
                    >
                      <b
                        style="cursor: pointer; margin-right: 5px"
                        @click="reply(sub.pid, sub.userId)"
                        >{{ sub.currentUsername }}</b
                      >
                      <span
                        >回复
                        <span style="color: cornflowerblue"
                          >@{{ sub.targetName }}：</span
                        ><span style="color: #666; margin-left: 10px">{{
                          sub.content
                        }}</span></span
                      >
                      <span style="float: right; color: #868484">{{
                        sub.createtime
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div v-else>
          <div style="color: #868484">暂无评论</div>
        </div>

        <el-dialog v-model="dialogFormVisible" title="评论回复" width="40%">
          <el-form :model="replyComment">
            <el-form-item label="内容" :label-width="100">
              <el-input
                type="textarea"
                placeholder="请输入内容..."
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="replyComment.content"
                autocomplete="off"
                style="width: 80%"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveReply"> 回 复 </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { ChatLineRound, Warning, Link } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

import { getWebById } from "@/api/web";
import { getCommentByWebId, PostComment } from "@/api/comment";

import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

const route = useRoute();

let web = reactive({});
const isDataLoaded = ref(false);
const isCommentLoaded = ref(false);
const dialogFormVisible = ref(false);

let comments = reactive([]);

const commentedMessage = reactive({
  rate: 0,
  content: "",
  userId: undefined,
  webId: route.query.webId,
  target: null,
  pid: null,
});


const replyComment = reactive({
  rate: 0,
  content: "",
  userId: undefined,
  webId: route.query.webId,
  target: -1,
  pid: -1,
});

let pageInfo = reactive({});

onMounted(() => {
  const webId = route.query.webId;
  const startPage = 1;
  loadComment(webId, startPage);
  getWebById(webId).then((data) => {
    web = data;
    isDataLoaded.value = true;
  });
  const str = localStorage.getItem("LOGINUSER");
  if (!str) return null;
  const authObj = JSON.parse(str);
  commentedMessage.userId = authObj.id;
  replyComment.userId = commentedMessage.userId
});

const loadComment = async (webId, currentPage) => {
  comments = await getCommentByWebId(webId, currentPage);
  pageInfo = comments.pageComment.pageInfo;
  isCommentLoaded.value = true;
  instance.proxy.$forceUpdate();
};

const submit = async () => {
  console.log("提交评论");
  if (!commentedMessage.content) {
    ElMessage.warning("请输入评论内容");
  } else {
    await PostComment(commentedMessage);
    await loadComment(route.query.webId, pageInfo.currentPage);
    console.log(comments);
  }
};

const reply = (parentCommentId, targetUserId) => {
  replyComment.pid = parentCommentId
  replyComment.target = targetUserId
  dialogFormVisible.value = true
  instance.proxy.$forceUpdate();
};


const saveReply = async () => {
  dialogFormVisible.value = false
  instance.proxy.$forceUpdate();
  await PostComment(replyComment);
  replyComment.content = ''
  await loadComment(route.query.webId, pageInfo.currentPage);
  
}


const handleCurrentChange = (val) => {
  console.log(`当前页：${val}`);
  loadComment(route.query.webId, val);
};
</script>

<style scoped>
.pageBox {
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 3%;
  display: flex;
  user-select: none;
}

.logo {
  flex-basis: 150px;
}

.box-card {
  width: 130px;
}

.web-item {
  flex-grow: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 16px;
}

.btn {
  margin-right: 80%;
  margin-top: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.desc {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.url {
  color: white;
  font-size: 16px;
  text-decoration: none;
}

.url:hover {
  text-decoration: underline;
}

.commentBox {
  width: 1000px;
  margin: 0 auto;
}

.pastComment {
  margin: 10px 0;
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.comBox {
  padding: 10px 0;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.rateBox {
  margin-bottom: 10px;
}
</style>
