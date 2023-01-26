/**
 * @jest-environment jsdom
*/
import TodoList from './__mocks__/todoList.js';

const todos = new TodoList();

describe('Add New Task', () => {
  test('add a todo', () => {
    // arrange
    localStorage.clear();
    // act
    todos.addTask('New Task', false);
    expect((localStorage).getItem('todo-list-tasks')).toBe(JSON.stringify([{ description: 'New Task', completed: false, index: 1 }]));
  });
});