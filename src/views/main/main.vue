<template>
  <div class="main">
      <el-container class="main_content">
        <el-aside :width="isCollapse?'60px':'210px'">
          <navMenu :collapse="isCollapse"/>
        </el-aside>
        <el-container class="page">
          <el-header class="page_header"><navHeader @foldChange="foldChange"/></el-header>
          <el-main class="page_content">
            <div class="page_view">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>

        <el-backtop :right="100" :bottom="100" />
      </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent ,ref} from "vue";
import navMenu from "@/components/nav_menu";
import navHeader from "@/components/nav_header";

export default defineComponent({
  components:{
    navMenu,
    navHeader
  },
  setup(){
    const isCollapse = ref(false);
    const foldChange = (isFold:boolean) =>{
      console.log(isFold);
      isCollapse.value = isFold;
    }
    return{
      foldChange,
      isCollapse
    }

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .main{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .main_content,
  .page{
    height: 100%;
  }
  .page_content{
    height: calc(100% - 48px);
    background: @gt-bgc;
    .page_view{
      background: #fff;
      border-radius:5px;
    }
  }
  .page_header{
    height: 48px;
    display: flex;
    color: @gt-fc-title;
    text-align: center;
    align-items: center;
  }
</style>
