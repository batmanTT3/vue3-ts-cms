import { useStore } from "vuex";

export function usePermission(pageName: string,hanldeName: string){
    const store = useStore();
    const permissions = store.state.login.permissions;
    const verifyPermission = `system:${pageName}:${hanldeName}`;
    console.log(permissions,verifyPermission);
    
    return !!permissions.find((item:any) => item === verifyPermission)
}
