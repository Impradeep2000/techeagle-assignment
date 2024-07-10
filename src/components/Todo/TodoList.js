import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [editTodoIndex, setEditTodoIndex] = useState(null);
    const [newTodoName, setNewTodoName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
        } else {
            const userTodos = JSON.parse(localStorage.getItem('todos')) || {};
            setTodos(userTodos[currentUser.email] || []);
        }
    }, [navigate]);

    const addTodo = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userTodos = JSON.parse(localStorage.getItem('todos')) || {};
        if (!userTodos[currentUser.email]) {
            userTodos[currentUser.email] = [];
        }
        userTodos[currentUser.email].push({
            name: 'New Activity',
            duration: 0,
            status: 'Pending',
            actions: []
        });
        localStorage.setItem('todos', JSON.stringify(userTodos));
        setTodos(userTodos[currentUser.email]);
    };

    const deleteTodo = (index) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userTodos = JSON.parse(localStorage.getItem('todos')) || {};
        userTodos[currentUser.email].splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(userTodos));
        setTodos(userTodos[currentUser.email]);
    };

    const startEditing = (index) => {
        setEditTodoIndex(index);
        setNewTodoName(todos[index].name);
    };

    const saveEdit = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userTodos = JSON.parse(localStorage.getItem('todos')) || {};
        userTodos[currentUser.email][editTodoIndex].name = newTodoName;
        localStorage.setItem('todos', JSON.stringify(userTodos));
        setTodos(userTodos[currentUser.email]);
        setEditTodoIndex(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <button onClick={handleLogout}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Activity Name</th>
                        <th>Activity Duration</th>
                        <th>Actions</th>
                        <th>Status</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            todo={todo}
                            setTodos={setTodos}
                            deleteTodo={deleteTodo}
                            startEditing={startEditing}
                            editTodoIndex={editTodoIndex}
                            setEditTodoIndex={setEditTodoIndex}
                            newTodoName={newTodoName}
                            setNewTodoName={setNewTodoName}
                            saveEdit={saveEdit}
                        />
                    ))}
                </tbody>
            </table>
            <button onClick={addTodo}>Add Activity</button>
        </div>
    );
};

export default TodoList;
