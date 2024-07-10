import React, { useState, useEffect } from 'react';

const TodoItem = ({ 
    index, 
    todo, 
    setTodos, 
    deleteTodo, 
    startEditing, 
    editTodoIndex, 
    setEditTodoIndex, 
    newTodoName, 
    setNewTodoName, 
    saveEdit 
}) => {
    const [duration, setDuration] = useState(todo.duration);
    const [status, setStatus] = useState(todo.status);

    useEffect(() => {
        let timer;
        if (status === 'Ongoing') {
            timer = setInterval(() => {
                setDuration((prevDuration) => prevDuration + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status]);

    const updateTodo = (updatedTodo) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userTodos = JSON.parse(localStorage.getItem('todos')) || {};
        userTodos[currentUser.email][index] = updatedTodo;
        localStorage.setItem('todos', JSON.stringify(userTodos));
        setTodos(userTodos[currentUser.email]);
    };

    const handleAction = (action) => {
        let newStatus = status;
        switch(action) {
            case 'start':
                newStatus = 'Ongoing';
                break;
            case 'pause':
                newStatus = 'Paused';
                break;
            case 'resume':
                newStatus = 'Ongoing';
                break;
            case 'end':
                newStatus = 'Completed';
                break;
            default:
                break;
        }
        const updatedTodo = { ...todo, status: newStatus, duration };
        updateTodo(updatedTodo);
        setStatus(newStatus);
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {editTodoIndex === index ? (
                    <input 
                        type="text" 
                        value={newTodoName} 
                        onChange={(e) => setNewTodoName(e.target.value)} 
                    />
                ) : (
                    todo.name
                )}
            </td>
            <td>{formatTime(duration)}</td>
            <td>
                <button onClick={() => handleAction('start')} disabled={status !== 'Pending'}>Start</button>
                <button onClick={() => handleAction('pause')} disabled={status !== 'Ongoing'}>Pause</button>
                <button onClick={() => handleAction('resume')} disabled={status !== 'Paused'}>Resume</button>
                <button onClick={() => handleAction('end')} disabled={status === 'Completed' || status === 'Pending'}>End</button>
            </td>
            <td>{status}</td>
            <td>
                {editTodoIndex === index ? (
                    <button onClick={saveEdit}>Save</button>
                ) : (
                    <button onClick={() => startEditing(index)}>Edit</button>
                )}
                <button onClick={() => deleteTodo(index)}>Delete</button>
            </td>
        </tr>
    );
};

export default TodoItem;
