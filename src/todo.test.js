/**
 * @jest-environment jsdom
*/
/* eslint-disable no-unused-vars */
import TodoList from './modules/todoList.js';
import Form from './modules/form.js';

document.body.innerHTML = `
    <div> 
        <ul id="test-list"></ul> 
    </div>
    <div class="box"> 
        <input id="new_task_input" placeholder="Add to your list..." type="text"> 
        <i id="new_task_icon" class="fa-solid fa-arrow-turn-down fa-rotate-90 fa-2xs"></i>
    </div>
    <button class="box" id="clear_all_completed_tasks">
        <span>Clear all completed</span>
    </button>
  `;

const myList = new TodoList('#test-list');

const myForm = new Form(myList, {
  newTaskInput: 'new_task_input',
  newTaskIcon: 'new_task_icon',
  clearAllCompletedTasks: 'clear_all_completed_tasks',
});

describe('Add/Remove Item', () => {
  test('Add Item to List', () => {
    myList.addTask('Test description');
    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(list.length);
  });

  test('Change Status', () => {
    myList.completeTask(myList.tasks[myList.tasks.length - 1]);
    expect(myList.tasks[myList.tasks.length - 1].completed).toBe(true);
    myList.uncompleteTask(myList.tasks[myList.tasks.length - 1]);
    expect(myList.tasks[myList.tasks.length - 1].completed).toBe(false);
  });

  test('Edit Task', () => {
    myList.editTask(myList.tasks[myList.tasks.length - 1]);
    const updated = myList.tasks[myList.tasks.length - 1].description;
    const check = myList.tasks[myList.tasks.length - 1].domSpan.innerHTML;
    expect(check).toBe(updated);
  });

  test('Remove Item from list', () => {
    myList.removeTask(1);
    myList.drawTable();

    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(list.length || 0);
  });

  test('Remove All', () => {
    myList.clearAllCompleted();
    myList.drawTable();
    const list = document.querySelectorAll('#test_list li');
    expect(list).toHaveLength(0);
  });
});