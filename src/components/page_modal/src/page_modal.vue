<template>
  <!-- 弹窗开始 -->
  <div class="page_modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="30%"
      center
    >
      <GtForm v-bind="modalConfig" v-model="formData"></GtForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 弹窗结束 -->
</template>

<script lang='ts'>
import { defineComponent ,ref, watch} from "vue";
import GtForm from '@/base-ui/form';
export default defineComponent({
  components:{
    GtForm
  },
  props:{
    modalConfig:{
      type: Object,
      required: true
    },
    defaultInfo:{
      type:Object,
      default: () => ({})
    },
    otherInfo:{
      type: Object,
      default: () => ({})
    }
  },
  emits:['addData','editData'],
  setup(props,{emit}) {
    const formData = ref<any>({});
    const centerDialogVisible = ref(false);

    watch(() => props.defaultInfo,
      (newValue) =>{
        for(const item of props.modalConfig.formItems){
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const handleConfirm = () => {
      centerDialogVisible.value = false;
      if(Object.keys(props.defaultInfo).length){
        //编辑
        emit('editData',formData.value,props.defaultInfo)
      }else{
        //新建
        emit('addData',formData.value)
      }

    }

    return {
      formData,
      centerDialogVisible,
      handleConfirm
    };
  },
});
</script>

<style scoped lang='less'>
</style>