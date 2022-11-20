import React, { useState } from 'react';

const CreateTask = ({ setTodoList, todoList }) => {

    const [todoItem, setTodoItem] = useState({
        title: '',
        description: '',
        deadline: '',
        file: ''
    });

    const createNewTodo = () => {
        let todo = {
            title: todoItem.title,
            description: todoItem.description,
            deadline: todoItem.deadline,
            file: todoItem.file
        }
        setTodoList([...todoList, todo])
        return setTodoItem({
            title: '',
            description: '',
            deadline: '',
            file: ''
        })
    }

    return (
        <div>
            <input
                type="text"
                value={todoItem.title}
                onChange={(e) => setTodoItem({ ...todoItem, title: e.target.value })}
            />
            <input
                type="text"
                value={todoItem.description}
                onChange={(e) => setTodoItem({ ...todoItem, description: e.target.value })}
            />
            <input
                type="date"
                value={todoItem.deadline}
                onChange={(e) => setTodoItem({ ...todoItem, deadline: e.target.value })}
            />
            <input
                type="file"
                value={todoItem.file}
                onChange={(e) => setTodoItem({ ...todoItem, file: e.target.value })}
            />
            <button
                onClick={createNewTodo}
            >
                Создать
            </button>
        </div>
    );
};

export default CreateTask;