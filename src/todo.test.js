import TodoList from './modules/todoList.js';

test('add a todo', () => {
  expect(TodoList.addTask('New Task', 'false')).toBe('New Task', 'false');
});