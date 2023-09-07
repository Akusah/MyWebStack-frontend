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
          <el-input v-model="search" size="small" placeholder="搜索网站" @input="handleSearch" />
          <el-button icon="Plus" circle size="small" style="margin-left: 10px" @click="addWebBox" />
        </div>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleBan(scope.$index, scope.row)">禁用</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="display: flex; justify-content: center">
    <el-pagination small background layout="prev, pager, next" :total="pageInfo.total" :page-count="pageInfo.pageCount"
      @current-change="handleCurrentChange" class="mt-4" />
  </div>


  <el-dialog v-model="editFormVisible" title="编辑网站信息" width="50%" style="z-index: 9999">
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
        <!-- <el-input v-model="editForm.categoryId" /> -->
        <el-select v-model="editForm.categoryId" filterable placeholder="选择目录">
          <el-option-group v-for="group in categoryItems" :key="group.categoryId" :label="group.categoryName">
            <el-option v-for="item in group.childrenCategory" :key="item.categoryId" :label="item.categoryName"
              :value="item.categoryId" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="editForm.disable" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="图标上传">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <el-icon>
                    <Download />
                  </el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">返回</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </span>
  </el-dialog>


  <div class="dialog-container">
    <el-dialog v-model="banFormVisible" title="禁用用户" width="30%" center>
      <p>确定要禁用此网站吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="banFormVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmBan">确认</el-button>
      </div>
    </el-dialog>
  </div>

  <el-dialog v-model="addFormVisible" title="新建网站信息" width="50%" style="z-index: 9999">
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
      <el-form-item label="上级目录">
        <el-select v-model="addForm.categoryId" filterable placeholder="选择目录">
          <el-option-group v-for="group in categoryItems" :key="group.categoryId" :label="group.categoryName">
            <el-option v-for="item in group.childrenCategory" :key="item.categoryId" :label="item.categoryName"
              :value="item.categoryId" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="addForm.disable" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="图标上传">
        <el-upload action="http://localhost:8080/api/admin/uploadFile" :headers="headerObj" list-type="picture-card" :auto-upload="true" :on-success="handleSuccess">
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit">返回</el-button>
      <el-button type="primary" @click="confirmAdd">添加</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { takeAccessToken,getAllWeb, updateWebInfo,addWeb } from "@/api/web";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)


const headerObj = ref({
  Authorization: `Bearer ${takeAccessToken()}`,
})


const handleRemove = (file) => {
  console.log(file)
}

const handleSuccess = (res) => {
  addForm.logo = "assets/images/logos/"+ res.message
}

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

const cancelEdit = () => {
  addFormVisible.value = false;
  addForm = {
    webTitle: '',
    webDesc: '',
    url: '',
    pid: '',
    disable: 0
  };
}

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

let categoryItems = reactive([]);
onMounted(() => {
  getUserList(1);
  const storedCategoryData = JSON.parse(localStorage.getItem("categoryItems"));
  if (storedCategoryData) {
    categoryItems = storedCategoryData;
  }
  // 删除最后一项
  // categoryItems.pop();
  categoryItems.forEach(category => {
    if (category.childrenCategory.length === 0) {
      category.childrenCategory.push({
        categoryId: category.categoryId,
        categoryName: category.categoryName
      })
    }
  })
});

const addWebBox = () => {
  addFormVisible.value = true;
};

const confirmAdd = async () => {
  console.log(addForm);
  await addWeb(addForm);
  cancelEdit()
  getUserList(1);
  
}
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

.dialog-container .dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.dialog-container .dialog-footer .el-button {
  margin-left: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
