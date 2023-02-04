import { Module } from "vuex";

import { IDashboardState } from "./type";
import { IRootState } from "../../types";

const dashboardModule: Module<IDashboardState,IRootState> = {
    namespaced:true,
    state(){
        return {
            categoryGoodsCount:[],
            categoryGoodsSale:[],
            categoryGoodsFavor:[],
            addressGoodsSale:[]
        }
    },
    mutations:{
        changeCategoryGoodsCount(state,list){
            state.categoryGoodsCount = list
        },
        changeCategoryGoodsSale(state,list){
            state.categoryGoodsSale = list
        },
        changeCategoryGoodsFavor(state,list){
            state.categoryGoodsFavor = list
        },
        changeAddressGoodsSale(state,list){
            state.addressGoodsSale = list
        },
    },
    actions:{
        async getDashboardDataAction({commit}){
            const categoryCountRes = [
                {id:1,name:'上衣',goodsCount:14},
                {id:2,name:'裤子',goodsCount:20},
                {id:3,name:'鞋子',goodsCount:19},
                {id:4,name:'厨具',goodsCount:19},
                {id:5,name:'家具',goodsCount:18},
                {id:6,name:'床上用品',goodsCount:19},
                {id:7,name:'女装',goodsCount:35},
            ];
            const categoryGoodsSaleRes = [
                {id:1,name:'上衣',goodsCount:14},
                {id:2,name:'裤子',goodsCount:20},
                {id:3,name:'鞋子',goodsCount:19},
                {id:4,name:'厨具',goodsCount:19},
                {id:5,name:'家具',goodsCount:18},
                {id:6,name:'床上用品',goodsCount:19},
                {id:7,name:'女装',goodsCount:35},
            ];
            const categoryGoodsFavorRes = [
                {id:1,name:'上衣',goodsCount:14},
                {id:2,name:'裤子',goodsCount:20},
                {id:3,name:'鞋子',goodsCount:19},
                {id:4,name:'厨具',goodsCount:19},
                {id:5,name:'家具',goodsCount:18},
                {id:6,name:'床上用品',goodsCount:19},
                {id:7,name:'女装',goodsCount:35},
            ];
            const addressGoodsSaleRes = [
                {address:'中山',count:14},
                {address:'广州',count:1515},
                {address:'佛山',count:3534},
                {address:'深圳',count:34},
                {address:'无锡',count:5343},
                {address:'东莞',count:14},
                {address:'昆山',count:435},
                {address:'武汉',count:343},
            ];

            commit('changeCategoryGoodsCount',categoryCountRes);
            commit('changeCategoryGoodsSale',categoryGoodsSaleRes);
            commit('changeCategoryGoodsFavor',categoryGoodsFavorRes);
            commit('changeAddressGoodsSale',addressGoodsSaleRes);
        }
    }
}

export default dashboardModule