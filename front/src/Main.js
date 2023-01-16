import React,{useState} from 'react'


function Main({addTodo,setNewTodoFunc}) {
  const [data,setData]=useState('')

  const submitHandler=()=>{
   
    setNewTodoFunc(data)
    addTodo(data)
    
    setData('')
  }
  return (
    <div className='h-full'>
        <div className='border-2 bg-gray-700 w-[300px] mx-auto p-4 mt-8 rounded-lg'>
            <input className='rounded' type='text' placeholder='Enter To Do Item' value={data} onChange={(e)=>setData(e.target.value)}/>
            <button className='bg-red-600 text-white font-bold rounded-2xl w-[50px]'
            onClick={submitHandler}>Enter</button>
        </div>
    </div>
  )
}

export default Main