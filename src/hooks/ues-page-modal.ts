import { ref } from "vue";
import PageModal from '@/components/page_modal';

type CallbackFn = (item?: any) => void;
export function usePageModal(newCb?:CallbackFn,editCb?:CallbackFn){
    const pageModalRef = ref<InstanceType<typeof PageModal>>();
    const defaultInfo = ref({});
    const handleNew = () => {
        defaultInfo.value = {};
        if(pageModalRef.value){
            pageModalRef.value.centerDialogVisible = true    
        }
        newCb && newCb()
    }
    const handleEdit = (item:any) => {
         defaultInfo.value = { ...item };
         if(pageModalRef.value){
            pageModalRef.value.centerDialogVisible = true    
        }    
        editCb && editCb(item)
    }
    return [pageModalRef,defaultInfo,handleNew,handleEdit]
}
