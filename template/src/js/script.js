// ----------------------
// Functions
// ----------------------
/*
 * getInputValue checks if the value of the input is valid
 *   -> if it is, add a new task
 *   -> if not, log some message and do nothing
 *
 */
function getInputValue(flag) {
    var addInput = document.getElementById('add-input'),
        addInputValue = addInput.value;
    if (addInputValue) {
        if (!document.getElementById('task-list').hasChildNodes()) {
            // Hide "No task yet"
            document.getElementsByClassName('no-task')[0].classList.add('no-task--hide');
            // Permantly hide .no-text after the animation
            setTimeout(function() {
                document.getElementsByClassName('no-task')[0].classList.add('u-hide');
            }, 499);

            // Add styles, to not dropbown when a new task is created
        }
        // REFACTOR
        // First task, hide no task yet
        if (flag) {
            addNewTask(addInputValue);
        } else {
            // Wait for the animation to complete, then insert new task
            setTimeout(function() {
                addNewTask(addInputValue);
            }, 400);
        }
        // REFACTOR
    } else {
        console.log('Empty input');
    }
    // Clean the input value
    addInput.value = '';
    addInput.select();
}

function addNewTask(value) {
    var taskList = document.getElementsByClassName('task-list')[0];
    taskList.insertBefore(createTask(value), taskList.childNodes[0]);
    taskList.classList.add('task-list--new-task-animation');
    setTimeout(function() {
        taskList.classList.remove('task-list--new-task-animation');
    }, 500);
}

// Remove a certain task
function removeTask() {
    var item = this.parentNode.parentNode,
        parent = item.parentNode;

    parent.removeChild(item);
    // Check if task-list is empty to display
    checkNoTasks();
}

function checkNoTasks() {
    var taskList = document.getElementById('task-list');
    if (!taskList.hasChildNodes()) {
        var noTask = document.getElementById('no-task');
        noTask.classList.remove('u-hide');
        noTask.classList.remove('no-task--hide');
    }
}

// Complete a certain task
function completeTask() {
    var item = this.parentNode.parentNode,
        parent = item.parentNode;

    // Determinar si la tarea se está completando o descompletando
    var target = (parent.id === 'task-list-completed') ? document.getElementById('task-list') : document.getElementById('task-list-completed');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function createTask(value) {
    // Create .task
    var task = document.createElement('li');
    task.classList.add('task');
    // Create .task__title
    var taskTitle = document.createElement('p');
    taskTitle.appendChild(document.createTextNode(value));
    taskTitle.classList.add('task__title');
    task.appendChild(taskTitle);
    // Create .task-actions
    var taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('task-actions__button', 'task-actions__button--delete');
    deleteButton.innerHTML = '<svg width="16px" height="20px" viewbox="0 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="trash-icon"><path d="M8,17 C7.6,17 7.4,16.7 7.4,16.4 L7.4,9.6 C7.4,9.2 7.7,9 8,9 C8.3,9 8.6,9.3 8.6,9.6 L8.6,16.4 C8.6,16.7 8.4,17 8,17 L8,17 Z"></path><path d="M5,17 C4.6,17 4.4,16.7 4.4,16.4 L4.4,9.6 C4.4,9.2 4.7,9 5,9 C5.4,9 5.6,9.3 5.6,9.6 L5.6,16.4 C5.7,16.7 5.4,17 5,17 L5,17 Z"></path><path d="M11,17 C10.6,17 10.4,16.7 10.4,16.4 L10.4,9.6 C10.4,9.2 10.7,9 11,9 C11.4,9 11.6,9.3 11.6,9.6 L11.6,16.4 C11.6,16.7 11.3,17 11,17 L11,17 Z"></path><path d="M13.1,2.6 L11.2,2.6 L11.2,2.3 C11.2,1 10.2,0 8.9,0 L7.2,0 C5.9,0 4.8,1 4.8,2.3 L4.8,2.5 L2.9,2.5 C1.6,2.5 0.6,3.5 0.6,4.8 L0.6,6.1 C0.6,6.6 1,7 1.5,7.1 L1.5,17.6 C1.5,18.9 2.5,19.9 3.8,19.9 L12.3,19.9 C13.6,19.9 14.6,18.9 14.6,17.6 L14.6,7.2 C15.1,7.1 15.5,6.7 15.5,6.2 L15.5,4.9 C15.4,3.6 14.4,2.6 13.1,2.6 L13.1,2.6 Z M6.1,2.3 C6.1,1.7 6.6,1.2 7.2,1.2 L8.9,1.2 C9.5,1.2 10,1.7 10,2.3 L10,2.5 L6.1,2.5 L6.1,2.3 L6.1,2.3 Z M13.3,17.7 C13.3,18.3 12.8,18.8 12.2,18.8 L3.7,18.8 C3.1,18.8 2.6,18.3 2.6,17.7 L2.6,7.2 L13.2,7.2 L13.2,17.7 L13.3,17.7 Z M14.2,6 L1.8,6 L1.8,4.9 C1.8,4.3 2.3,3.8 2.9,3.8 L13.1,3.8 C13.7,3.8 14.2,4.3 14.2,4.9 L14.2,6 L14.2,6 Z"></path></svg>';
    // Add click event for removing
    deleteButton.addEventListener('click', removeTask);
    var completeButton = document.createElement('button');
    completeButton.classList.add('task-actions__button', 'task-actions__button--complete');
    completeButton.innerHTML = '<svg class="task-icon" width="20px" height="20px" viewbox="-1 -1 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="task-icon__background" id="done-task-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="Rectangle-path" stroke="#21AF8F" x="0" y="0" width="20" height="20" rx="10"></rect><path d="M8.58638743,13.6013074 L8.58638743,13.6013074 C8.37696335,13.6013074 8.16753927,13.4965953 8.06282723,13.3918833 L5.23560209,10.5646582 C4.92146597,10.250522 4.92146597,9.72696182 5.23560209,9.4128257 C5.54973822,9.09868957 6.07329843,9.09868957 6.38743455,9.4128257 L8.58638743,11.6117786 L13.6125654,6.58560057 C13.9267016,6.27146444 14.4502618,6.27146444 14.7643979,6.58560057 C15.078534,6.89973669 15.078534,7.4232969 14.7643979,7.73743303 L9.21465969,13.2871712 C9.0052356,13.4965953 8.79581152,13.6013074 8.58638743,13.6013074 L8.58638743,13.6013074 Z" class="task-icon__tick"></path></g></svg>';
    // Add click event for completing
    completeButton.addEventListener('click', completeTask);
    taskActions.appendChild(deleteButton);
    taskActions.appendChild(completeButton);
    task.appendChild(taskActions);
    return task;
}


// ----------------------
// Variables
// ----------------------
// REFACTOR
var flag = false;

// ----------------------
// Main script
// ----------------------
document.getElementById('add-button').addEventListener('click', function() {
    getInputValue(flag);
    flag = true;
});

document.addEventListener('keydown', function(event) {
    // keypress 13 -> Enter key
    if (event.which == 13) {
        getInputValue(flag);
        flag = true;
    }
});

// Complete task test
// document.getElementsByClassName('task-list')[0].addEventListener('click', function(e) {
//     console.log(e);
//     var tagName = e.target.tagName;
//     console.log(tagName);
//     if (tagName === 'svg' || tagName === 'path' || tagName === 'BUTTON' || tagName === 'rect') {
//         console.log('OH YES');
//     }
// });
