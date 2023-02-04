<template>
    <el-form label-width="80px" :rules="rules" :model="account" ref="formRef" size="large">
        <el-form-item label="账号" prop="name">
            <el-input v-model="account.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" show-password/>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent ,reactive, ref} from "vue";
import { useStore } from 'vuex';
import { ElForm } from "element-plus";
import localCache from "@/utils/cache";
export default defineComponent({
   setup(){
    const store = useStore();
    const account = reactive({
        name:localCache.getCache('name') ?? '',
        password:localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword:boolean) =>{ 
        formRef.value?.validate((valid) => {
            console.log(valid);
            if(valid){
                if(isKeepPassword){
                    localCache.setCache('name',account.name);
                    localCache.setCache('password',account.password);
                }else{
                    localCache.deleteCache('name');
                    localCache.deleteCache('password')
                }

                store.dispatch('login/accountLoginAction',{...account})
            }
        })
       
    }

    //编写规则
    const rules = {
        name:[
            {
                required:true,
                message:'请输入账号 ！',
                trigger:'blur',
            },
            {
                pattern:/^[a-z0-9]{5,10}$/,
                message:'请输入5~10字母或数字 ！',
                trigger:'blur',
            }
        ],
        password:[
            {
                required:true,
                message:'请输入密码 ！',
                trigger:'blur',
            },
            {
                pattern:/^[a-z0-9]{3,}$/,
                message:'请输入3位以上的字母或数字 ！',
                trigger:'blur',
            }
        ]
    }
    return{
        account,
        rules,
        loginAction,
        formRef
    }
   }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
