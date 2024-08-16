// Function to save the to-do list to local storage
export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load the to-do list from local storage
export function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}
