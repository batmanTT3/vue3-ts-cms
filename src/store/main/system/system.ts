import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from './types';

const systemModule:Module<ISystemState,IRootState> = {
    namespaced:true,
    state(){
        return{
            userList:[],
            userCount:0,
            roleList:[],
            roleCount:0,
            goodList:[],
            goodCount:0,
            menuList:[],
            menuCount:0
        }
    },
    mutations:{
        changeUserList(state,userList:any[]){
            state.userList = userList
        },
        changeUserCount(state,userCount:number){
            state.userCount = userCount
        },
        changeRoleList(state,roleList:any[]){
            state.roleList = roleList
        },
        changeRoleCount(state,roleCount:number){
            state.roleCount = roleCount
        },
        changeGoodList(state,goodList:any[]){
            state.goodList = goodList
        },
        changeGoodCount(state,goodCount:number){
            state.goodCount = goodCount
        },
        changeMenuList(state,menuList:any[]){
            state.menuList = menuList
        },
        changeMenuCount(state,menuCount:number){
            state.menuCount = menuCount
        },
    },
    actions:{
        async getPageListAction({commit},payload:any){
            const pageUrl = payload.pageUrl;
            console.log(payload);
            
            if(pageUrl.includes('users')){
                //1.对页面发送网络请求
                const name = payload.queryInfo.name;
                let pageResult = {
                    totalCount:9,
                    list:[
                        {id:1,name:'AriesBoy',realname:'gt',cellPhone:1577959695,enable:1,departmentId:1,roleId:1,createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:2,name:'小小强',realname:'gt',cellPhone:1577959695,enable:1,departmentId:1,roleId:2,createAt:'2022-03-05',updateAt:'2022-09-03'},
                        {id:3,name:'老王',realname:'gt',cellPhone:1577959695,enable:2,departmentId:1,roleId:2,createAt:'Mon Jan 30 2023 11:30:07 GMT+0800 (中国标准时间)',updateAt:'2022-09-03'},
                        {id:4,name:'北风',realname:'gt',cellPhone:1577959695,enable:2,departmentId:1,roleId:3,createAt:'Mon Jan 30 2023 11:30:07 GMT+0800 (中国标准时间)',updateAt:'2022-09-03'},
                        {id:5,name:'AriesBoy2',realname:'gt',cellPhone:1577959695,enable:2,departmentId:1,roleId:3,createAt:'2022-03-05',updateAt:'2022-09-03'},
                        {id:6,name:'AriesBoy3',realname:'gt',cellPhone:1577959695,enable:1,departmentId:1,roleId:3,createAt:'Mon Jan 30 2023 11:30:07 GMT+0800 (中国标准时间)',updateAt:'2022-09-03'},
                        {id:7,name:'卡卡',realname:'gt',cellPhone:1577959695,enable:2,departmentId:1,roleId:4,createAt:'Mon Jan 30 2023 11:30:07 GMT+0800 (中国标准时间)',updateAt:'2022-09-03'},
                    ]
                }
                if(name){
                    let newList = [];
                    for(let item of pageResult.list){
                        if(item.name.includes(name)){
                            newList.push(item)
                        }
                    }
                    pageResult.list = newList;
                }
                commit('changeUserList',pageResult.list);
                commit('changeUserCount',pageResult.totalCount);
            }else if(pageUrl.includes('role')){
                const pageResult = {
                    totalCount:3,
                    list:[
                        {id:1,name:'超级管理员',powerDesc:'全部权限',cellPhone:1577959695,enable:1,departmentId:1,roleId:1,createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:2,name:'开发人员',powerDesc:'全部权限',cellPhone:1577959695,enable:1,departmentId:1,roleId:2,createAt:'2022-03-05',updateAt:'2022-09-03'},
                        {id:3,name:'人事',powerDesc:'部分权限',cellPhone:1577959695,enable:2,departmentId:1,roleId:2,createAt:'Mon Jan 30 2023 11:30:07 GMT+0800 (中国标准时间)',updateAt:'2022-09-03'},
                      ]
                }
                commit('changeRoleList',pageResult.list);
                commit('changeRoleCount',pageResult.totalCount);
            }else if(pageUrl.includes('goods')){
                const pageResult = {
                    totalCount:3,
                    list:[
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'江西',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'冬款男装2022新款早秋女装',oldPrice:'24',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F2905024088%2FO1CN01kerk5x1g4LbSj0ogf_%21%212905024088.jpg_400x400.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677738897&t=e08f00bd9727efc3e9bd636a115596bc',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'254',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'江苏',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'冬款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F2905024088%2FO1CN01kerk5x1g4LbSj0ogf_%21%212905024088.jpg_400x400.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677738897&t=e08f00bd9727efc3e9bd636a115596bc',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款男装2021新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'澳门',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'245',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F2905024088%2FO1CN01kerk5x1g4LbSj0ogf_%21%212905024088.jpg_400x400.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677738897&t=e08f00bd9727efc3e9bd636a115596bc',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款男装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'杭州',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'2542',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'武汉',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'夏款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F2905024088%2FO1CN01kerk5x1g4LbSj0ogf_%21%212905024088.jpg_400x400.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1677738897&t=e08f00bd9727efc3e9bd636a115596bc',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款男装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'湖南',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'冬款女装2023新款早秋女装',oldPrice:'2452',newPrice:'245',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'香港',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'台湾',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'春款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'福建',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'吉林',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'广东',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                        {id:1,name:'秋款女装2023新款早秋女装',oldPrice:'129',newPrice:'89',desc:'秋款女装2023新款早秋女装',imgUrl:'https://picnew9.photophoto.cn/20150812/nvzhuangtaobaozhutu-05273230_1.jpg',enable:1,address:'上海',inventoryCount:'4044',saleCount:'32266',facorCount:'452',createAt:'2023-03-05',updateAt:'2022-09-03'},
                      ]
                }
                commit('changeGoodList',pageResult.list);
                commit('changeGoodCount',pageResult.totalCount);
            }else if(pageUrl.includes('menu')){
                const pageResult = {
                    totalCount:4,
                    list:[
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
                    ]
                }
                commit('changeMenuList',pageResult.list);
                commit('changeMenuCount',pageResult.totalCount);
            }
            
        },

    }
}

export default systemModule