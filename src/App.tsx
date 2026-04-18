import { useState, useRef } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, addTodoAt, deleteTodo as deleteTodoAction , editTodo, toggleScratch } from './features/todo/todoSlice';

function App() {
  
  const [currentTdod, setCurrentTdod] = useState<string>('')
  const [updatingTdod, setUpdatingTdod] = useState<boolean>(false);
  const [editingTodoID, setEditingTodoID] = useState<number>(0);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { todos } = useSelector((state: any) => state.todo);
  
  const createTodo = (e:any) => {
    e.preventDefault();
    const todoText = currentTdod.trim();
    if (!todoText) return;

    if (!updatingTdod) {
      const newTodo = { id: Math.floor(Math.random() * 10000), text: todoText };
      if (insertIndex !== null) {
        dispatch(addTodoAt({ ...newTodo, index: insertIndex + 1 }));
      } else {
        dispatch(addTodo(newTodo));
      }
    } else {
      dispatch(editTodo({ id: editingTodoID, text: todoText }));
    }

    setCurrentTdod('');
    setUpdatingTdod(false);
    setInsertIndex(null);
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

  const toggleScratchNEW = (id:number) => {
    dispatch(toggleScratch(id));
  }

  const actionButtons = (e:{id:number,text:string,scratched:boolean}) => {
    return (
      <div style={{display:'inline-flex', alignItems:'center', gap:'8px'}}>
        <button disabled={e.scratched} onClick={() => editTodoNEW(e.id)}>EDIT</button>
        <button onClick={() => toggleScratchNEW(e.id)}>{e.scratched ? 'UNSTRIKE' : 'SCRATCH'}</button>
        <button style={{marginLeft:'0'}} onClick={() => deleteTodoNEW(e.id)}>DELETE</button>
      </div>
    )
  }

  const insertTodoBetween = (index:number) => {
    setInsertIndex(index);
    setUpdatingTdod(false);
    setEditingTodoID(0);
    setCurrentTdod('');
    inputRef.current?.focus();
  }

  return (
    <>
      <section id="center">
        <h1>Todo Application</h1>
        <form action="" onSubmit={createTodo}>
        <input
          ref={inputRef}
          type="text"
          name="todoInput"
          id=""
          onChange={addTodoHandler}
          value={currentTdod}
          placeholder={insertIndex !== null ? 'Type item to insert here' : 'Type new todo here'}
        />
        <button type="submit">{updatingTdod ? 'Update' : 'Create'}</button>
        </form>
        {insertIndex !== null && currentTdod === '' && (
          <p style={{ marginTop: '8px', color: '#444' }}>
            Adding item between #{insertIndex + 1} and #{insertIndex + 2}. Click Create to insert.
          </p>
        )}
        <div>
          <ol style={{ listStyleType: 'decimal', paddingLeft: '24px' }}>
            {todos.map((e:any, index:number) => (
              <li key={e.id} style={{ listStylePosition: 'outside', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ textDecoration: e.scratched ? 'line-through' : 'none' }}>{e.text}</span>
                  {actionButtons(e)}
                </div>
                {index < todos.length - 1 && (
                  <div className="insert-handle" onClick={() => insertTodoBetween(index)}>
                    <div className="insert-line-inner" />
                    <div className="insert-button">+</div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

export default App

