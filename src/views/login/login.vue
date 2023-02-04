<template>
    <div class="login">
        <div class="login_panel">
            <h1>后台管理系统</h1>
            <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
                <el-tab-pane name="account">
                    <template #label>
                        <span class="custom-tabs-label">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>账号登录</span>
                        </span>
                    </template>
                    <loginAccount ref="accountRef" />
                </el-tab-pane>
                <el-tab-pane name="phone">
                    <template #label>
                        <span class="custom-tabs-label">
                            <el-icon>
                                <Iphone />
                            </el-icon>
                            <span>手机登录</span>
                        </span>
                    </template>
                    <loginPhone ref="phoneRef"/>
                </el-tab-pane>
            </el-tabs>

            <div class="account_control">
                <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
                <el-link type="primary">忘记密码</el-link>
            </div>

            <el-button type="primary" size="large" class="login_btn" @click="handleLogin">立即登录</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { DefineComponent, ref } from 'vue';
import loginAccount from './cpns/login_account.vue';
import loginPhone from './cpns/login_phone.vue';
export default {
    components: {
        loginAccount,
        loginPhone
    },
    setup() {
        //定义属性
        const isKeepPassword = ref(true);
        const accountRef = ref<InstanceType<typeof loginAccount>>();
        const phoneRef = ref<InstanceType<typeof loginPhone>>();
        const currentTab = ref<string>('account');
        // 定义方法
        const handleLogin = () => {
            if(currentTab.value=='account'){
                accountRef.value?.loginAction(isKeepPassword.value);
            }else{
                phoneRef.value?.getCode();
            }
        }


        return {
            isKeepPassword,
            accountRef,
            phoneRef,
            currentTab,
            handleLogin
        }
    },
}

</script>

<style scoped lang="less">
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/bgc_01.png");
    background-size: cover;
}

.login_panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;

    .el-tabs {
        width: 330px;
        border-radius: @gt-radius;
        overflow: hidden;

        .custom-tabs-label {
            display: flex;
            align-items: center;
            justify-content: center;

            & span {
                padding-left: 3px;
            }
        }
    }

    .account_control {
        width: 280px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }

    .login_btn {
        width: 100%;
    }

}
</style>
