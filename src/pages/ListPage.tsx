import React, { useEffect, useState } from 'react'
import SingleTaskList from '../components/SingleTaskList'
import { BE_getTaskList } from '../Backend/Queries'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Redux/store'
import { ListLoader } from '../components/Loaders'
import { motion } from 'framer-motion';

type Props = {}

function ListPage({}: Props) {
  const [loading,setLoading]=useState(false);
   const dispatch=useDispatch<AppDispatch>();
   const taskList = useSelector (
    (state:RootState) =>state.taskList .currentTaskList)
  
    useEffect(() =>{
   BE_getTaskList(dispatch ,setLoading);
  },[dispatch]);

  return (
    <div className='p-10'>
      {loading ? (
       <ListLoader/>
      ) : taskList.length ===0 ? <h1 className='text-3xl text-center text-gray-500 mt:10'>No task list added,add some!</h1>:  (
        <div className="flex flex-wrap justify-center gap-10">
          {taskList.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <SingleTaskList singleTaskList={t} />
            </motion.div>
          ))}
        </div>
      )}
    
    </div>
  );
}

export default ListPage;