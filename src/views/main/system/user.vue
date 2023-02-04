<template>
  <div class="user">
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
          <el-button type="primary" @click="handleNew">新建用户</el-button>
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
            <el-button
              icon="Edit"
              size="mini"
              type="primary"
              link
              @click="handleEdit(scope.row)"
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

    <PageModal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      ref="pageModalRef"
      @addData="addData"
      @editData="editData"
    ></PageModal>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from "vue";
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
          field: "id",
          type: "input",
          label: "id",
          rules: [],
          placeholder: "请输入用户id",
        },
        {
          field: "name",
          type: "input",
          label: "用户名",
          rules: [],
          placeholder: "请输入用户名",
        },
        {
          field: "realname",
          type: "input",
          label: "真实姓名",
          rules: [],
          placeholder: "请输入真实姓名",
        },
        {
          field: "cellphone",
          type: "input",
          label: "电话号码",
          rules: [],
          placeholder: "请输入电话号码",
        },
        {
          field: "enable",
          type: "select",
          label: "用户状态",
          rules: [],
          placeholder: "请选择用户状态",
          options: [
            { title: "启用", value: 1 },
            { title: "禁用", value: 0 },
          ],
        },
        {
          field: "createAt",
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
    console.log(formData);
    //用户点击重置
    const handleReset = () => {
      formData.value = formOriginData;
      getPageData();
    };
    //用户点击搜索
    const handleQuery = () => {
      getPageData(formData.value);
    };

    // -------------------------------用户列表-------------------------------
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    const getPageData = (queryInfo: any = {}) => {
      console.log(queryInfo);

      store.dispatch("system/getPageListAction", {
        pageUrl: "/users/list",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    getPageData();

    let userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);

    const contentTableConfig = {
      title: "用户列表",
      showIndexColumn: true,
      showSelectColumn: true,
      propList: [
        { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
        {
          prop: "realname",
          label: "真实姓名",
          minWidth: "100",
          slotName: "realname",
        },
        {
          prop: "cellPhone",
          label: "手机号码",
          minWidth: "150",
          slotName: "cellPhone",
        },
        { prop: "enable", label: "状态", minWidth: "100", slotName: "enable" },
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
        { label: "操作", minWidth: "150", slotName: "handler" },
      ],
    };

    //用户选择列表数据
    const selectionChange = (value: any) => {
      console.log(value);
    };
    //用户删除
    const handleDelete = (rowData: any) => {
      for (let i = 0; i < userList.value.length; i++) {
        if (userList.value[i].id == rowData.id) {
          userList = userList.value.splice(i, 1);
          return;
        }
      }
    };
    
    
    // -------------------------------弹窗-------------------------------
    const modalConfig = {
      itemStyle: {},
      colLayout: { span: 24 },
      formItems: [
        {
          field: "name",
          type: "input",
          label: "用户名",
          rules: [],
          placeholder: "请输入用户名",
        },
        {
          field: "password",
          type: "input",
          label: "用户密码",
          rules: [],
          placeholder: "请输入用户密码",
          isHidden: false,
        },
        {
          field: "realname",
          type: "input",
          label: "真实姓名",
          rules: [],
          placeholder: "请输入真实姓名",
        },
        {
          field: "cellPhone",
          type: "input",
          label: "电话号码",
          rules: [],
          placeholder: "请输入电话号码",
        },
        {
          field: "departmentId",
          type: "select",
          label: "选择部门",
          rules: [],
          placeholder: "请选择部门",
          options:[]
        },
        {
          field: "roleId",
          type: "select",
          label: "选择角色",
          rules: [],
          placeholder: "请选择角色",
          options:[]
        },

      ],
    };
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
      passwordItem!.isHidden = true;
    };
    const [pageModalRef, defaultInfo, handleNew, handleEdit] = usePageModal(
      newCallback,
      editCallback
    );

    const departmentItem = modalConfig.formItems.find((item) => item.field === "departmentId");
    departmentItem!.options = store.state.entireDepartment.map((item:any) =>{
        return {title: item.name,value: item.id}
    })  
    const roleItem = modalConfig.formItems.find((item) => item.field === "roleId");
    roleItem!.options = store.state.entireRole.map((item:any) =>{
        return {title: item.name,value: item.id}
    })  

    //编辑数据
    const editData = (data:any,info:any) => {
        console.log('111111',data,info);
        
        for (let i=0;i<userList.value.length;i++){
            if(info.id==userList.value[i].id){
                store.state.system.userList[i] = data
            }
        }
    }
    //新增数据 
    const addData = (data:any) => {
        console.log(data);
        store.state.system.userList.unshift(data)
    }

    return {
      formConfig,
      formData,
      userList,
      userCount,
      contentTableConfig,
      selectionChange,
      handleReset,
      handleQuery,
      getPageData,
      pageInfo,
      handleDelete,
      modalConfig,
      handleNew,
      handleEdit,
      pageModalRef,
      defaultInfo,
      addData,
      editData,
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