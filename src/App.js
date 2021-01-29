import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import Header from './Header'
import { v4 as uuidv4 } from 'uuid';
import "./styles.css"
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';


const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {

const [todos, setTodos] = useState([]);
const todoNameRef = useRef();

function handleAddTodo(e){
const name = todoNameRef.current.value
if(name === "") return
setTodos(prevTodo => {
  return [...prevTodo, {id:uuidv4(), name:name, complete:false}]
})
todoNameRef.current.value = null
}

useEffect(() => {
  const storedItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) 
  if(storedItem) setTodos(storedItem)
}, [])

useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

}, [todos])

function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

function handleDelete(){
  const newTodos =  todos.filter(todo => !todo.complete)
  return setTodos(newTodos)
}
  return (
    <div>
    <Header />
   <TodoList todos={todos} toggleTodo={toggleTodo}/>
   <div className='input'>
   <input className='note' ref={todoNameRef} type="text" placeholder=" today..."/>
  
   <button className='add' onClick={handleAddTodo}><AddBoxIcon /></button>
   
   <button className='delete' onClick={handleDelete}><DeleteIcon /></button>
   </div>
   <div className='number'>{todos.filter(todo => !todo.complete).length}left to do</div>
   
   </div>
  )  
}

export default App;
