{
  let tasks = [];
  let hideCompleted = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const allTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const hideCompletedTasks = () => {
    hideCompleted = !hideCompleted;
    render();
  };

  const renderNewTask = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString +=
        hideCompleted && task.done
          ? ""
          : `
        <li class="list__items">
        <button class="list__button--done js-done">
         ${task.done ? "✓" : ""}
        </button>
        <span class="${task.done ? "list__text--done" : ""}"> 
         ${task.content} 
        </span>
       <button class="list__button--remove js-remove">
         🗑
       </button>
     </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const headerButton = document.querySelector(".js-headerButton");

    if (!tasks.length) {
      headerButton.innerHTML = "";
      return;
    }

    headerButton.innerHTML = `    	
    <button class="section__headerButton js-hideCompleted">
    ${hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone"}
  </button>
  <button class="section__headerButton js-markAllDone" 
    ${tasks.every(({ done }) => done) ? " disabled " : ""}>
    Ukończ wszystkie
  </button>`;
  };

  const bindButtonEvents = () => {
    const allDoneButton = document.querySelector(".js-markAllDone");
    if (allDoneButton) {
      allDoneButton.addEventListener("click", allTasksDone);
    }

    const hideCompletedButton = document.querySelector(".js-hideCompleted");
    if (hideCompletedButton) {
      hideCompletedButton.addEventListener("click", hideCompletedTasks);
    }
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((remoButton, index) => {
      remoButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    bindRemoveEvents();
    bindToggleEvents();
    bindButtonEvents();
    renderNewTask();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-input");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
