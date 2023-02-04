import { Module } from 'vuex';
import { IRootState } from '../types';
import localCache from "@/utils/cache";
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map_menus';
import router from '@/router';
interface ILoginState{
    token:string
    userInfo:any,
    userMenus:any,
    permissions:any
}
const loginModule: Module<ILoginState,IRootState> = {
    namespaced:true,
    state() {
        return{
            token:'',
            userInfo:{},
            userMenus:[],
            permissions:[]
        }
    },
    getters:{},
    mutations:{
        changeToken(state,token:string){
            state.token = token
        },
        changeUserInfo(state,userInfo:any){
            state.userInfo = userInfo
        },
        changeUserMenus(state,userMenus:any){
            state.userMenus = userMenus;
            const routes = mapMenusToRoutes(userMenus);
            
            routes.forEach((route) =>{
                router.addRoute('main',route)
            })

            //获取用户按钮权限
            const permissions = mapMenusToPermissions(userMenus);
            state.permissions = permissions;
            console.log(111,permissions);
            
        }
    },
    actions:{
        async accountLoginAction({commit},payload:any){
            //1.登录
            // const loginResult = await accountLoginRequest(payload);
            //const {id,token} = loginResult.data;
            const id = 1; 
            const token = '5156d156151ahjssad26bdhasdjasbdjsa==';
            commit('changeToken',token);
            localCache.setCache('token',token);

            //2.请求用户信息
            //const userInfoResult = await requestUserInfoById(id);
            //const userInfo = userInfoResult.data;
            const userInfo = {
                name:'AriesBoy、',
                id,
                token,
                phone:15779597695,
                createTime:'2023-01-10 16:56:32'
            };
            commit('changeUserInfo',userInfo);
            localCache.setCache('userInfo',userInfo);

            //3.请求用户菜单
            //const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
            //const userInfo = userInfoResult.data;
            const userMenus= [
                {id:100,name:"系统总览",permission:"system:user:create",type:1,sort:1,url:"/main/analysis",icon:"DataBoard",children:[
                    {children:null,id:101,parentId:100,name:"核心技术",permission:"system:user:create",type:2,sort:106,url:"/main/analysis/overview"},
                    {children:null,id:102,parentId:100,name:"商品统计",permission:"system:user:create",type:2,sort:106,url:"/main/analysis/dashboard"},
                ]},
                {id:200,name:"系统管理",permission:"system:user:delete",type:1,sort:1,url:"/main/analysis",icon:"Setting",children:[
                    {children:[
                        {id:201,name:"创建用户1",parentId:201,permission:"system:menu:create",sort:null,type:3,url:null},
                        {id:202,name:"创建用户2",parentId:201,permission:"system:menu:update",sort:null,type:3,url:null},
                        {id:203,name:"创建用户3",parentId:201,permission:"system:menu:delete",sort:null,type:3,url:null},
                    ],id:201,parentId:200,name:"用户管理",type:2,sort:106,url:"/main/system/user"},
                    {children:null,id:202,parentId:200,name:"部门管理",permission:"system:menu:delete",type:2,sort:106,url:"/main/system/department"}, 
                    {children:null,id:203,parentId:200,name:"菜单管理",permission:"system:menu:update",type:2,sort:106,url:"/main/system/menu"},
                    {children:null,id:204,parentId:200,name:"角色管理",permission:"system:menu:delete",type:2,sort:106,url:"/main/system/role"},
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
            commit('changeUserMenus',userMenus);
            localCache.setCache('userMenus',userMenus);

            //4.跳到首页
            router.push('/main')
        },
        phoneLoginAction({commit},payload:any){
            console.log('执行phoneLoginAction',payload); 
        },
        //维护vuex中的数据
        loadLocalLogin({commit}){  
            const token = localCache.getCache('token');
            if(token){
                commit('changeToken',token);
            }
            const userInfo = localCache.getCache('userInfo');
            if(userInfo){
                commit('changeUserInfo',userInfo);
            }
            const userMenus = localCache.getCache('userMenus');
            if(userMenus){
                commit('changeUserMenus',userMenus);
            }
        }
    }

}

export default loginModule
