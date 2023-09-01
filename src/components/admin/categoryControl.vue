<template>
  <div style="margin-top:10px auto;">
    <el-tree
      :data="categoryItems"
      :props="treeProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @check-change="handleCheckChange"
    >

    </el-tree>
  </div>


</template>



<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import { getWebList } from "@/api/web";

let categoryItems = reactive([]);

const treeProps = reactive({
  label: 'categoryName',
  children: 'childrenCategory' 
})

const handleCheckChange =(data) => {
      // 处理复选框状态变化的回调函数
      console.log('Selected Categories:', data);
    }

onMounted(()=>{
    const storedCategoryData = JSON.parse(localStorage.getItem("categoryItems"));
    if (storedCategoryData ) {
    categoryItems = storedCategoryData ;
  } else {
    getWebList().then((data) => {
        categoryItems = data;
        localStorage.setItem("categoryItems", JSON.stringify(data));
    });
  }
  console.log(categoryItems);

})
</script>