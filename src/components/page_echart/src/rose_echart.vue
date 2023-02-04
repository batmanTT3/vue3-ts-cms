<template>
  <div class="rose_echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>
<script setup lang='ts'>
import { defineProps, computed } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = defineProps<{
  roseData: IDataType[];
}>();

const options = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: [20, 140],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        data: props.roseData,
      },
    ],
  };
});
</script>

<style scoped>
</style>