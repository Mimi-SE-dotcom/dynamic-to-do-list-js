document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Event listener for Add button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Event listener for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });

    /**
     * Function to add a task to the list and Local Storage
     * @param {string} taskText - The task content
     * @param {boolean} save - Whether to save to Local Storage (default true)
     */
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task on button click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    /**
     * Save task to Local Storage
     * @param {string} taskText
     */
    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Remove task from Local Storage
     * @param {string} taskText
     */
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Load tasks from Local Storage
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }
});