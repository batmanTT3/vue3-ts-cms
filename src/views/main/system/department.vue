<template>
    <div class="user">
        <div class="search">
            <GtForm v-bind="formConfig" v-model="formData">
                <template #header>
                    <h1 class="search_title">高级检索</h1>
                </template>
                <template #footer>
                    <div class="search_btn">
                        <el-button class="el_btn" size="large" icon="Refresh">重置</el-button>
                        <el-button class="el_btn" size="large" type="primary" icon="Search">搜索</el-button>
                    </div>
                </template>
            </GtForm>
        </div>

        <div class="content">
            <GtTable @selectionChange="selectionChange" :listData="userList" v-bind="contentTableConfig">
                <!-- 1.header中的插槽 -->
                <template #headerHandler>
                     <el-button type="primary">新建用户</el-button>
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
                        <el-button icon="Edit" size="mini" type="primary" link>编辑</el-button>
                        <el-button icon="Delete" size="mini" type="danger" link>删除</el-button>
                    </div>
                </template>
            </GtTable>
        </div>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent ,ref} from 'vue';
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
                    field:'name',
                    type:'input',
                    label:'用户名',
                    rules:[],
                    placeholder:'请输入用户名'
                },
                {
                    field:'password',
                    type:'password',
                    label:'密码',
                    rules:[],
                    placeholder:'请输入密码'
                },
                {
                    field:'sport',
                    type:'select',
                    label:'喜欢的运动',
                    rules:[],
                    placeholder:'请选择喜欢的运动',
                    options:[
                        {title:'篮球',value:'basketball'},
                        {title:'足球',value:'football'}
                    ]
                },
                {
                    field:'createTime',
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

        const formData = ref({
            name:'',
            password:'',
            sport:'',
            createTime:''
        })
        console.log(formData);


        // 用户列表
        store.dispatch('system/getPageListAction',{
            pageUrl:'/users/list',
            queryInfo:{
                offset:0,
                size:10
            }
        })

        const userList = computed(() => store.state.system.userList);
        const userCount = computed(() => store.state.system.userCount);

        const contentTableConfig = {
            title:'用户列表',
            showIndexColumn:true,
            showSelectColumn:true,
            propList:[
                {prop:'name',label:'用户名',minWidth:'100',slotName:'name'},
                {prop:'realname',label:'真实姓名',minWidth:'100',slotName:'realname'},
                {prop:'cellPhone',label:'手机号码',minWidth:'100',slotName:'cellPhone'},
                {prop:'enable',label:'状态',minWidth:'100',slotName:'enable'},
                {prop:'createAt',label:'创建时间',minWidth:'250',slotName:'createAt'},
                {prop:'updateAt',label:'更新时间',minWidth:'250',slotName:'updateAt'},
                {label:'操作',minWidth:'120',slotName:'handler'},
            ]
        }
      
        const selectionChange = (value:any)=>{
            console.log(value);
        }
        return {
            formConfig,
            formData,
            userList,
            userCount,
            contentTableConfig,
            selectionChange
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