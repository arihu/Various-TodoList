import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const [editedFinished, setEditedFinished] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [newFinished, setNewFinished] = useState(false);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(res => {
                setTodoList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if(rowData){
            setEditableId(id);
            setEditedTitle(rowData.title);
            setEditedDescription(rowData.description);
            setEditedDeadline(rowData.deadline || "")
            setEditedFinished(rowData.finished)
        }
        else{
            setEditableId(null);
            setEditedTitle("");
            setEditedDescription("");
            setEditedDeadline("")
            setEditedFinished(false)
        }
    };

    const addTitle = (e) => {
        e.preventDefault();
        if(!newTitle){
            alert("There must be a title")
            return;
        }

        axios.post('http://127.0.0.1:8000/api/todo/', {title: newTitle, description: newDescription, deadline: newDeadline , finished: newFinished})
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const saveEditedTitle = (id) => {
        const editedData = {
            title: editedTitle,
            description: editedDescription,
            deadline: editedDeadline,
            finished: editedFinished,
        };

        if(!editedTitle){
            alert("There must be a title")
            return;
        }

        axios.put('http://127.0.0.1:8000/api/todo/' + id, editedData)
            .then(res => {
                console.log(res);
                setEditableId(null);
                setEditedTitle("");
                setEditedDescription("");
                setEditedDeadline("")
                setEditedFinished(false)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const deleteTitle = (id) => {
        axios.delete('http://127.0.0.1:8000/api/todo/' + id)
            .then(res => {
                console.log(result);
                window.location.reload();
            })
            .catch(err => console.log(err))
        window.location.reload();

    }

    return(
        <div className="container mx-auto sm:px-4 mt-5">
            <div className="flex flex-wrap">
                <div className="md:w-3/5 pr-4 pl-4">
                    <h2 className="text-center">Todo List</h2>
                    <div className="block w-full overflow-auto scrolling-touch">
                        <table className="w-full max-w-full mb-4 bg-transparent table-bordered">
                            <thead className="bg-blue-600 text-left">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {Array.isArray(todoList) ? (
                                <tbody>
                                    {todoList.map((data) => (
                                        <tr key={data._id}>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                                        value={editedTitle}
                                                        onChange={(e) => setEditedTitle(e.target.value)}
                                                    />
                                                ) : (
                                                    data.title
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                                        value={editedDescription}
                                                        onChange={(e) => setEditedDescription(e.target.value)}
                                                    />
                                                ) : (
                                                    data.description
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                                        value={editedDeadline}
                                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                                    />
                                                ) : (
                                                    data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="checkbox"
                                                        className="block default-checkbox mx-6"
                                                        checked={editedFinished}
                                                        onChange={(e) => setEditedFinished(e.target.checked)}
                                                    />
                                                ) : (
                                                    data.finished ? 'Finished' : 'Pending'
                                                )}
                                            </td>

                                            <td>
                                                {editableId === data._id ? (
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => saveEditedTitle(data._id)}>
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => toggleEditable(data._id)}>
                                                        Edit
                                                    </button>
                                                )}
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTitle(data._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Loading products...</td>
                                    </tr>
                                </tbody>
                            )}


                        </table>
                    </div>
                </div>
                <div className="md:w-2/5 pr-4 pl-4">
                    <h2 className="text-center">Add Title</h2>
                    <form className="dark:bg-slate-800 dark:highlight-white/5 p-6">
                        <div className="mb-3">
                            <label>Title</label>
                            <input
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                type="text"
                                placeholder="Enter Description"
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Deadline</label>
                            <input
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                type="datetime-local"
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Finished</label>
                            <input
                                className="block default-checkbox"
                                type="checkbox"
                                onChange={(e) => setNewFinished(e.target.checked)}
                            />
                        </div>
                        <button onClick={addTitle} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                            Add Item
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Todo;