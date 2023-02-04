import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = [];
    //1.先去加载默认所有的routes
    const allRoutes: RouteRecordRaw[] = [];
    const routeFiles = require.context('../router/mian', true, /\.ts/);
    routeFiles.keys().forEach((key) => {
        const route = require('../router/mian' + key.split('.')[1]);
        allRoutes.push(route.default);
    })
    //2.根据菜单获取需要添加的routes
    const _recurseGetRoute = (menus:any[]) =>{
        for(const menu of menus){
            // console.log(11,menu);
            // console.log(22,allRoutes);
            
            if(menu.type === 2){
                const route = allRoutes.find((route) => route.path === menu.url);
                if(route){
                    routes.push(route);
                } 
                if(!firstMenu){
                    firstMenu = menu
                }
            }else{ 
                _recurseGetRoute(menu.children)
            }
        }
    }
    _recurseGetRoute(userMenus)
    return routes 
}
 
export function pathMapBreadcrumbs(userMenus:any[],curPath:string):any{
    const breadcrumbs:IBreadcrumb[] = [];
    pathMapToMenu(userMenus,curPath,breadcrumbs);
    return breadcrumbs;
}

export function pathMapToMenu(userMenus:any[],curPath:string,breadcrumbs?:IBreadcrumb[]):any{
    for(const menu of userMenus){
        if(menu.type === 1){
           const findMenu = pathMapToMenu(menu.children??[],curPath);
           if(findMenu){
             breadcrumbs?.push({ name: menu.name});
             breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
             return findMenu
           }
        }else if(menu.type === 2 && menu.url === curPath){
            return menu
        }
    }

}

export function mapMenusToPermissions(userMenus: any[]){
    const permission: string[] = [];

    const _recurseGetPermission = (menus: any[]) =>{
        for (const menu of menus){
            if(menu.type === 1 || menu.type === 2){
                _recurseGetPermission(menu.children ?? [])
            }else if(menu.type === 3){
                permission.push(menu.permission)
            }
        }
    }

    _recurseGetPermission(userMenus);
    return permission
}


export {firstMenu}