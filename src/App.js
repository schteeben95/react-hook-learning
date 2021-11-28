import { useState } from 'react';
import './App.css';


const todos = [
    "do something",
    "do something else",
    "procrastinate",
    "just do something",
    "ok never mind"
]


function App() {

    const [todoItems, setToDoItems] = useState(todos)
    const [todoState, setToDoState] = useState([])
    const [initialised, setInitialised] = useState(false)

    function Items(props) {

        function handleToDoChange(i) {
            const newState = [...todoState]
            newState[i] = !newState[i]
            setToDoState(newState)
        }

        function handleDelete(i) {
            const newToDoState = [...todoState]
            newToDoState.splice(i, 1)
            setToDoState(newToDoState)

            const newToDoItems = [...todoItems]
            newToDoItems.splice(i, 1)
            setToDoItems(newToDoItems)
        }

        return (
            <>
                {props.todos.map((content, i) => (
                    <label key={i}>
                        <button
                            onClick={() => handleDelete(i)}>x</button>
                        <input
                            type="checkbox"
                            defaultChecked={todoState[i]}
                            onClick={() => handleToDoChange(i)} />
                        {content}
                        <br />
                    </label>
                ))}
            </>
        )
    }

    function NewToDoInput(props) {
        const [newToDo, setNewToDo] = useState("")

        function handleKeyPress(event) {
            if (event.key === "Enter") {
                handleSubmission(event.target.value)
                event.target.value = ""
            }
        }

        function handleSubmission(content) {
            const newToDoState = [...todoState]
            const newToDoItems = [...todoItems]
            newToDoState.push(false)
            newToDoItems.push(content)

            setToDoState(newToDoState)
            setToDoItems(newToDoItems)
        }

        return (
            <>
                <input
                    autoFocus
                    type="text"
                    onKeyPress={handleKeyPress}
                    onChange={e => setNewToDo(e.target.value)}
                    value={newToDo} />
                <br />
            </>
        )
    }


    function initialise() {
        if (!initialised) {
            setToDoState(Array(todoState.length).fill(false))
            setInitialised(true)
        }
    }

    return (
        <>
            {initialise()}
            <h1>
                {todoState.every((t) => t) ?
                    "You are all done!" :
                    "Still " + todoState.filter((f) => !f).length + " to go..."}
            </h1>
            <NewToDoInput />
            <Items todos={todoItems} />
        </>
    );
}

export default App;
