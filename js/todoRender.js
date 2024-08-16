// Main function to render the to-do list
export function renderTodoList(
  dateDisplay, // Display the selected date
  todoItemsElement, // Container for the list of to-do items
  selectedDate, // The currently selected date
  todos, // The to-dos for all dates
  saveTodos, // Function to save to-dos
  renderCalendar // Function to render the calendar
) {
  // Get the key for the selected date and display it on the page
  const selectedDateKey = selectedDate.date.toDateString();
  dateDisplay.textContent = selectedDateKey;

  // Clear the current list of to-dos
  todoItemsElement.innerHTML = "";

  // Get the list of to-dos for the selected date, or an empty list if none exist
  const todoList = todos[selectedDateKey] || [];

  // Sort the to-dos, with incomplete ones first
  todoList.sort((a, b) => a.completed - b.completed);

  // Generate list items for each to-do
  todoList.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = todo.completed ? "completed" : "";

    // Create a checkbox for the completion status
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      todoItem.classList.add("slide-right-disappear");

      saveTodos();

      // Listen for the end of the animation, then move the completed item to the end of the list
      todoItem.addEventListener(
        "animationend",
        () => {
          todoItem.classList.remove("slide-right-disappear");

          // Move the current item to the end of the list
          todoItemsElement.appendChild(todoItem);

          // Reorder the items, moving completed ones to the end
          todoList.splice(index, 1); // Remove from the current position
          todoList.push(todo); // Add to the end of the list

          saveTodos();

          // Re-render the to-do list & calendar
          renderTodoList(
            dateDisplay,
            todoItemsElement,
            selectedDate,
            todos,
            saveTodos,
            renderCalendar
          );
          renderCalendar();
        },
        { once: true }
      );
    });

    // Create an element to display the to-do text
    const textDisplay = document.createElement("span");
    textDisplay.textContent = todo.text;
    textDisplay.addEventListener("dblclick", () => {
      textDisplay.style.display = "none";
      textInput.style.display = "inline-block";
      textInput.focus();
    });

    // Create an input field for editing the to-do text
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = todo.text;
    textInput.style.display = "none";

    // Create an edit button to allow users to edit the to-do
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const isEditing = textInput.style.display === "inline-block";
      if (isEditing) {
        todo.text = textInput.value;
        textDisplay.textContent = textInput.value;
        textDisplay.style.display = "inline-block";
        textInput.style.display = "none";
        saveTodos();
        editButton.textContent = "Edit";
      } else {
        textInput.value = todo.text;
        textDisplay.style.display = "none";
        textInput.style.display = "inline-block";
        textInput.focus();
        editButton.textContent = "Save";
      }
    });

    // Create a delete button to allow users to remove the to-do
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      saveTodos();
      renderTodoList(
        dateDisplay,
        todoItemsElement,
        selectedDate,
        todos,
        saveTodos,
        renderCalendar
      );
      renderCalendar();
    });

    // Append all elements to the to-do item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(textDisplay);
    todoItem.appendChild(textInput);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoItemsElement.appendChild(todoItem);
  });
}
