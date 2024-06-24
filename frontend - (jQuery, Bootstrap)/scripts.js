$(document).ready(function() {
    const API_URL = 'http://localhost:8000/api/todo/';
    const $todoForm = $('#todoForm');
    const $todoList = $('#todoList');

    const getItems = async () => {
        console.log("Getting Todolist items");
        const response = await fetch(API_URL);
        const todos = await response.json();
        $todoList.empty();
        todos.forEach(todo => {
            const $li = $('<li class="list-group-item list-group-item-info m-2">').html(`
                <span class="todo-item d-block mb-2"><b>Title:</b> ${todo.title}</span>
                <span class="todo-item d-block mb-2"><b>Description:</b> ${todo.description}</span>
                <span class="todo-item d-block mb-2"><b>Finished:</b> ${todo.finished} </span>
                <span class="todo-item d-block mb-2"><b>Deadline:</b> ${todo.deadline}</span>
            `);
            const $buttonContainer = $('<div class="d-flex justify-content-end mt-2"></div>');

            const $todoDel = $('<button>').addClass('btn btn-danger').text('Delete').on('click', () => {
                console.log("Delete Item Button Clicked");
                deleteItem(todo._id);
            });
            const $todoEdit = $('<button>').addClass('btn btn-success mx-2').text('Edit').on('click', () => {
                console.log("Edit Item Button Clicked");
                editItem(todo._id, todo.title, todo.description, todo.finished, todo.deadline);
            });
            $buttonContainer.append($todoDel).append($todoEdit);
            $todoList.append($li).append($buttonContainer);
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

    const deleteItem = async (id) => {
        console.log("Deleting Todolist item: " + id);
        await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
        $todoForm[0].reset();
        getItems();
    };

    $todoForm.on('submit', function(event) {
        event.preventDefault();
        const title = $('#title').val().trim();
        const description = $('#description').val().trim();
        const finished = $('#finished').is(':checked');
        const deadline = $('#deadline').val();
        
        if (title) {
            addItem({ title, description, finished, deadline });
            $todoForm[0].reset();
        }
    });

    // Fetch todos on initial load
    getItems();
});