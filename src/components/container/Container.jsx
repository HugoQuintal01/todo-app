import React, { useState } from 'react';
import tasksData from '../../assets/tasks/Task'; // Assuming you have tasks defined in a separate file

const Container = () => {
    const [tasks, setTasks] = useState(tasksData);
    const [newTaskName, setNewTaskName] = useState('');
    const [editModeTaskId, setEditModeTaskId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTaskName.trim() === '') return; // Prevent adding empty tasks

        const newTask = {
            id: tasks.length + 1, // Assuming each new task gets a unique id
            name: newTaskName.trim()
        };

        setTasks([...tasks, newTask]);
        setNewTaskName('');
    };

    const handleEdit = (taskId) => {
        setEditModeTaskId(taskId);
    };

    const handleChange = (event) => {
        setNewTaskName(event.target.value);
    };

    const handleSaveEdit = (taskId, newName) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, name: newName } : task
        );
        setTasks(updatedTasks);
        setEditModeTaskId(null);
    };

    const handleRemove = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <section className="container-section gridrow">
            <div className="container-div col-12 col-d-12 col-t-12">
                <div className="container-title col-12 col-d-12 col-t-12">
                    <span>Todos ({tasks.length})</span>
                </div>
                <div className="container-content col-12 col-d-12 col-t-12">
                    <form onSubmit={handleSubmit} className="content-input col-12 col-d-12 col-t-12">
                        <input
                            placeholder="Insert todo here"
                            type="text"
                            value={newTaskName}
                            onChange={handleChange}
                            name="insert-todo"
                            id="insert-todo-id"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <div className="todos-list col-12 col-d-12 col-t-12">
                        {tasks.map(task => (
                            <div key={task.id} className="todo-item col-12 col-d-12 col-t-12">
                                <div className="todo-item-content">
                                    {editModeTaskId === task.id ? (
                                        <input
                                            type="text"
                                            value={newTaskName}
                                            onChange={(e) => setNewTaskName(e.target.value)}
                                            placeholder="Edit task"
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            <input type="checkbox" name={`todo-item-${task.id}`} id={`todo-item-${task.id}`} />
                                            <label htmlFor={`todo-item-${task.id}`}>{task.name}</label>
                                        </>
                                    )}
                                </div>
                                <div className="todo-item-edit">
                                    {editModeTaskId === task.id ? (
                                        <button onClick={() => handleSaveEdit(task.id, newTaskName)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(task.id)}>Edit</button>
                                    )}
                                    <button onClick={() => handleRemove(task.id)} className="remove-todo">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Container;
