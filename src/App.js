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
                <div>
                    <Down />
                    <Up />
                </div>
            </div>
            <hr />
            <div>
                <Power/>
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
        <>
            <h3>Current: {status.position}</h3>
            <h3>Requested: {status.want}</h3>
            {/* <p>Count is {count}</p> */}
        </>
    );
}

function Operate() {
    function operate() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/operate', { method: 'POST', })
            .then(r => r.status)
            .then(s => console.log("operate ", s))
            .catch(e => console.error(JSON.stringify(e)));
    }
    return (
        <button onClick={operate} className='App-button'>Operate Door</button>
    );
}

function Up() {
    function operate() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/up', { method: 'POST', })
            .then(r => r.status)
            .then(s => console.log("open ", s))
            .catch(e => console.error(JSON.stringify(e)));
    }
    return (
        <button onClick={operate} className='App-button'>Open</button>
    );
}

function Down() {
    function operate() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/down', { method: 'POST', })
            .then(r => r.status)
            .then(s => console.log("close ", s))
            .catch(e => console.error(JSON.stringify(e)));
    }
    return (
        <button onClick={operate} className='App-button'>Close</button>
    );
}

function Power() {
    const [status, setStatus] = useState({});

    function updateStatus() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/switch')
            .then(r => r.json())
            .then(r => setStatus(r))
            .catch(e => console.error(JSON.stringify(e)));
    }


    useEffect(updateStatus, []);
    useInterval(updateStatus, 500);
    return (
        <>
            <h3>Power: {status.switch}</h3>
        </>
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
