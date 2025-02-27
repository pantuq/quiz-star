import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

export default function useGetCompoentsInfo(){
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType

    const { componentList = [], selectedId } = components
    const selelctedComponent = componentList.find(c => c.fe_id === selectedId)

    return {
        componentList,
        selectedId,
        selelctedComponent
    }
}