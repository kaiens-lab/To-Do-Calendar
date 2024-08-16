import { renderCalendar } from "./calendarRender.js";
import { renderTodoList } from "./todoRender.js";
import { saveTodos, loadTodos } from "./storage.js";

// Initialize the calendar and to-do list after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements related to calendar and to-do list
  const calendarElement = document.getElementById("calendar");
  const dateDisplay = document.getElementById("date-display");
  const todoItemsElement = document.getElementById("todo-items");
  const addTodoButton = document.getElementById("add-todo");
  const newTodoInput = document.getElementById("new-todo-input");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const currentMonthElement = document.getElementById("current-month");

  // Initialize selected date and current month
  const today = new Date();
  const selectedDate = {
    date: today,
    get() {
      return this.date;
    },
    set(newDate) {
      this.date = newDate;
    },
  };
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Load to-dos from local storage
  const todos = loadTodos();

  // Update the calendar view
  function updateCalendar() {
    renderCalendar(
      calendarElement,
      currentMonthElement,
      currentMonth,
      todos,
      selectedDate,
      updateTodoList
    );
  }

  // Update the to-do list
  function updateTodoList() {
    renderTodoList(
      dateDisplay,
      todoItemsElement,
      selectedDate,
      todos,
      updateCalendar
    );
  }

  // Event listener for adding a new to-do
  addTodoButton.addEventListener("click", () => {
    const newTodoText = newTodoInput.value.trim();
    if (newTodoText === "") {
      return;
    }

    // Use the selected date as the key to store the to-do
    const selectedDateKey = selectedDate.get().toDateString();
    if (!todos[selectedDateKey]) {
      todos[selectedDateKey] = [];
    }
    todos[selectedDateKey].push({ text: newTodoText, completed: false });
    newTodoInput.value = "";
    saveTodos(todos);
    updateTodoList();
    updateCalendar();
  });

  // Event listener for navigating to the previous month
  prevMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    updateCalendar();
  });

  // Event listener for navigating to the next month
  nextMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    updateCalendar();
  });

  // Initial rendering of the calendar and to-do list
  updateCalendar();
  updateTodoList();
});
