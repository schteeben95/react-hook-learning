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

    const [todoState, setToDoState] = useState([])

    function handleCheckBoxChange(i) {
        const newState = [...todoState]
        newState[i] = !newState[i]
        setToDoState(newState)
        console.log(newState)
    }

    const listItems = todos.map((item, i) =>
        <div key={i}>
            <label>
                <input type="checkbox" id={i} key={i} onChange={() => handleCheckBoxChange(i)} />
                {item}
            </label>
        </div>
    )

    return (
        <>
            {/* {console.log(todoState)} */}
            {todoState.every(d => d === true) ? ":D" : ":("}
            {listItems}
        </>
    );
}

export default App;
