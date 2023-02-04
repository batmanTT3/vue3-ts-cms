<template>
    <div class="nav_header">
        <div class="content">
            <el-icon v-if="isFold" class="fold_menu" @click="handleFold"><Expand /></el-icon>
            <el-icon v-else class="fold_menu" @click="handleFold"><Fold /></el-icon>
            <GtBreadcrumb :breadcrumbs="breadcrumbs"/>
        </div>
        <userInfo/>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed} from 'vue';
import userInfo from './user_info.vue';
import GtBreadcrumb ,{IBreadcrumb}from '@/base-ui/breadcrumb';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { pathMapBreadcrumbs } from '@/utils/map_menus';

export default defineComponent({
    components:{
        userInfo,
        GtBreadcrumb
    },
    emits:['foldChange'],
    setup(props,{emit}) {
        const isFold = ref(false);
        const handleFold = () =>{
            isFold.value = !isFold.value;
            emit('foldChange',isFold.value)
        }

        //面包屑数据 [{name:'',path:''}]
        const store = useStore();
        const breadcrumbs = computed(()=>{
            const userMenus = store.state.login.userMenus;
            const route = useRoute();
            const curPath = route.path;
            return pathMapBreadcrumbs(userMenus,curPath);
        }) 

        return {
            handleFold,
            breadcrumbs,
            isFold
        }
    },
})
</script>

<style scoped lang='less'>
    .nav_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .content{
            display: flex;
            align-items: center;
            justify-content: center;
            .fold_menu{
                margin-right: 20px;
                font-size: 30px;
                cursor: pointer;
            }
        }
        
    }
</style>