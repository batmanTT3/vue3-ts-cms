<template>
    <div class="table">
        <div class="header">
            <slot name="header">
                <div class="title">{{title}}</div>
                <div class="handler">
                    <slot name="headerHandler"></slot>
                </div>
            </slot>
        </div>
        <el-table v-bind="childrenProps" @selection-change="handleSelectionChange" :data="listData" border style="width: 100%;">
            <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
            <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
            <template v-for="item in propList" :key="item.prop">
                <el-table-column v-bind="item" align="center" show-overflow-tooltip>
                    <template #default="scope">
                        <slot :name="item.slotName" :row="scope.row">
                            {{ scope.row[item.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="footer" v-if="showFooter">
             <slot name="footer">
                <el-pagination
                    v-model:current-page="page.currentPage"
                    v-model:page-size="page.pageSize"
                    :page-sizes="[10, 20, 30]" 
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listCount"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    />
             </slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        title:{
            type:String,
            default:''
        },
        showSelectColumn:{
            type: Boolean,
            default: false
        },
        showIndexColumn:{
            type: Boolean,
            default: false
        },
        listData: {
            type: Array,
            required: true
        },
        propList: {
            type: Array,
            required: true
        },
        listCount:{
            type: Number,
            default: 0
        },
        page:{
            type: Object,
            default: () => ({currentPage: 0,pageSize: 10})
        },
        childrenProps:{
            type: Object,
            default:()=>({})
        },
        showFooter:{
            type: Boolean,
            default: true
        }
    },
    emits:['selectionChange','update:page'],
    setup(props,{emit}) {
        //勾选一项数据
        const handleSelectionChange = (value:any) => {
            emit('selectionChange',value)
        }

        // 当页码发生改变
        const handleCurrentChange = (curPage:number) => {
            emit('update:page',{...props.page,curPage})
        }
        // 当页数发生改变
        const handleSizeChange = (pageSize:number) => {
            emit('update:page',{...props.page,pageSize})
        }
        return {
            handleSelectionChange,
            handleCurrentChange,
            handleSizeChange
        }
    },
})
</script>

<style scoped lang='less'>
    .table{
        border-top: 20px solid #f5f5f5;
        box-sizing: border-box;
        padding: 20px;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom:20px;
        .title{
            font-size: @gt-fs-lg;
            color: @gt-fc-title;
            font-weight: bold;
        }
    }
    .footer{
        display: flex;
        justify-content: flex-end;
        padding-top:20px;
    }
</style>