import { createStore, storeKey } from "vuex";

import login from './login/login';
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";

import { IRootState } from "./types";
const store = createStore<IRootState>({
  state: {
    name:'',
    age:18,
    entireDepartment:[],
    entireRole:[],
    entireMenu:[]
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state,list){
      state.entireDepartment = list
    },
    changeEntireRole(state,list){
      state.entireRole = list
    },
    changeEntireMenu(state,list){
      state.entireMenu = list
    },
  },
  actions: {
    async getInitDataAction({commit}){
      const departmentList = [
        {id:1,name:'研发部'},
        {id:2,name:'运营部'},
        {id:3,name:'客服部'},
      ];
      const roleList = [
        {id:1,name:'运营'},
        {id:2,name:'经理'},
        {id:3,name:'程序员'},
      ];

      const menuList = [
        {id:100,name:"系统总览",type:1,sort:1,url:"/main/analysis",icon:"DataBoard",children:[
            {children:null,id:101,parentId:100,name:"核心技术",type:2,sort:106,url:"/main/analysis/overview"},
            {children:null,id:102,parentId:100,name:"商品统计",type:2,sort:106,url:"/main/analysis/dashboard"},
        ]},
        {id:200,name:"系统管理",type:1,sort:1,url:"/main/analysis",icon:"Setting",children:[
            {children:[
                {id:201,name:"创建用户1",parentId:201,permission:"system:user:create",sort:null,type:3,url:null},
                {id:202,name:"创建用户2",parentId:201,permission:"system:user:create",sort:null,type:3,url:null},
                {id:203,name:"创建用户3",parentId:201,permission:"system:user:create",sort:null,type:3,url:null},
            ],id:201,parentId:200,name:"用户管理",type:2,sort:106,url:"/main/system/user"},
            {children:null,id:202,parentId:200,name:"部门管理",type:2,sort:106,url:"/main/system/department"}, 
            {children:null,id:203,parentId:200,name:"菜单管理",type:2,sort:106,url:"/main/system/menu"},
            {children:null,id:204,parentId:200,name:"角色管理",type:2,sort:106,url:"/main/system/role"},
        ]},
        {id:300,name:"商品中心",type:1,sort:1,url:"/main/analysis",icon:"Handbag",children:[
            {children:null,id:301,parentId:300,name:"商品类别",type:2,sort:106,url:"/main/product/category"},
            {children:null,id:302,parentId:300,name:"商品信息",type:2,sort:106,url:"/main/product/goods"},
        ]},
        {id:400,name:"随便聊聊",type:1,sort:1,url:"/main/analysis",icon:"ChatLineRound",children:[
            {children:null,id:401,parentId:400,name:"你的故事",type:2,sort:106,url:"/main/story/chat"},
            {children:null,id:402,parentId:400,name:"故事列表",type:2,sort:106,url:"/main/story/list"},
        ]}, 
      ];

      commit('changeEntireDepartment',departmentList);
      commit('changeEntireRole',roleList);
      commit('changeEntireMenu',menuList);

    }
  },
  modules: {
    login,
    system,
    dashboard
  },
});

export function setupStore(){
  store.dispatch('login/loadLocalLogin');
  store.dispatch('getInitDataAction')
}
export default store