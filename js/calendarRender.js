// Main function to render the calendar
export function renderCalendar(
  calendarElement,
  currentMonthElement,
  currentMonth,
  todos,
  selectedDate,
  renderTodoList
) {
  // Clear the calendar element
  calendarElement.innerHTML = "";

  // Set the current month display
  currentMonthElement.textContent = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Create week header
  const weekHeader = document.createElement("div");
  weekHeader.classList.add("week-header");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    weekHeader.appendChild(dayElement);
  });

  calendarElement.appendChild(weekHeader);

  // Create dates container
  const datesContainer = document.createElement("div");
  datesContainer.classList.add("dates-container");

  // Get the start and end dates of the current month
  const startDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Get the end date of the previous month and the start date of the next month
  const prevMonthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  );
  const nextMonthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  // Render dates of the previous month
  for (let i = startDate.getDay(); i > 0; i--) {
    const prevDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      prevMonthEnd.getDate() - i + 1
    );
    const dateElement = document.createElement("div");
    dateElement.textContent = prevDate.getDate();
    dateElement.classList.add("other-month"); // Add styling for other months
    dateElement.addEventListener("click", () => {
      selectedDate.date = prevDate;
      renderTodoList();
      renderCalendar(
        calendarElement,
        currentMonthElement,
        currentMonth,
        todos,
        selectedDate,
        renderTodoList
      );
    });

    // Add todo dot if there are todos for the date
    const dateKey = prevDate.toDateString();
    if (todos[dateKey] && todos[dateKey].length > 0) {
      const allCompleted = todos[dateKey].every((todo) => todo.completed);
      const dotElement = document.createElement("span");
      dotElement.classList.add("todo-dot");
      if (allCompleted) {
        dotElement.classList.add("completed");
      }
      dateElement.appendChild(dotElement);
    }

    datesContainer.appendChild(dateElement);
  }

  // Render dates of the current month
  for (let i = 1; i <= endDate.getDate(); i++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    );
    const dateElement = document.createElement("div");
    dateElement.textContent = i;
    dateElement.addEventListener("click", () => {
      selectedDate.date = date;
      renderTodoList();
      renderCalendar(
        calendarElement,
        currentMonthElement,
        currentMonth,
        todos,
        selectedDate,
        renderTodoList
      );
    });
    if (selectedDate.date.toDateString() === date.toDateString()) {
      dateElement.classList.add("selected"); // Mark the selected date
    }

    // Add todo dot if there are todos for the date
    const dateKey = date.toDateString();
    if (todos[dateKey] && todos[dateKey].length > 0) {
      const allCompleted = todos[dateKey].every((todo) => todo.completed);
      const dotElement = document.createElement("span");
      dotElement.classList.add("todo-dot");
      if (allCompleted) {
        dotElement.classList.add("completed");
      }
      dateElement.appendChild(dotElement);
    }

    datesContainer.appendChild(dateElement);
  }

  // Render dates of the next month
  for (let i = 1; datesContainer.childElementCount % 7 !== 0; i++) {
    const nextDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      i
    );
    const dateElement = document.createElement("div");
    dateElement.textContent = i;
    dateElement.classList.add("other-month"); // Add styling for other months
    dateElement.addEventListener("click", () => {
      selectedDate.date = nextDate;
      renderTodoList();
      renderCalendar(
        calendarElement,
        currentMonthElement,
        currentMonth,
        todos,
        selectedDate,
        renderTodoList
      );
    });

    // Add todo dot if there are todos for the date
    const dateKey = nextDate.toDateString();
    if (todos[dateKey] && todos[dateKey].length > 0) {
      const allCompleted = todos[dateKey].every((todo) => todo.completed);
      const dotElement = document.createElement("span");
      dotElement.classList.add("todo-dot");
      if (allCompleted) {
        dotElement.classList.add("completed");
      }
      dateElement.appendChild(dotElement);
    }

    datesContainer.appendChild(dateElement);
  }

  // Append the dates container to the calendar element
  calendarElement.appendChild(datesContainer);
}
