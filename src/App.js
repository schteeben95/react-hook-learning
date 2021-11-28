import { useEffect, useState } from 'react';
import './App.css';


const initialToDos = []


function App() {

    const [todoItems, setToDoItems] = useState(initialToDos)
    const [todoStates, setToDoStates] = useState([])
    const [initialised, setInitialised] = useState(false)

    useEffect(() => {
        saveDataToLocalStorage()
    })

    function Items(props) {

        const handleToDoChange = ((i) => {
            const newState = [...todoStates]
            newState[i] = !newState[i]
            setToDoStates(newState)
        })

        const handleDelete = ((i) => {
            const newToDoState = [...todoStates]
            newToDoState.splice(i, 1)
            setToDoStates(newToDoState)

            const newToDoItems = [...todoItems]
            newToDoItems.splice(i, 1)
            setToDoItems(newToDoItems)
        })

        return (
            <>
                {props.todos.map((content, i) => (
                    <label key={i}>
                        <button
                            onClick={() => handleDelete(i)}>x</button>
                        <input
                            type="checkbox"
                            defaultChecked={todoStates[i]}
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

        const handleKeyPress = ((event) => {
            if (event.key === "Enter") {
                handleSubmission(event.target.value)
                event.target.value = ""
            }
        })

        const handleSubmission = ((content) => {
            const newToDoState = [...todoStates]
            const newToDoItems = [...todoItems]
            newToDoState.push(false)
            newToDoItems.push(content)

            setToDoStates(newToDoState)
            setToDoItems(newToDoItems)
        })

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


    const initialise = (() => {
        if (!initialised) {
            if (isThereDataInLocalStorage()) {
                readDataFromLocalStoarge()
            } else {
                setToDoStates(Array(todoItems.length).fill(false))
            }
            setInitialised(true)
        }
    })

    const isThereDataInLocalStorage = (() => {
        return localStorage.getItem("todos") !== null
    })

    const saveDataToLocalStorage = (() => {
        localStorage.setItem("todos", JSON.stringify({
            "todoItems": todoItems,
            "todoStates": todoStates
        }))
    })

    const readDataFromLocalStoarge = (() => {
        if (isThereDataInLocalStorage()) {
            const data = JSON.parse(localStorage.getItem("todos"))
            console.log(data)
            setToDoItems(data["todoItems"])
            setToDoStates(data["todoStates"])
        }
    })

    return (
        <>
            {initialise()}
            {console.log(todoStates)}
            <h1>
                {todoStates.every((t) => t) ?
                    "You are all done!" :
                    "Still " + todoStates.filter((f) => !f).length + " to go..."}
            </h1>
            <NewToDoInput />
            <Items todos={todoItems} />
        </>
    );
}

export default App;
