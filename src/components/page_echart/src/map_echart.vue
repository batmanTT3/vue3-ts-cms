<template>
  <div class="map_echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>
<script setup lang='ts'>
import { defineProps, computed, withDefaults } from "vue";
import * as echarts from "echarts";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = withDefaults(
  defineProps<{
    title?: string;
    mapData: string[];
  }>(),
  {
    title: "",
  }
);

const geoCoordMap:any = {
    "广州": [113.23, 23.16],
    "佛山": [113.167,22.828],
    "中山": [113.38, 22.52],
    "深圳": [114.07, 22.62],
    "东莞": [113.736,23.047],
    "无锡": [120.288,31.574],
    "湖州": [120.096,30.864],
    "昆山": [120.976,31.32],
    "扬州": [119.427,32.386],
    "苏州": [120.612,31.309],
    "淮安": [119.136,33.499],
    "菏泽": [115.480656, 35.23375],
    "合肥": [117.27, 31.86],
    "武汉": [114.31, 30.52],
    "大庆": [125.03, 46.58]
};
const convertData = function (data:any){
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
const options = computed(() => {
  return {
        backgroundColor: '#fff',
        title: {
            text: '全国泵机销售情况',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 10,
            data: ['泵机数'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: 0,
            max: 200,
            left: 20,
            bottom: 20,
            calculable: true,
            text: ['高', '低'],
            inRange: {
                color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            show: true,
            map: 'china',
            roam:'scale',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: 'rgb(19, 91, 153)',
                    borderColor: 'rgb(9, 54, 95)'
                },
                emphasis: {
                    areaColor: 'rgb(10, 105, 187)'
                }
            }
        },
        series: [{
                name: '泵机数',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(props.mapData),
                symbolSize: 12,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, 
                tooltip: {
                    show:false
                },
            }
        ],
    }
});
</script>

<style scoped>
</style>