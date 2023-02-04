<template>
    <div class="goods">
        <div class="search">
            <GtForm v-bind="formConfig" v-model="formData">
                <template #header>
                    <h1 class="search_title">高级检索</h1>
                </template>
                <template #footer>
                    <div class="search_btn">
                        <el-button class="el_btn" size="large" icon="Refresh" @click="handleReset">重置</el-button>
                        <el-button class="el_btn" size="large" type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    </div>
                </template>
            </GtForm>
        </div>

        <div class="content">
            <GtTable @selectionChange="selectionChange" v-model:page="pageInfo" :listCount="goodCount" :listData="goodList" v-bind="contentTableConfig">
                <!-- 1.header中的插槽 -->
                <template #headerHandler>
                     <el-button type="primary">新建商品</el-button>
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
                <template #image="scope">
                    <el-image style="width: 66px; height: 66px" :z-index="99999" :preview-src-list="[scope.row.imgUrl]" :src="scope.row.imgUrl" fit="cover" />
                </template>
                <template #handler>
                    <div class="handle_btns">
                        <el-button icon="Edit" size="mini" type="primary" link>编辑</el-button>
                        <el-button icon="Delete" size="mini" type="danger" link>删除</el-button>
                    </div>
                </template>
            </GtTable>
        </div>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent ,ref, watch} from 'vue';
import { useStore } from 'vuex';
import GtForm,{IFormItem,IForm} from '@/base-ui/form';
import GtTable from '@/base-ui/table';
export default defineComponent({
    name:"name",
    components:{
        GtForm,
        GtTable
    },
    setup() {
        const store = useStore();
        const formConfig:IForm = {
            labelWidth: '120px',
            itemLayout: {
                padding:'10px 20px'
            },
            formItems:[
                {
                    field:'id',
                    type:'input',
                    label:'id',
                    rules:[],
                    placeholder:'请输入商品id'
                },
                {
                    field:'name',
                    type:'input',
                    label:'商品名',
                    rules:[],
                    placeholder:'请输入商品名'
                },
                {
                    field:'enable',
                    type:'select',
                    label:'商品状态',
                    rules:[],
                    placeholder:'请选择商品状态',
                    options:[
                        {title:'启用',value: 1 },
                        {title:'禁用',value: 0 }
                    ]
                },
                {
                    field:'createAt',
                    type:'datepicker',
                    label:'创建时间',
                    rules:[],
                    otherOptions:{
                        startPlaceholder:'开始时间',
                        endPlaceholder:'结束时间',
                        type:'daterange'
                    }
                },
            ]
        }

        const formOriginData: any = {};
        for (const item of formConfig.formItems){
            formOriginData[item.field] = ''
        };
        const formData = ref(formOriginData);
        console.log(formData);
        //商品点击重置
        const handleReset = () => {
             formData.value= formOriginData;
             getPageData()
        }
        //商品点击搜索
        const handleQuery = () => {
            getPageData(formData.value)
        }

        // -------------------------------商品列表-------------------------------
        // 双向绑定pageInfo
        const pageInfo = ref({currentPage:0, pageSize:10});
        watch(pageInfo,()=>getPageData());

        const getPageData = (queryInfo: any = {}) => {
            console.log(queryInfo);
            
            store.dispatch('system/getPageListAction',{
                pageUrl:'/goods/list',
                queryInfo:{
                    offset:pageInfo.value.currentPage*pageInfo.value.pageSize, 
                    size:pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }
        getPageData()
       

        const goodList = computed(() => store.state.system.goodList);
        const goodCount = computed(() => store.state.system.goodCount);

        const contentTableConfig = {
            title:'商品列表',
            showIndexColumn:true,
            showSelectColumn:true,
            propList:[
                {prop:'name',label:'商品名称',minWidth:'100',slotName:'name'},
                {prop:'oldPrice',label:'原价格',minWidth:'80',slotName:'oldPrice'},
                {prop:'newPrice',label:'现价格',minWidth:'80',slotName:'newPrice'},
                {prop:'imgUrl',label:'商品图片',minWidth:'100',slotName:'image'},
                {prop:'enable',label:'状态',minWidth:'100',slotName:'enable'},
                {prop:'createAt',label:'创建时间',minWidth:'250',slotName:'createAt'},
                {prop:'updateAt',label:'更新时间',minWidth:'250',slotName:'updateAt'},
                {label:'操作',minWidth:'150',slotName:'handler'},
            ]
        }

        //商品选择列表数据
        const selectionChange = (value:any)=>{
            console.log(value);
        }

       
        return {
            formConfig,
            formData,
            goodList,
            goodCount,
            contentTableConfig,
            selectionChange,
            handleReset,
            handleQuery,
            getPageData,
            pageInfo
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