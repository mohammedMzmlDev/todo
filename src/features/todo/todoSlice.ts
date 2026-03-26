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
    text : string
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
        text : 'Feed cat'
    }]
    } as initialStateInterface,
    reducers: {
        addTodo : (state, action: PayloadAction<{id:number,text:string}>) => {
            state.todos.push(action.payload);
        },
        deleteTodo : (state, action:PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo : (state, action:PayloadAction<todoInterface>) => {
            const index = state.todos.findIndex((todos:any) => todos.id == action.payload.id);
            state.todos[index].text = action.payload.text
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchDummyTodos.pending, (state) => {
            state.loading = true
        })
    }
})

export const { addTodo, deleteTodo, editTodo, } = todoSlice.actions;

export default todoSlice.reducer;