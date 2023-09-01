<template>
  <el-table :data="filteredUserList" style="width: 100%">
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column label="电话号码" prop="phone" />
    <el-table-column label="状态" prop="status">
      <template #default="{ row }">
        <el-button :type="getStatusButton(row.status)" disabled>{{
          getStatusText(row.status)
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="是否禁用" prop="disable">
      <template #default="{ row }">
        <el-button :type="getDeletedButton(row.disable)" disabled>{{
          getDeletedText(row.disable)
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="身份权限" prop="isAdmin">
      <template #default="{ row }">
        <el-button
          type="success"
          :color="getAuthorityButton(row.isAdmin)"
          disabled
          >{{ getAuthorityText(row.isAdmin) }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索用户" @input="handleSearch" />
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
    title="编辑用户"
    width="50%"
    style="z-index: 9999"
  >
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editForm.email" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="editForm.phone" />
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
      <el-form-item label="身份权限">
        <el-radio-group v-model="editForm.isAdmin">
          <el-radio :label="0">用户</el-radio>
          <el-radio :label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">返回</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </span>
  </el-dialog>

  <el-dialog v-model="banFormVisible" title="禁用用户" width="30%" center>
    <p>确定要禁用该用户吗？</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="banFormVisible = false">取消</el-button>
      <el-button type="danger" @click="confirmBan">确认</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import axios from "axios";
import { getAllUser, updateInfo } from "@/api/user";

import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

let userList = reactive([]);
let pageInfo = reactive({});

const editFormVisible = ref(false);
const banFormVisible = ref(false);

let editForm = reactive({}); // 当前编辑的用户信息

const search = ref('');
const isDataLoaded = ref(false)

const filteredUserList = ref([]);


const filterUserList = () => {
  if (isDataLoaded.value && userList.pageUser.length > 0) {
    filteredUserList.value = userList.pageUser.filter((user) =>
      user.username.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    filteredUserList.value = [];
  }
};

const handleSearch = () => {
  filterUserList(); // 获取用户列表后过滤用户
};


const getUserList = async (currentPage) => {
  userList = await getAllUser(currentPage);
  console.log(userList);
  pageInfo = userList.pageInfo;
  instance.proxy.$forceUpdate();
  isDataLoaded.value = true; // 数据加载完成后设置为 true

  filterUserList(); // 获取用户列表后过滤用户
};

const getStatusButton = (status) => {
  return status === 1 ? "success" : "warning";
};

const getStatusText = (status) => {
  return status === 1 ? "已激活" : "未激活";
};

const getDeletedButton = (disable) => {
  return disable === 0 ? "success" : "danger";
};

const getDeletedText = (disable) => {
  return disable === 0 ? "正常" : "禁用";
};
const getAuthorityText = (isAdmin) => {
  return isAdmin === 1 ? "管理员" : "用户";
};

const getAuthorityButton = (isAdmin) => {
  return isAdmin === 1 ? "#624aef" : "#628aef";
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
  await updateInfo(editForm);
  userList = await getAllUser();
  editFormVisible.value = false;
  instance.proxy.$forceUpdate();
  console.log(userList);
};

const confirmBan = async () => {
  editForm.disable = 1;
  await updateInfo(editForm);
  userList = await getAllUser();
  banFormVisible.value = false;
  instance.proxy.$forceUpdate();
};

const handleCurrentChange = (val) => {
  console.log(`当前页：${val}`);
  getUserList(val);

};

onMounted(() => {
  getUserList(1);
});
</script>
