<template>
    <div class="nav_menu">
        <div class="logo">
            <img src="~@/assets/logo.png" alt="logo">
            <span v-if="!collapse" class="logo_title">Vue3+TS</span>
        </div>

        <el-menu :collapse="collapse" :collapse-transition="false" :default-active="defaultValue" :unique-opened="false"
            text-color="#b7bdc3" active-text-color="#0a60bd" background-color="#0c2135" class="el-menu-vertical-demo"
            @open="handleOpen" @close="handleClose">
            <template v-for="(item, index) in userMenus" :key="index">
                <!-- 二级菜单 -->
                <template v-if="item.type == 1">
                    <!-- 二级菜单子菜单 -->
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <el-icon :size="20">
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="(item1, index1) in item.children" :key="index1">
                            <el-menu-item :index="item1.id + ''" @click="handleMenuItemClick(item1)">
                                <el-icon :size="20">
                                    <component :is="item1.icon"></component>
                                </el-icon>
                                <span>{{ item1.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>

                <!-- 一级菜单 -->
                <template v-else-if="item.type == 2">
                    <el-menu-item :index="item.id + ''"  @click="handleMenuItemClick(item)">
                        <el-icon :size="20">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang='ts'>
import { defineComponent, computed ,ref} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { pathMapToMenu } from '@/utils/map_menus';

export default defineComponent({
    props: {
        collapse: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        //store
        const store = useStore();
        const userMenus = computed(() => store.state.login.userMenus);
        
        //router
        const router = useRouter();
        const route = useRoute();
        const curPath = route.path;

        //data
        const menu = pathMapToMenu(userMenus.value,curPath);
        const defaultValue = ref(menu.id + '');

        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }

        const handleMenuItemClick = (item:any) =>{
            console.log(111,item);
            router.push({
                path:item.url ?? "/not_found"
            });
        }

        
        return {
            handleOpen,
            handleClose,
            handleMenuItemClick,
            userMenus,
            defaultValue
        }
    },
})
</script>

<style scoped lang='less'>
.nav_menu {
    height: 100%;
    background: #0e2d4b;

    .logo {
        background: #0c2135;
        display: flex;
        height: 28px;
        padding: 12px;
        align-items: center;
        justify-content: flex-start;

        & img {
            height: 100%;
            margin: 0 10px;
        }

        .logo_title {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
        }
    }


    .el-menu-vertical-demo {
        border-right: none;
    }

    .el-menu-item:hover {
        background-color: #0b3868;
    }

}
</style>