import { message } from "antd";
import axios from "axios";

const instance = axios.create({
    timeout: 10 * 1000
})

// response 拦截
instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData

    if(errno !== 0){
        // 错误提示
        if(msg){
            message.error(msg)
        }

        throw new Error(msg)
    }

    return data
})

export default instance

export type ResType = {
    errno: number,
    data?: any,
    msg?: string
}
