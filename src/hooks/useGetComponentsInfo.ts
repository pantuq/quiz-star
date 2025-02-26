import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

export default function useGetCompoentsInfo(){
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType

    const { componentList = [], selectedId } = components

    return {
        componentList,
        selectedId
    }
}