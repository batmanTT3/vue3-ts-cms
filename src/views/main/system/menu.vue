<template>
    <div class="menu">

        <div class="content">
            <GtTable @selectionChange="selectionChange" v-model:page="pageInfo" :listCount="menuCount" :listData="menuList" v-bind="contentTableConfig">
                <!-- 1.header中的插槽 -->
                <template #headerHandler>
                     <el-button type="primary" v-if="isCreate">新建菜单</el-button>
                     <el-button icon="Refresh"></el-button>
                </template>
                <!-- 2.列中的插槽 -->
                <template #enable="scope">
                    <el-button plain size="mini" :type="scope.row.enable==1?'success':'danger'">
                        {{scope.row.enable==1?'启用':'禁用'}}
                    </el-button>
                </template>
                <template #createAt="scope">
                    <strong>{{ $filters.formatTime(scope.row.createAt)}}</strong>
                </template>
                <template #updateAt="scope">
                    <strong>{{ $filters.formatTime(scope.row.updateAt)}}</strong>
                </template>
                <template #handler>
                    <div class="handle_btns">
                        <el-button icon="Edit" size="mini" type="primary" v-if="isUpdate" link>编辑</el-button>
                        <el-button icon="Delete" size="mini" type="danger" v-if="isDelete" link>删除</el-button>
                    </div>
                </template>
            </GtTable>
        </div>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent ,ref, watch} from 'vue';
import { useStore } from 'vuex';
import {usePermission} from '@/hooks/use-permission';
import GtTable from '@/base-ui/table';
export default defineComponent({
    name:"menu",
    components:{
        GtTable
    },
    setup() {
        const store = useStore();
        
        //获取操作权限
        const isCreate = usePermission('menu','create');
        const isUpdate = usePermission('menu','update');
        const isDelete = usePermission('menu','delete');
        const isQuery = usePermission('menu','query');
        
        // -------------------------------菜单列表-------------------------------
        // 双向绑定pageInfo
        const pageInfo = ref({currentPage:0, pageSize:10});
        watch(pageInfo,()=>getPageData());

        const getPageData = (queryInfo: any = {}) => {
            console.log(queryInfo);
            
            store.dispatch('system/getPageListAction',{
                pageUrl:'/menus/list',
                queryInfo:{
                    offset:pageInfo.value.currentPage*pageInfo.value.pageSize, 
                    size:pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }
        getPageData()
       

        const menuList = computed(() => store.state.system.menuList);
        const menuCount = computed(() => store.state.system.menuCount);

        const contentTableConfig = {
            title:'菜单列表',
            showIndexColumn:false,
            showSelectColumn:false,
            showFooter:false,
            childrenProps:{
                rowKey:'id',
                treeProp:{
                    children:'children'
                }
            },
            propList:[
                {prop:'name',label:'菜单名称',minWidth:'150'},
                {prop:'type',label:'类型',minWidth:'80'},
                {prop:'url',label:'菜单地址',minWidth:'150'},
                {prop:'icon',label:'菜单图标',minWidth:'100'},
                {prop:'permission',label:'按钮权限',minWidth:'100'},
                {prop:'createAt',label:'创建时间',minWidth:'250',slotName:'createAt'},
                {prop:'updateAt',label:'更新时间',minWidth:'250',slotName:'updateAt'},
                {label:'操作',minWidth:'150',slotName:'handler'},
            ]
        }

        //菜单选择列表数据
        const selectionChange = (value:any)=>{
            console.log(value);
        }

        return {
            menuList,
            menuCount,
            contentTableConfig,
            selectionChange,
            getPageData,
            pageInfo,
            isCreate,
            isUpdate,
            isDelete
        }
    },
})
</script>

<style scoped lang='less'>
    .search_title{
        text-align: center;
    }
    .search_btn{
        padding: 0 20px 20px 20px;
        display: flex;
        justify-content: flex-end;
        .el_btn{
            width: 150px;
        }
    }

</style>