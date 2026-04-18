import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/
export const fetchDummyTodos = createAsyncThunk(
    'todo/fetch',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        return data;
    }
);

interface todoInterface {
    id : number,
    text : string,
    scratched: boolean
}

interface editTodoPayload {
    id: number,
    text: string
}

interface initialStateInterface { 
    loading : boolean,
    todos : todoInterface[]
}


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading : false,
        todos : [{
        id: 0,
        text : 'Feed cat',
        scratched: false
    }]
    } as initialStateInterface,
    reducers: {
        addTodo : (state, action: PayloadAction<{id:number,text:string}>) => {
            state.todos.push({ ...action.payload, scratched: false });
        },
        addTodoAt : (state, action: PayloadAction<{id:number,text:string,index:number}>) => {
            state.todos.splice(action.payload.index, 0, { id: action.payload.id, text: action.payload.text, scratched: false });
        },
        deleteTodo : (state, action:PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo : (state, action:PayloadAction<editTodoPayload>) => {
            const index = state.todos.findIndex((todos:any) => todos.id == action.payload.id);
            if (index !== -1) {
                state.todos[index].text = action.payload.text
            }
        },
        toggleScratch : (state, action:PayloadAction<number>) => {
            const index = state.todos.findIndex((todos:any) => todos.id == action.payload);
            if (index !== -1) {
                state.todos[index].scratched = !state.todos[index].scratched;
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchDummyTodos.pending, (state) => {
            state.loading = true
        })
    }
})

export const { addTodo, addTodoAt, deleteTodo, editTodo, toggleScratch } = todoSlice.actions;

export default todoSlice.reducer;