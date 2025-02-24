import axios, { ResDataType} from './ajax.ts'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType>{
    const url = '/api/user/info'
    const data = await axios.get(url)
    return data
}

// 注册用户
export async function registerService( username, password, nickname): Promise<ResDataType>{
    const url = '/api/user/register'
    const body = {username, password, nickname: nickname || username }      //nickname可以为空
    const data = await axios.post(url,body)
    return data
}

// 登录
export async function loginService(username, password): Promise<ResDataType>{
    const url = '/api/user/login'
    const body = { username, password}
    const data = await axios.post(url, body)
    return data
}