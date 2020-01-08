import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './App.css';

function App() {

    return (
        <div className="App">
            <Power>
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
            </Power>
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

function Power({ children }) {
    const [status, setStatus] = useState({});

    function updateStatus() {
        fetch('https://bfb3761ljd.execute-api.us-east-1.amazonaws.com/prod/api/switch')
            .then(r => r.json())
            .then(r => setStatus(r))
            .catch(e => console.error(JSON.stringify(e)));
    }


    useEffect(updateStatus, []);
    useInterval(updateStatus, 500);
    if (!status.switch) return (<></>);
    return (
        status.switch === "OFF"
            ? <PowerOff />
            : <>{children}</>
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


const BlackBack = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 25vmin;
    background: #000;
`


const PowerAlert = () => {
    return <svg version="1.1" width="100%" height="100%" viewBox={"0 0 24 24"}>
        <path
            fill="red"
            d="M13,14H11V9H13M13,18H11V16H13M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" />
    </svg>
};

const PowerOff = () => {
    return (
        <BlackBack>
            <PowerAlert />
        </BlackBack>
    );
};


export default App;
