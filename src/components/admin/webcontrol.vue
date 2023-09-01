<template>
  <el-table :data="filteredUserList" style="width: 100%">
    <el-table-column label="网站ID" prop="webId" class="centered-column" />
    <el-table-column label="icon" prop="logo" class="centered-column">
      <template #default="{ row }">
        <img :src="'http://localhost:5173/' + row.logo" />
      </template>
    </el-table-column>
    <el-table-column label="网站名" prop="webTitle" class="centered-column" />
    <el-table-column label="描述" prop="webDesc" class="centered-column" />
    <el-table-column label="地址" prop="url" class="centered-column">
      <template #default="{ row }">
        <a :href="row.url">{{ row.url }}</a>
      </template>
    </el-table-column>
    <el-table-column label="目录" prop="categoryName" class="centered-column">
      <template #default="{ row }">
        <el-button type="primary" disabled>{{ row.categoryName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="是否禁用" prop="status" class="centered-column">
      <template #default="{ row }">
        <el-button :type="getStatusButton(row.status)" disabled>{{
          getStatusText(row.status)
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="search-bar">
          <el-input
            v-model="search"
            size="small"
            placeholder="搜索网站"
            @input="handleSearch"
          />
          <el-button
            icon="Plus"
            circle
            size="small"
            style="margin-left: 10px"
            @click="addWeb"
          />
        </div>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleBan(scope.$index, scope.row)"
          >禁用</el-button
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

  <el-dialog
    v-model="editFormVisible"
    title="编辑网站信息"
    width="50%"
    style="z-index: 9999"
  >
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="网站名">
        <el-input v-model="editForm.webTitle" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="editForm.webDesc" type="textarea" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editForm.url" />
      </el-form-item>
      <el-form-item label="目录">
        <el-input v-model="editForm.categoryId" />
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch
          v-model="editForm.disable"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="图标上传">
        <div style="border: 1px solid">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">返回</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </span>
  </el-dialog>

  <el-dialog v-model="banFormVisible" title="禁用用户" width="30%" center>
    <p>确定要禁用此网站吗？</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="banFormVisible = false">取消</el-button>
      <el-button type="danger" @click="confirmBan">确认</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-model="addFormVisible"
    title="新建网站信息"
    width="50%"
    style="z-index: 9999"
  >
    <el-form :model="addForm" label-width="80px">
      <el-form-item label="网站名">
        <el-input v-model="addForm.webTitle" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addForm.webDesc" type="textarea" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="addForm.url" />
      </el-form-item>
      <el-form-item label="目录">
        <el-input v-model="addForm.categoryName" />
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch
          v-model="addForm.disable"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="图标上传">
        <div style="border: 1px solid">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">返回</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getAllWeb,getMainCategory,updateWebInfo } from "@/api/web";
import { Plus } from "@element-plus/icons-vue";

import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

const imageUrl = ref("");

const handleAvatarSuccess = (res, file) => {
  imageUrl = URL.createObjectURL(file.raw);
};

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    this.$message.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    this.$message.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
};

let webList = reactive([]);
let pageInfo = reactive({});

const editFormVisible = ref(false);
const banFormVisible = ref(false);

let editForm = reactive({}); // 当前编辑的用户信息

let addForm = reactive({});
const addFormVisible = ref(false);

const search = ref("");
const isDataLoaded = ref(false);

const filteredUserList = ref([]);

const filterUserList = () => {
  if (isDataLoaded.value && webList.pageWeb.length > 0) {
    filteredUserList.value = webList.pageWeb.filter((web) =>
      web.webTitle.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    filteredUserList.value = [];
  }
};

const handleSearch = () => {
  filterUserList(); // 获取用户列表后过滤用户
};

const getUserList = async (currentPage) => {
  webList = await getAllWeb(currentPage);
  pageInfo = webList.pageInfo;
  isDataLoaded.value = true; // 数据加载完成后设置为 true
  instance.proxy.$forceUpdate();
  filterUserList(); // 获取用户列表后过滤用户
};

const getStatusButton = (status) => {
  return status === 1 ? "success" : "warning";
};

const getStatusText = (status) => {
  return status === 1 ? "正常" : "禁用";
};

const getDeletedButton = (disable) => {
  return disable === 0 ? "success" : "danger";
};

const handleEdit = (index, row) => {
  editForm = row;
  editFormVisible.value = true; // 显示编辑弹窗
  instance.proxy.$forceUpdate();
};

const handleBan = (index, row) => {
  editForm = row;
  banFormVisible.value = true; // 显示编辑弹窗
  instance.proxy.$forceUpdate();
};

const saveEdit = async () => {
  await updateWebInfo(editForm);
  webList = await getAllWeb(pageInfo.currentPage);
  editFormVisible.value = false;
  instance.proxy.$forceUpdate();
  console.log(webList);
};

const confirmBan = async () => {
  editForm.disable = 1;
  await updateWebInfo(editForm);
  webList = await getAllWeb();
  banFormVisible.value = false;
  instance.proxy.$forceUpdate();
};

const handleCurrentChange = (val) => {
  console.log(`当前页：${val}`);
  getUserList(val);
  instance.proxy.$forceUpdate();
};

onMounted(() => {
  getUserList(1);
});

const addWeb = () => {
  addFormVisible.value = true;
};
</script>

<style scoped>
.centered-column .cell {
  text-align: center;
}

.search-bar {
  display: flex;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
