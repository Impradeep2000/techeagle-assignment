import React from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TodoList from './components/Todo/TodoList';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element = {<Signup />} />
          <Route path="/login" element = {<Login />} />
          {/* <Route path="/signup" element = {<Signup />} /> */}
          <Route path="/todos" element = {<TodoList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
