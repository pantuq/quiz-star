import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo.ts";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user.ts";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/useReducer.ts";

function useLoadUserData(){
    const dispatch = useDispatch()
    const [waitingUserData, seWaitingUserData] = useState(true)
    
    // ajax 加载完用户信息之后，放在redux中，不用返回
    const { run } = useRequest(getUserInfoService,{
        manual: true,
        onSuccess(result){
            // 将获取到的数据存储到 redux 中
            const { username, nickname } = result
            dispatch(loginReducer({ username, nickname}))   // 将用户信息存储到redux
        },
        onFinally(){
            seWaitingUserData(false)
        }
    })

    const { username } = useGetUserInfo()   // 从redux中获取用户信息
    useEffect(() => {
        // 判断当前 redux 中是否有用户信息
        if(username){
            seWaitingUserData(false)    //如果redux中有用户信息，则不需要再加载了
            return
        }
        run()   //如果redux中没有用户信息，则加载用户信息
    },[username])

    return { waitingUserData }
}

export default useLoadUserData