import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
todoCounter.updateTotal(true); // Initialize the total count
todoCounter.updateCompleted(false); // Initialize the completed count

const PopupWithFormInstance = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    // ^^ I also need help with this part ^^

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    renderTodo(values);
    newTodoValidation.resetValidation();
    PopupWithFormInstance.close();
  },
});

PopupWithFormInstance.setEventListeners();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const section = new Section({
  itmes: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  PopupWithFormInstance.open();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidation = new FormValidator(validationConfig, addTodoForm);
newTodoValidation.enableValidation();
