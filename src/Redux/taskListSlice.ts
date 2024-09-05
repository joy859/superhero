import { taskListType, taskType } from './../Types';
import { createSlice } from "@reduxjs/toolkit";


export const defaultTaskList :taskListType={
   title:'Sample Task List'

}
export const defaultTask :taskType={
    title: 'i will do this at 9:00am',
    description: "this is what i will need to do in order to finish this"
}

 
type taskListSliceType = {
    currentTaskList:taskListType[]
}

const initialState :taskListSliceType={
  currentTaskList :[],
}
const taskListSlice =createSlice({
name :'taskList',
initialState,
reducers:{
    setTaskList :(state ,action) =>{
        
    },
    addTaskList :(state,action) => {
     
    }
}

})
export const {setTaskList,addTaskList} =taskListSlice.actions
export default taskListSlice. reducer