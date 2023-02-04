<template>
  <div class="search">
    <GtForm v-bind="formConfig" v-model="formData">
      <template #header>
        <h1 class="search_title">高级检索</h1>
      </template>
      <template #footer>
        <div class="search_btn">
          <el-button
            class="el_btn"
            size="large"
            icon="Refresh"
            @click="handleReset"
            >重置</el-button
          >
          <el-button
            class="el_btn"
            size="large"
            type="primary"
            icon="Search"
            @click="handleQuery"
            >搜索</el-button
          >
        </div>
      </template>
    </GtForm>
  </div>
</template>

<script lang='ts'>
import { defineComponent ,ref} from "vue";
import GtForm, { IForm } from "@/base-ui/form";
export default defineComponent({
  components: {
    GtForm,
  },
  setup() {
  
    return {};
  },
});
</script>

<style scoped lang='less'>
</style>