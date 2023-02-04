<template>
    <div class="not_found">
        <el-empty description="页面不存在">
            <el-button type="primary" @click="backMain">返回首页</el-button>
        </el-empty>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter();
        const backMain = () =>{
            router.push('/main')
        }
        return {
            backMain
        }
    },
})
</script>

<style scoped lang='less'>
    .not_found{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding-bottom: 10vh;
    }
</style>