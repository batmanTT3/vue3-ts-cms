<template>
    <div class="userInfo">
       
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span style="padding-left:5px">{{ name }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleOutLogin">退出登录</el-dropdown-item>
                    <el-dropdown-item>用户信息</el-dropdown-item>
                    <el-dropdown-item divided>系统管理</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang='ts'>
import { defineComponent ,computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache';
export default defineComponent({
    setup() { 
        const store = useStore();
        const router = useRouter()
        const name = computed(() => store.state.login.userInfo.name);

        const handleOutLogin = ()=>{
            localCache.deleteCache('token');
            router.push('/mian')
        }
        return {
            name,
            handleOutLogin
        }
    },
})
</script>

<style scoped lang='less'>
    .userInfo{
        display: flex;
        align-items: center;
        .el-dropdown-link{
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }
</style>