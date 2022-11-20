import React from 'react';

const TodoList = ({ todoList }) => {

    return (
        <div>
            <h2>TODO-LIST</h2>
            {
                todoList.map(todo => {
                    console.log(todo)
                    return (
                        <div>
                            <h3>{todo.title}</h3>
                            <div>{todo.description}</div>
                            <div>{todo.deadline}</div>
                            <div>{todo.file}</div>
                        </div>
                    )
                })}
        </div>
    );
};

export default TodoList;