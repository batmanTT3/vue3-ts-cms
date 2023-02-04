<template>
  <div class="line_echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>
<script setup lang='ts'>
import { defineProps, computed, withDefaults } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = withDefaults(
  defineProps<{
    title: string;
    xLabels: string[];
    values: any[];
  }>(),
  {
    title: "",
  }
);

const options = computed(() => {
  return {
    title: {
      text: props.title,
    },
    legend: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "分类销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: props.values,
      },
    ],
  };
});
</script>

<style scoped>
</style>