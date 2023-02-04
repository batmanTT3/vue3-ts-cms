<template>
    <div class="gt_form">
        <div class="header">
            <slot name="header"></slot>
        </div>

        <el-form :label-width="labelWidth" size="large">
            <el-row>
                <template v-for="(item,index) in formItems" :key="index">
                    <el-col v-bind="colLayout">
                        <el-form-item v-if="!item.isHidden" :style="itemStyle" :label="item.label" :rules="item.rules">
                            <template v-if="item.type === 'input' || item.type === 'password'">
                                <el-input 
                                :model-value="modelValue[`${item.field}`]"
                                @update:modelValue="handleValueChange($event,item.field)"
                                :placeholder="item.placeholder" 
                                :show-password="item.type === 'password'"/>
                            </template>

                            <template v-else-if="item.type === 'select'">
                                <el-select 
                                :model-value="modelValue[`${item.field}`]"
                                @update:modelValue="handleValueChange($event,item.field)"
                                style="width: 100%;"
                                :placeholder="item.placeholder">
                                    <el-option v-for="option in item.options" :value="option.value" :key="option.value">{{option.title}}</el-option>
                                </el-select>
                            </template>

                            <template v-else-if="item.type === 'datepicker'">
                                <el-date-picker 
                                :model-value="modelValue[`${item.field}`]"
                                @update:modelValue="handleValueChange($event,item.field)"
                                style="width:100%" 
                                v-bind="item.otherOptions"></el-date-picker>
                            </template>

                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>

        <div class="footer">
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<script lang='ts'>
import { defineComponent , PropType, ref ,watch ,computed} from 'vue';
import { IFormItem } from '../types';
export default defineComponent({
    props:{
        modelValue:{
            type: Object,
            required: true
        },
        formItems:{
            type: Array as PropType<IFormItem[]>,
            default: () => []
        },
        labelWidth:{
            type: String,
            default:'80px'
        },
        itemStyle:{
            type:Object,
            default: ()=>({padding:'10px 20px'})
        },
        colLayout:{
            type:Object,
            default:()=>({
                xl: 8,
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24
            })
        }
    },
    emits:['update:modelValue'],
    setup(props,{emit}) {
        const handleValueChange = (value:any,field:string) => {
            emit('update:modelValue',{...props.modelValue,[field]:value})
        }

        return {
            handleValueChange
        }
    },
})
</script>

<style scoped lang='less'>
    .gt_form{
        padding-top: 20px;
    }
</style>