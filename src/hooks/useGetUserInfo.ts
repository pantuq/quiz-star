import { useSelector } from "react-redux";
import { StateType } from "../store/index.ts";
import { UserStateType } from "../store/useReducer.ts";

function useGetUserInfo(){
    const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
    return { username, nickname}
}

export default useGetUserInfo