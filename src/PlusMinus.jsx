import { useReducer } from "react"

// export const PlusMinus = () => {

//     const [count, setCount] = useState(0);

//     const increment = () => {
//         // setCount(count + 1); też zadziała, ale nie jest poprawnym zapisem
//         setCount((prevCount) => prevCount + 1)
//         // setCount(count + 1); - jeśli wywołamy dwa razy w taki sposób, to nie zadziała prawidłowo
//     }

//     const decrement = () => {
//         setCount((prevCount) => prevCount - 1)
//     }

//     return (
//         <div className="plusMinus">
//             <button onClick={decrement}>-</button>
//             <h2>{count}</h2>
//             <button onClick={increment}>+</button>
//         </div>
//     )
// }

const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT: return {
            count: state.count + 1,
        }
        case ACTIONS.DECREMENT: return {
            count: state.count - 1,
        }
    }
}

{/* 
    state = { count: 0 }
    */}

export const PlusMinus = () => {

    // const [count, setCount] = useState(0);

    const [state, dispatch] = useReducer(reducer, { count: 0 }) // useReducer przyjmuje dwa argumenty

    const increment = () => {
        // setCount((prevCount) => prevCount + 1)
        dispatch({ type: ACTIONS.INCREMENT })
    }

    const decrement = () => {
        // setCount((prevCount) => prevCount - 1)
        dispatch({ type: ACTIONS.DECREMENT })
    }

    return (
        <div className="plusMinus">
            <button onClick={decrement}>-</button>
            <h2>{state.count}</h2>
            <button onClick={increment}>+</button>
        </div>
    )
}
