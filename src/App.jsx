import {useState, useEffect} from 'react'
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");


  function persistData(newList){
    localStorage.setItem("todos", JSON.stringify({todos: newList}))
  }

  function addTodo(newTodo){
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  function editTodo(index){
    const valueToEdit = todos[index];
    setTodoValue(valueToEdit);
    deleteTodo(index);
    
  }

  function deleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=> {
      return todoIndex!= index
    })
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem("todos");
    if(!localTodos){
      return
    }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos)
  }, [])

  return (
    <>
      <TodoInput addTodo = {addTodo} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList deleteTodo ={deleteTodo} editTodo={editTodo} todos={todos}/>

    </>
  )
}

export default App
