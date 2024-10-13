document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('#filter button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (filter === 'active' && task.completed) return;
            if (filter === 'completed' && !task.completed) return;

            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.description} (Due: ${task.dueDate} - Priority: ${task.priority})</span>
                <div>
                    <button onclick="toggleComplete(${index})">✔</button>
                    <button onclick="editTask(${index})">✎</button>
                    <button onclick="deleteTask(${index})">🗑</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskDescription = taskInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        const newTask = { description: taskDescription, dueDate: dueDate, priority: priority, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        form.reset();
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    const editTask = (index) => {
        const task = tasks[index];
        taskInput.value = task.description;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
        deleteTask(index);
    };

    form.addEventListener('submit', addTask);

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filter = event.target.dataset.filter;
            renderTasks(filter);
        });
    });

    renderTasks();
});
