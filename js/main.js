import { renderCalendar } from "./calendarRender.js";
import { renderTodoList } from "./todoRender.js";
import { saveTodos, loadTodos } from "./storage.js";

// Initialize DOM elements and variables
document.addEventListener("DOMContentLoaded", function () {
  const calendarElement = document.getElementById("calendar");
  const dateDisplay = document.getElementById("date-display");
  const todoItemsElement = document.getElementById("todo-items");
  const addTodoButton = document.getElementById("add-todo");
  const newTodoInput = document.getElementById("new-todo-input");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const currentMonthElement = document.getElementById("current-month");
  /*--------------------------------------------*/

  // Set the current date and selected date
  // Set the current date variable
  const today = new Date(); // Set the selected date variable
  const selectedDate = { date: today }; // Initialize the current month
  let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Load to-dos from local storage
  const todos = loadTodos();

  // Define the updateCalendar function
  // Purpose: Update the calendar and re-render the calendar view.
  function updateCalendar() {
    renderCalendar(
      calendarElement, //Param 1:  the HTML element of the calendar
      currentMonthElement, //Param 2: the HTML element of the current month
      currentMonth, // Param 3: the date of the current month
      todos, // Param 4: the to-do list data
      selectedDate, // Param 5: the selected date
      updateTodoList // Param 6: the function to update the to-do list
    );
  }

  // Update the to-do list and regenerate the to-dos for the selected date
  function updateTodoList() {
    renderTodoList(
      dateDisplay,
      todoItemsElement,
      selectedDate,
      todos,
      () => saveTodos(todos),
      updateCalendar
    );
  }

  // Add event listener for the "Add To-Do" button
  // Handle the click event of the "Add To-Do" button,
  // Add the new to-do to the selected date's to-do list
  // Update local storage, to-do list &  calendar
  addTodoButton.addEventListener("click", () => {
    const newTodoText = newTodoInput.value.trim();
    if (newTodoText === "") {
      return;
    }
    const selectedDateKey = selectedDate.date.toDateString();
    if (!todos[selectedDateKey]) {
      todos[selectedDateKey] = [];
    }
    // Add the new to-do to the selected date's to-do list
    todos[selectedDateKey].push({ text: newTodoText, completed: false });
    newTodoInput.value = ""; // Clear input
    saveTodos(todos); // Save the to-dos
    updateTodoList(); // Update the to-do list
    updateCalendar(); // Update the calendar
  });

  // Add event listeners for the previous and next month buttons
  prevMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    updateCalendar();
  });

  nextMonthButton.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    updateCalendar();
  });

  // Initial loading of the calendar and to-do list
  updateCalendar();
  updateTodoList();
});
