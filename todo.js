//retrive todo frm local storage store inn empty arry

let todo = JSON.parse(localStorage.getItem
    ("todo")) || [];
const todoInput = document.getElementById("toInput");
const todolist = document.getElementById("todolist");
const todocount = document.getElementById("todocount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded",
    function()
    {
        addButton.addEventListener("click",addTask);
        todoInput.addEventListener('keydown',function(event){
       if(event.key==="Enter"){
        event.preventDefault();
        addTask();
       }
        });
        deleteButton.addEventListener("click",deletealltask); 
        displayTask();
    });

    function addTask(){
      const newTask = todoInput.value.trim();
      if(newTask!=="") {
        todo.push({
            text: newTask,
            disabled:false,
        });
        saveToLocalStorage();
        todoInput.value="";
        displayTask();
      }
    }
    function deletealltask(){
        console.log("del");

    }

    function displayTask(){
      todolist.innerHTML="";
      todo.forEach((item,index) => {
         const p = document.createElement("p");
         p.innerHTML = `
        <div class="todo-container">
           <input type="checkbox" class ="todo-checkbox"
           id ="input-${index}" ${item.disabled ? "checked" : ""}>
           <p id ="todo-${index}" class= "${item.disabled ? "disabled":""}"
           onclick="editTask(${index})">${item.text}</p>
           </div>

         `;
         p.querySelector(".todo-checkbox").addEventListener("change",() =>{
            toggleTask(index);
         });
         todolist.appendChild(p);
      });
      todocount.textContent=todo.lenght;
    }
    function toggleTask(index){
        todo[index].disabled=!todo[index].disabled;
        saveToLocalStorage();
        displayTask();
    }
    
    function deletealltask(){
      todo = [];
      saveToLocalStorage();
      displayTask();
    }

    function saveToLocalStorage(){
        localStorage.setItem("todo",JSON.stringify(todo));
    }






