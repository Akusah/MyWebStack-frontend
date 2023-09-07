<template>
  <div style="margin: 10px auto ;">
    <el-button type="primary" @click="showAddCategoryBox">添加</el-button>
    <el-button type="danger" @click="showDeleteBox">删除</el-button>
  </div>
  <div style="margin-top:10px auto;">
    <el-tree :data="categoryItems" :props="treeProps" show-checkbox node-key="id" default-expand-all
      :expand-on-click-node="false" @check-change="handleCheckChange" @node-uncheck="handleUncheckChange">
    </el-tree>
  </div>

  <el-dialog v-model="addFormVisible" title="新建网站信息" width="50%" style="z-index: 9999">
    <el-form :model="addForm" label-width="80px">
      <el-form-item label="目录名">
        <el-input v-model="addForm.categoryName" />
      </el-form-item>
      <el-form-item label="目录属性">
        <el-radio-group v-model="radio" class="ml-4">
      <el-radio label="1" size="large">主目录</el-radio>
      <el-radio label="2" size="large">子目录</el-radio>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="上级目录" v-if="radio==='2'">
        <el-select v-model="addForm.pid" filterable placeholder="选择目录">
          <el-option v-for="item in categoryItems" :key="item.categoryId" :label="item.categoryName"
            :value="item.categoryId" />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit">返回</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </span>
  </el-dialog>

  <div class="dialog-container">
    <el-dialog v-model="banFormVisible" title="禁用用户" width="30%" center>
      <p>确定要删除此目录吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="banFormVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmBan">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import { getWebList, addCategory,deleteCategory } from "@/api/web";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();


const radio = ref('1')
const banFormVisible = ref(false)
const treeProps = reactive({
  label: 'categoryName',
  children: 'childrenCategory'
})

const handleCheckChange = (data) => {
  if (!selectedNodes.includes(data.categoryId)) {
    selectedNodes.push(data.categoryId)
  }
}

let categoryItems = reactive([]);
onMounted(() => {
  const storedCategoryData = JSON.parse(localStorage.getItem("categoryItems"));
  if (storedCategoryData) {
    categoryItems = storedCategoryData;
  } else {
    loadCategory()
  }
  // 删除最后一项
  // categoryItems.pop();
  instance.proxy.$forceUpdate();

})


const addFormVisible = ref(false);
const showAddCategoryBox = () => {
  addFormVisible.value = true;
}

let addForm = reactive({});

const cancelEdit = ()=>{
  addFormVisible.value = false;
  addForm = {
    categoryName: '',
    pid: ''
  };
  radio.value = '1'
}

const cancelDelete = () =>{
  selectedNodes = [];
  banFormVisible.value = false
}
const loadCategory = async ()=>{
  localStorage.removeItem("categoryItems")
  categoryItems = await getWebList()
  localStorage.setItem("categoryItems", JSON.stringify(categoryItems));
  instance.proxy.$forceUpdate();
}

const saveEdit = async () => {
  await addCategory(addForm);
  cancelEdit()
  loadCategory()
  
};

let selectedNodes = reactive([])
const showDeleteBox = () => {
  banFormVisible.value = true

}

const confirmBan = async (node,data) => {
    // for (const node of selectedNodes) {
  //   console.log('要删除的节点：', node);
  // }
  await deleteCategory(selectedNodes)
  cancelDelete()
  loadCategory()
};

</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>