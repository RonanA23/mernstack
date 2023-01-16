
import './App.css';
import Header from './Header';
//import Main from './Main';
import { useEffect, useState } from 'react';
const api_base = 'http://localhost:3001'

function App() {
  const[ todos,setTodos]=useState([])
  const[newTodo,setNewTodo]=useState('')
  const[check,setCheck] =useState(false)

  const pressHandler=()=>{
    console.log('PRESS',newTodo)
    addTodo()
    setNewTodo('')
  }

  useEffect(()=>{
    console.log('calling effect')
    GetTodos()
    
  },[])

  const GetTodos=()=>{
    fetch(api_base +'/todos')
    .then(res=> res.json())
    .then(data=> setTodos(data))
    .catch((err)=> console.error('Error HERE',err)) 

  }

  const completeTodo = async (id)=>{
    const data = await fetch(api_base + '/todo/complete/' + id).
    then(res => res.json())

    setTodos(todos=> todos.map(todo=>{
      if(todo._id === data._id){
        todo.complete = data.complete
      }
      return todo
    }))
  }

  const addTodo= async()=>{
    const data = await fetch(api_base + "/todo/new",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        text:newTodo })
    }).then(res=>res.json())
  
    setTodos([...todos,data])
  }

  const deleteTodo = async id=>{
    await fetch(api_base + '/todo/delete/' + id, {method:"DELETE"}).then(res=>res.json())
    
    //setTodos(todos => todos.filter(todo=> todo._id !== data.result._id))
  }


  return (
    <div className="App">
      <Header/>
      <input placeholder='Enter Tasks' value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
     <button onClick={pressHandler} className='bg-red-300 text-white font-bold rounded p-2'>Press</button> 
      {todos.map((item)=>(
        <div className='flex items-center w-[300px] bg-gray-300 p-2 m-2 mx-auto justify-between rounded-lg'>
          <input type='checkbox' />
          <p>{item.text}</p>
          <p className='text-green-600 cursor-pointer hover:text-red-600' onClick={()=>deleteTodo(item._id)}>X</p>
          </div>
      ))}
    </div>
  );
}

export default App;
