document.addEventListener('DOMContentLoaded', ()=>{
    const API_URL = 'http://localhost:8000/api/todo/';
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');

    const getItems = async () => {
        console.log("Getting Todolist items");
        const response = await fetch(API_URL);
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="todo-item">Title: ${todo.title}</span>
                <span class="todo-item">Description: ${todo.description}</span>
                <span class="todo-item">Finished: ${todo.finished} | Deadline: ${todo.deadline} </span>
                
            `;
            // <span>
            //         <div>
            //             <button onclick="editItem('${todo._id}', '${todo.title}', '${todo.description}', ${todo.finished}, '${todo.deadline}')">Edit</button>
            //             <button onclick="deleteItem('${todo._id}')">Delete</button>
            //         </div>
            //     </span>
            let todoDel = document.createElement("button");
            todoDel.classList.add("todo-delete");
            todoDel.innerHTML = "Delete";
            todoDel.addEventListener("click", (e) => {
                console.log("Delete Item Button Clicked");
                deleteItem(todo._id);
            });
            let todoEdit= document.createElement("button");
            todoEdit.classList.add("todo-edit");
            todoEdit.innerHTML = "Edit";
            todoEdit.addEventListener("click", (e) => {
                console.log("Edit Item Button Clicked");
                editItem(todo._id);
            });
            
            
            todoList.appendChild(li);
            todoList.appendChild(todoDel);
            todoList.appendChild(todoEdit);

        });
    };

    const addItem = async (todo) => {
        console.log("Posting Todolist items");
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        getItems();
    };

    const editItem = (id, oldTitle, oldDescription, oldFinished, oldDeadline) => {
        console.log("Posting Todolist items");
        const title = prompt('Edit title', oldTitle);
        if (title) {
            const description = prompt('Edit description', oldDescription);
            const finished = confirm('Is it finished?');
            const deadline = prompt('Edit deadline', oldDeadline);
            fetch(`${API_URL}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, finished, deadline })
            }).then(getItems);
        }
    };

    const deleteItem = async (_id) => {
        console.log("Deleting Todolist item: " + _id);
        await fetch(API_URL + _id, {
            method: 'DELETE'
        })
        .then(response=> response.json())
        .then(error => console.error('Error:', error));
        todoForm.reset();
        getItems();
    };


    todoForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const finished = document.getElementById('finished').checked;
        const deadline = document.getElementById('deadline').value;
        
        if (title) {
            addItem({ title, description, finished, deadline });
            todoForm.reset();
        }
    });


    // Fetch todos on initial load
    getItems();


})