document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const taskForm = document.getElementById('task-form');
    const saveTaskButton = document.getElementById('save-task');
    const updateTaskButton = document.getElementById('update-task');
    const taskList = document.getElementById('task-list');

    let currentEditItem = null;

    // Show task form when 'Add New Task' is clicked
    addTaskButton.addEventListener('click', () => {
        resetForm();
        taskForm.style.display = taskForm.style.display === 'none' ? 'block' : 'none';
    });

    // Save new task when 'Save Task' button is clicked
    saveTaskButton.addEventListener('click', () => {
        const taskTitle = document.getElementById('task-title').value;
        const dueDate = document.getElementById('due-date').value;
        const dueTime = document.getElementById('due-time').value;
        const ampm = document.getElementById('ampm').value;
        const category = document.getElementById('category').value;
        const priority = document.getElementById('priority').value;

        if (taskTitle && dueDate && dueTime && category && priority) {
            addTask(taskTitle, dueDate, dueTime, ampm, category, priority);
            resetForm();
            taskForm.style.display = 'none';
        } else {
            alert('Please fill out all the fields!');
        }
    });

    // Update task when 'Update Task' button is clicked
    updateTaskButton.addEventListener('click', () => {
        const taskTitle = document.getElementById('task-title').value;
        const dueDate = document.getElementById('due-date').value;
        const dueTime = document.getElementById('due-time').value;
        const ampm = document.getElementById('ampm').value;
        const category = document.getElementById('category').value;
        const priority = document.getElementById('priority').value;

        if (taskTitle && dueDate && dueTime && category && priority && currentEditItem) {
            updateTask(currentEditItem, taskTitle, dueDate, dueTime, ampm, category, priority);
            resetForm();
            taskForm.style.display = 'none';
        } else {
            alert('Please fill out all the fields!');
        }
    });

    function addTask(title, date, time, ampm, category, priority) {
        const listItem = document.createElement('li');
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskTitleElem = document.createElement('span');
        taskTitleElem.classList.add('task-title');
        taskTitleElem.textContent = title;

        const categoryElem = document.createElement('span');
        categoryElem.classList.add('task-category');
        categoryElem.textContent = `[${category}]`;

        const priorityElem = document.createElement('span');
        priorityElem.classList.add('task-priority');
        priorityElem.textContent = `[${priority}]`;

        const dueTimeElem = document.createElement('span');
        dueTimeElem.classList.add('task-due');
        dueTimeElem.textContent = `Due: ${date} ${time} ${ampm}`;

        // Add Category-based and Priority-based Styles
        listItem.classList.add(`priority-${priority.toLowerCase()}`);
        listItem.classList.add(`category-${category.toLowerCase()}`);

        taskInfo.append(taskTitleElem, categoryElem, priorityElem, dueTimeElem);
        listItem.appendChild(taskInfo);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            editTask(listItem, title, date, time, ampm, category, priority);
        });

        // Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = 'Mark as Completed';
        completeBtn.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(editBtn);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    function editTask(listItem, title, date, time, ampm, category, priority) {
        document.getElementById('task-title').value = title;
        document.getElementById('due-date').value = date;
        document.getElementById('due-time').value = time;
        document.getElementById('ampm').value = ampm;
        document.getElementById('category').value = category;
        document.getElementById('priority').value = priority;

        currentEditItem = listItem;
        document.getElementById('save-task').style.display = 'none';
        document.getElementById('update-task').style.display = 'block';
        taskForm.style.display = 'block';
    }

    function updateTask(listItem, title, date, time, ampm, category, priority) {
        listItem.querySelector('.task-title').textContent = title;
        listItem.querySelector('.task-due').textContent = `Due: ${date} ${time} ${ampm}`;

        // Update Category-based and Priority-based Styles
        listItem.classList.remove(`priority-${priority.toLowerCase()}`, `category-${category.toLowerCase()}`);
        listItem.classList.add(`priority-${priority.toLowerCase()}`, `category-${category.toLowerCase()}`);
    }

    function resetForm() {
        document.getElementById('task-title').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('due-time').value = '';
        document.getElementById('category').value = '';
        document.getElementById('priority').value = '';
        document.getElementById('save-task').style.display = 'block';
        document.getElementById('update-task').style.display = 'none';
        currentEditItem = null;
    }
});
