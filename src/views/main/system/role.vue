<template>
  <div class="user">
    <div class="search">
      <GtForm v-bind="formConfig" v-model="formData">
        <template #header>
          <h1 class="search_title">高级检索</h1>
        </template>
        <template #footer>
          <div class="search_btn">
            <el-button class="el_btn" size="large" icon="Refresh"
              >重置</el-button
            >
            <el-button class="el_btn" size="large" type="primary" icon="Search"
              >搜索</el-button
            >
          </div>
        </template>
      </GtForm>
    </div>

    <div class="content">
      <GtTable
        @selectionChange="selectionChange"
        :listData="roleList"
        v-bind="contentTableConfig"
      >
        <!-- 1.header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary" @click="handleNew">新建用户</el-button>
          <el-button icon="Refresh"></el-button>
        </template>
        <!-- 2.列中的插槽 -->
        <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
        </template>
        <template #handler="scope">
          <div class="handle_btns">
            <el-button icon="Edit" size="mini" type="primary" link  @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button icon="Delete" size="mini" type="danger" link  @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </GtTable>
    </div>

    <PageModal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      @addData="addData"
      @editData="editData"
    >
      <el-tree
        :data="menus"
        node-key="id"
        :props="{chaildren:'children',label:'name'}"
        show-checkbox
        @check="handleCheckChange"
      />
    </PageModal>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import GtForm, { IFormItem, IForm } from "@/base-ui/form";
import GtTable from "@/base-ui/table";
import PageModal from "@/components/page_modal";
import { usePageModal } from "@/hooks/ues-page-modal";
export default defineComponent({
  name: "name",
  components: {
    GtForm,
    GtTable,
    PageModal,
  },
  setup() {
    const store = useStore();
    const formConfig: IForm = {
      labelWidth: "120px",
      itemLayout: {
        padding: "10px 20px",
      },
      formItems: [
        {
          field: "name",
          type: "input",
          label: "角色名称",
          rules: [],
          placeholder: "请输入角色名称",
        },
        {
          field: "powerDesc",
          type: "input",
          label: "权限介绍",
          rules: [],
          placeholder: "请输入权限介绍",
        },
        {
          field: "createTime",
          type: "datepicker",
          label: "创建时间",
          rules: [],
          otherOptions: {
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            type: "daterange",
          },
        },
      ],
    };

    const formOriginData: any = {};
    for (const item of formConfig.formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    // 角色列表
    store.dispatch("system/getPageListAction", {
      pageUrl: "/role/list",
      queryInfo: {
        offset: 0,
        size: 10,
      },
    });

    const roleList = computed(() => store.state.system.roleList);
    const roleCount = computed(() => store.state.system.roleCount);

    const contentTableConfig = {
      title: "角色列表",
      showIndexColumn: true,
      showSelectColumn: true,
      propList: [
        { prop: "name", label: "角色名", minWidth: "100", slotName: "name" },
        {
          prop: "powerDesc",
          label: "权限介绍",
          minWidth: "100",
          slotName: "powerDesc",
        },
        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "250",
          slotName: "createAt",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "250",
          slotName: "updateAt",
        },
        { label: "操作", minWidth: "120", slotName: "handler" },
      ],
    };

    const selectionChange = (value: any) => {
      console.log(value);
    };

    // -------------------------------弹窗-------------------------------
    const menus = computed(()=>store.state.entireMenu);
    const otherInfo = ref({});
    const handleCheckChange = (data1:any,data2:any)=>{
        const checkedKeys = data2.checkedKeys;
        const halfCheckedKeys = data2.halfCheckedKeys;
        const menuList = [...checkedKeys,...halfCheckedKeys];
        console.log('menuList',menuList);
        otherInfo.value = { menuList } 
    }
    const modalConfig = {
      itemStyle: {},
      colLayout: { span: 24 },
      formItems: [
        {
          field: "name",
          type: "input",
          label: "角色名称",
          rules: [],
          placeholder: "请输入角色名称",
        },
        {
          field: "powerDesc",
          type: "input",
          label: "角色描述",
          rules: [],
          placeholder: "请输入角色描述",
        },
      ],
    };
    
    const editCallback = (item:any) =>{
        console.log(item);
    }
    const [pageModalRef, defaultInfo, handleNew, handleEdit] = usePageModal(undefined,editCallback);

    //编辑数据
    const editData = (data: any, info: any) => {
      console.log("111111", data, info);

      for (let i = 0; i < roleList.value.length; i++) {
        if (info.id == roleList.value[i].id) {
          store.state.system.roleList[i] = data;
        }
      }
    };
    //新增数据
    const addData = (data: any) => {
      console.log(data);
      store.state.system.roleList.unshift(data);
    };
    return {
      formConfig,
      formData,
      roleList,
      roleCount,
      contentTableConfig,
      selectionChange,
      modalConfig,
      handleNew,
      handleEdit,
      pageModalRef,
      defaultInfo,
      addData,
      editData,
      menus,
      otherInfo,
      handleCheckChange
    };
  },
});
</script>

<style scoped lang='less'>
.search_title {
  text-align: center;
}
.search_btn {
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: flex-end;
  .el_btn {
    width: 150px;
  }
}
</style>