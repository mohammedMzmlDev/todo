import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo as deleteTodoAction , editTodo} from './features/todo/todoSlice';

function App() {
  
  const [currentTdod, setCurrentTdod] = useState<string>('')
  const [updatingTdod, setUpdatingTdod] = useState<boolean>(false);
  const [editingTodoID, setEditingTodoID] = useState<number>(0);

  const dispatch = useDispatch();
  const { todos } = useSelector((state: any) => state.todo);
  
  const createTodo = (e:any) => {
    e.preventDefault();
    if(!updatingTdod){
      const todoText = e.target[0].value;
      dispatch(addTodo({id:Math.floor(Math.random() * 10000),text:todoText}))
    }else{
      dispatch(editTodo({id:editingTodoID,text:currentTdod}))
    }
    setCurrentTdod('')
    setUpdatingTdod(false)
  }
  const addTodoHandler = (e:any) => {
    setCurrentTdod(e.target.value);
  }

  const editTodoNEW = (id:number) => {
    const todoToEdit = todos.find((el:any) => el.id == id);
    if (todoToEdit) {
      setCurrentTdod(todoToEdit.text);
      setUpdatingTdod(true)
      setEditingTodoID(id);
    }
  }

  const deleteTodoNEW = (id:number) => {
    dispatch(deleteTodoAction(id));
  }

  const actionButtons = (e:{id:number,text:string}) => {
    return (
      <div style={{display:'inline-block'}}>
        <button onClick={() => editTodoNEW(e.id)}>E</button>
        <button onClick={() => deleteTodoNEW(e.id)}>D</button>
      </div>
    )
  }
  return (
    <>
      <section id="center">
        <form action="" onSubmit={createTodo}>
        <input type="text" name="todoInput" id="" onChange={addTodoHandler} value={currentTdod}/>
        <button type="submit">{updatingTdod ? 'Update' : 'Create'}</button>
        </form>
        <div>
          <ul>
            {todos.map((e:any) => <li key={e.id}>{e.text}{actionButtons(e)}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}

export default App

