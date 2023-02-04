<template>
  <div class="content">
    <GtTable
      @selectionChange="selectionChange"
      v-model:page="pageInfo"
      :listCount="userCount"
      :listData="userList"
      v-bind="contentTableConfig"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="centerDialogVisible = true"
          >新建用户</el-button
        >
        <el-button icon="Refresh"></el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable == 1 ? 'success' : 'danger'"
        >
          {{ scope.row.enable == 1 ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle_btns">
          <el-button icon="Edit" size="mini" type="primary" link
            >编辑</el-button
          >
          <el-button
            icon="Delete"
            size="mini"
            type="danger"
            link
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </GtTable>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang='less'>
</style>