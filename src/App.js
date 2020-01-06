import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h1>Garage</h1>
            </header>
            <div>
                <State />
            </div>
            <div>
                <Operate />
            </div>
        </div>
    );
}

function State() {
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState({});

    function updateStatus() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/status')
            .then(r => r.json())
            .then(r => setStatus(r))
            .catch(e => console.error(JSON.stringify(e)));
    }

    useInterval(() => {
        setCount(count + 1);
    }, 1000);

    useEffect(updateStatus, []);
    useInterval(updateStatus, 500);
    return (
        <React.Fragment>
            <h2>Door is {status.position}</h2>
            {/* <h2>Door is {status.position}, Desired is {status.want}</h2> */}
            {/* <p>Count is {count}</p> */}
        </React.Fragment>
    );
}

function Operate() {
    function operate() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/operate', {method: 'POST',})
        .then(r => r.status)
        .then(s => console.log("operate ", s))
        .catch(e => console.error(JSON.stringify(e)));
    }
    return (
        <button onClick={operate} className='App-button'>Operate Door</button>
    );
}


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default App;
