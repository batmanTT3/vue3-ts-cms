<template>
  <div class="dashboard">

    <div class="data_display">
      <el-row :gutter="20">
        <template v-for="item in curData" :key="item.name">
          <el-col :span="6">
            <el-card class="box_card" shadow="hover">
              <template #header>
                <div class="card_header">
                   <div class="title">
                      <p>{{item.title}}</p>
                      <el-icon><Warning /></el-icon>
                   </div>
                   <p class="num">
                    <span v-if="item.type==2">￥</span>
                    <span ref="countup">{{item.num}}</span>
                   </p>
                </div>
              </template>
              <div class="data_tips">{{`${item.title} ${item.num}`}}</div>
            </el-card>
          </el-col>
        </template>
      </el-row>
    </div>

    <div class="chart_display">
      <el-row :gutter="20">
          <el-col :span="7">
            <el-card class="chart_card" shadow="hover">
              <template #header>
                <div class="chart_card_header">分类商品数量(饼图)</div>
              </template>
              <div class="chart_content">
                   <PieEchart :pieData="categoryGoodsCount"></PieEchart>
              </div>
            </el-card>
          </el-col>

          <el-col :span="10">
            <el-card class="chart_card" shadow="hover">
              <template #header>
                <div class="chart_card_header">不同城市商品销量</div>
              </template>
              <div class="chart_content">
                <MapEchart :mapData="addressGoodsSale"></MapEchart>
              </div>
            </el-card>
          </el-col>

          <el-col :span="7">
            <el-card class="chart_card" shadow="hover">
              <template #header>
                <div class="chart_card_header">分类商品数量(玫瑰图)</div>
              </template>
              <div class="chart_content">
                 <RoseEchart :roseData="categoryGoodsCount"></RoseEchart>
              </div>
            </el-card>
          </el-col>
      </el-row>

      <el-row :gutter="20" class="content_row">
          <el-col :span="12">
            <el-card class="chart_card" shadow="hover">
              <template #header>
                <div class="chart_card_header">分类商品销量</div>
              </template>
              <div class="chart_content">
                 <LineEchart v-bind="categoryGoodsSale"></LineEchart>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="chart_card" shadow="hover">
              <template #header>
                <div class="chart_card_header">分类商品收藏</div>
              </template>
              <div class="chart_content">
                 <BarEchart v-bind="categoryGoodsFavor"></BarEchart>
              </div>
            </el-card>
          </el-col>
      </el-row>
    </div>


   
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted ,computed} from "vue";
import { CountUp } from 'countup.js';
import { useStore } from 'vuex';
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart} from '@/components/page_echart';
export default defineComponent({
  name: "dashboard",
  components:{
    CountUp,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore();
    store.dispatch('dashboard/getDashboardDataAction')
    const curData = [
      {title:'商品总销量',num:5125,type:1},
      {title:'商品总收藏',num:8233,type:1},
      {title:'商品总库存',num:523661,type:1},
      {title:'商品总销售额',num:362965523,type:2},
    ];
    const countup = ref<HTMLElement>();
    console.log(countup);
        
    const numAnim = new CountUp(countup.value!,226);
    numAnim.start();
    
    // ------------------------------------------图表数据------------------------------------------

    // 饼图和玫瑰图数据
    store.dispatch('dashboard/getDashboardDataAction');
    const categoryGoodsCount = computed(()=>{
      return store.state.dashboard.categoryGoodsCount.map((item:any)=>{
        return {name:item.name,value:item.goodsCount}
      })
    })

    //折线图数据
    const categoryGoodsSale = computed(()=>{
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for(const item of categoryGoodsSale){
        xLabels.push(item.name);
        values.push(item.goodsCount)
      }
      return {xLabels,values}
    })

    //柱状图数据
    const categoryGoodsFavor = computed(()=>{
      const xLabels: string[] = [];
      const values: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for(const item of categoryGoodsFavor){
        xLabels.push(item.name);
        values.push(item.goodsCount)
      }
      return {xLabels,values}
    })

    //柱状图数据
    const addressGoodsSale = computed(()=>{
      return store.state.dashboard.addressGoodsSale.map((item:any)=>{
        return {name:item.address,value:item.count}
      });
    })

    return {
      curData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  },
});
</script>

<style scoped lang='less'>
  .data_display{
      background: @gt-bgc;
      border-bottom: 20px solid @gt-bgc;
      .title{
        font-size: @gt-fs-sm;
        color: @gt-fc-desc;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .num{
        font-size: @gt-fs-max;
        color: @gt-fc-title;
        font-weight: bold;
        margin-top: 10px;
      }
      .data_tips{
        font-size: @gt-fs-sm;
        color: @gt-fc-title;
      }
  }

  .chart_display{
      background: @gt-bgc;
      .content_row{
        margin-top: 20px;
      }
  }

</style>