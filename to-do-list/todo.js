
window.onload = function() {

// the following code adds event listeners to the buttons
// you'll learn more about this later
// for this exercise, you are going to write the functions for
// what happens when the user clicks on the buttons.
  var saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', addToDoItem, false);

  var doneButton = document.getElementById('done-button');
  doneButton.addEventListener('click', markAsDone, false);


  function addToDoItem() {
    // add your code here
    // this should create a new list item in the to-do list
    // and set the text as the input from the todo-input field
    var boxInput = document.getElementById('todo-input');
    var inputField = boxInput.value;
    var newItem = document.createElement('li');
    newItem.textContent = inputField;
    var listToDo = document.querySelector('.todo-list-items');
    listToDo.appendChild(newItem);
    boxInput.value = '';
  }

  function markAsDone() {
    var doneItem = document.querySelector('.todo-list-items li:nth-of-type(1)');
    var listToDone = document.getElementsByClassName('done-list-items')[0];
    listToDone.appendChild(doneItem);
    doneItem.classList.add('done');

    doneButton.classList.add('liked');
    doneButton.innerHTML = "Liked!";
    document.querySelector('h1').style.color = "red";
  }
  
}
