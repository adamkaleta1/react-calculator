import { useState, useReducer } from "react"
import { Todo } from "./Todo";
import { TODOS_ACTIONS } from "./helpers";


const reducer = (todos, action) => {


    switch (action.type) {
        case TODOS_ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)]
        case TODOS_ACTIONS.TOGGLE_TODO:
            return todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            }
            )
        case TODOS_ACTIONS.DELETE_TODO:
            return todos.filter((todo) => todo.id !== action.payload.id)
    }
}

const newTodo = (name) => {
    return {
        id: Date.now(),
        name: name,
        completed: false,
    }
}

export const Todos = () => {
    const [name, setName] = useState("");

    const [todos, dispatch] = useReducer(reducer, []);

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: TODOS_ACTIONS.ADD_TODO, payload: { name } });
        setName("");
    }

    return (
        <div className="todos">Todo list:
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleChange} />
            </form>
            {todos.map((todo) => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)}
        </div>
    )

}