<template>
    <el-form label-width="80px" :rules="rules" :model="phone" size="large">
        <el-form-item label="手机号" prop="num">
            <el-input v-model="phone.num" maxlength="11"/>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <div class="get_code">
                <el-input v-model="phone.code" />
                <el-button type="primary" class="get_btn" @click="getCode" :disabled="isDisposed"> {{ isDisposed ? `${time}s后重新获取` : "获取验证码" }}</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent ,reactive, ref} from "vue";
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
export default defineComponent({
   setup(){
    const store = useStore();
    const phone = reactive({
        num:'',
        code:''
    });
    const time = ref(60);
    const isDisposed = ref(false);


    const handleTimeChange = () => {
      if (time.value <= 0) {
        isDisposed.value = false;
        time.value = 60;
      } else {
        setTimeout(() => {
          time.value--;
          handleTimeChange();
        }, 1000);
      }
    };

    const getCode = () => {
        if(phone.num==''){
            return ElMessage('请输入手机号 ！')
        }
        
        isDisposed.value = true;
        handleTimeChange();  
        store.dispatch('login/phoneLoginAction',{...phone})
    }

    //编写规则
    const rules = {
        num:[
            {
                required:true,
                message:'请输入手机号 ！',
                trigger:'blur',
            },
            {
                pattern:/^[0-9]{11}$/,
                message:'手机号格式错误 ！',
                trigger:'blur',
            }   
        ],
        code:[
            {
                required:true,
                message:'请输入验证码 ！',
                trigger:'blur',
            },
            {
                pattern:/^[0-9]{4,6}$/,
                message:'验证码格式错误！',
                trigger:'blur',
            }
        ]
    }
    return{
        phone,
        rules,
        isDisposed,
        time,
        getCode
    }
   }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.get_code{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .get_btn{
        margin-left: 10px;
    }
}
</style>
