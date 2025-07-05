import React, { useState } from 'react';

const API_BASE = 'http://localhost:3000/api/todo';

function ToDoItem (props) {
    const { toDo, id, getToDo } = props;
    const [completed, setCompleted] = useState(false);

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(API_BASE + "/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete a task");
            }
            
            const data = await response.json();
            console.log('Delete response:', data);
            
            // Refresh the todo list after deletion
            getToDo();
            
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const updateTodo = async (id, completed) => {
    try {
        const response = await fetch(API_BASE + "/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, completed })
        });
        
        if (response.ok) {
            getToDo(); // Refresh list
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

    const toggleComplete = async () => {
        const newCompleted= !completed;
        setCompleted(newCompleted)
        await updateTodo(id, newCompleted)
    }
    return (
        <div className={'todo' + (completed ? ' check-complete' : '')} key={id}>
            <div className='checkbox' onClick={toggleComplete}>
                {completed ? '✓' : ''}
            </div>
            <div className='text'>{toDo}</div>
            <div className='delete-todo' onClick={() => deleteTodo(id)}>
                <span>X</span>
            </div>
        </div>
    )
}

export default ToDoItem;