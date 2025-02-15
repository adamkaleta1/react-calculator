import PropTypes from "prop-types"
import { TODOS_ACTIONS } from "./helpers"

export const Todo = ({ todo, dispatch }) => {

    return (
        <div className="todo">
            <span style={{ color: todo.completed ? "#aaa" : "#000", textDecoration: todo.completed ? "line-through" : "none" }}>{todo.name}</span>
            <div className="todoButtons">
                <button onClick={() => dispatch({ type: TODOS_ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>{todo.completed ? "Undo" : "Done"}</button>
                <button onClick={() => dispatch({ type: TODOS_ACTIONS.DELETE_TODO, payload: { id: todo.id } })}>Delete</button>
            </div>
        </div>
    )
}

Todo.propTypes = {
    todo: { id: PropTypes.string, name: PropTypes.string, completed: PropTypes.boolean },
    dispatch: PropTypes.func,
}