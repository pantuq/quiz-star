import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoginOrRegister, isNeedUserInfo, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router/index.tsx";

export default function useNavPage(waitingUserData: boolean){
    const { username } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if(waitingUserData) return  //还是正在获取用户数据，不要跳转

        // 已登录
        if(username){
            // 有用户数据了，判断是不是还在登录页或者注册页
            if(isLoginOrRegister(pathname)){
                // 如果是的话，跳转到问卷列表页
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }

        // 未登录
        if(isNeedUserInfo(pathname)){
            nav(LOGIN_PATHNAME)
        }
    },[waitingUserData,username,pathname])
}