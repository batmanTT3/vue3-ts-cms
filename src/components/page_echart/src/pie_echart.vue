<template>
  <div class="pie_echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>
<script setup lang='ts'>
import { defineProps, computed } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = defineProps<{
  pieData: IDataType[];
}>();

const options = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped>
</style>