const ulListTodo = document.querySelector(".list-todo");
let liItemTodo = "";
let todoList = []; //Dữ liệu todo list
let addBtn = document.querySelector(".btn-add-todo");
const formElement = document.querySelector(".main-form");
const inputElement = document.querySelector(".input-todo");
let titleTodo = "";
const pendingNumber = document.querySelector(".pending-number");
let pendingTask = [];

async function getTodoList() {
  const response = await fetch(`http://localhost:8000/api/v1/todos`);
  todoList = await response.json();
  todoList.sort((a, b) => b.id - a.id);
  console.log(todoList);
  //   console.log(todoList);
  liItemTodo = todoList
    .map(
      (todo) => `<li onclick="handleUpdate(event,${todo.id})">
            <span class="${todo.completed ? "completed" : ""}">${
        todo.title
      }</span>
            <button onclick="handleDelete(${
              todo.id
            })"><i class="fa-solid fa-trash"></i></button>
          </li>`
    )
    .join("");
  //   console.log(liItemTodo);
  ulListTodo.innerHTML = liItemTodo;
  pendingTask = todoList.filter((todo) => todo.completed === false);
  //   console.log(1111111, pendingTask);
  pendingNumber.innerHTML = `You have ${pendingTask.length} pending tasks`;
}

// Function Oninput
inputElement.addEventListener("input", (e) => {
  titleTodo = e.target.value;
  console.log(titleTodo);
});

//Function to post data khi submit
async function postTodo(todo) {
  await fetch(`http://localhost:8000/api/v1/todos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(todo),
  });
}

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (titleTodo.length > 0) {
    const newtodo = {
      title: titleTodo,
      userId: 10,
      id: todoList[0].id + 1,
    };
    //   console.log(newtodo);
    await postTodo(newtodo);
    await getTodoList();
    inputElement.value = "";
  } else {
    alert("Please enter your todo");
  }
});

//Function Delete
async function handleDelete(id) {
  //   console.log(id);
  await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  window.location = "/";
}

//Function PUT
async function handleUpdate(e, id) {
  const editTodo = todoList.find((todo) => todo.id === id);
  const spanElement = e.target.querySelector("span");
  spanElement.classList.add("completed");
  editTodo.completed = !editTodo.completed;
  await fetch(`http://localhost:8000/api/v1/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editTodo),
  });
  getTodoList();
}

// window.addEventListener("DOMContentLoaded", async () => {
getTodoList();
// });
