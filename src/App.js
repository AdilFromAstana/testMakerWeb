import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {

  const [todoList, setTodoList] = useState([]);

  return (
    <div>
      <TodoForm setTodoList={setTodoList} todoList={todoList} />
      <TodoList todoList={todoList} />
    </div>
  );
};

export default App;