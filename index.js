var listTodos = document.querySelector('#container ul')
var btnAddTodo = document.getElementById('btnAddTodo')
var inputTextTodo = document.getElementById('inputTextTodo')
var btnFilter = document.getElementById('btnFilter')
var divBtnFilter = document.getElementById('divBtnFilter')
var btnFilterAll = document.getElementById('btnFilterAll')
var btnFilterActive = document.getElementById('btnFilterActive')
var btnFilterCompleted = document.getElementById('btnFilterCompleted')


var todos = JSON.parse(localStorage.getItem('list_todos')) || [{}]

function renderTodos() {
    listTodos.innerHTML = ''
    for (todo of todos) {
        var todoCheckbox = document.createElement('input')
        var todoElement = document.createElement('li')
        var todoText = document.createElement('input')
        var bntDeleteTodo = document.createElement('input')
        var bntSaveTodo = document.createElement('input')
        var pos = todos.indexOf(todo)
        todoCheckbox.setAttribute('type', 'checkbox')
        bntDeleteTodo.setAttribute('onclick', 'deleteTodo(' + pos + ')')
        bntDeleteTodo.setAttribute('type', 'button')
        bntDeleteTodo.setAttribute('value', 'Delete')
        bntDeleteTodo.setAttribute('class', 'btnDelete')
        bntSaveTodo.setAttribute('onclick', 'saveTodo(' + pos + ')')
        bntSaveTodo.setAttribute('type', 'button')
        bntSaveTodo.setAttribute('value', 'Save')
        bntSaveTodo.setAttribute('class', 'btnSave')
        todoText.setAttribute('onkeyup', 'pressEnterToSaveTodo(event, ' + pos + ')')
        todoText.setAttribute('value', todo.text)
        todoText.setAttribute('type', 'text')
        todoText.setAttribute('class', 'todoText')
        todoCheckbox.setAttribute('onclick', 'completed(' + pos + ')')
        todoElement.appendChild(todoCheckbox)
        todoElement.appendChild(todoText)
        todoElement.appendChild(bntSaveTodo)
        todoElement.appendChild(bntDeleteTodo)
        listTodos.appendChild(todoElement)
        if (todo.completed)
            todoCheckbox.checked = true
    }
    if (btnFilterAll.classList.contains('selected'))
        showAll()
    else if (btnFilterActive.classList.contains('selected'))
        showActive()
    else if (btnFilterCompleted.classList.contains('selected'))
        showCompleted()
}

renderTodos()

btnAddTodo.addEventListener("click", addTodo)
inputTextTodo.addEventListener("keypress", (event) => {
    if (event.key == "Enter")
        addTodo()
})
btnFilter.addEventListener("click", () => {
    btnFilter.classList.toggle('selected')
    if (divBtnFilter.style.display == 'inline-grid')
        divBtnFilter.style.display = 'none'
    else divBtnFilter.style.display = 'inline-grid'
})
btnFilterAll.addEventListener('click', () => {
    btnFilterAll.classList.add('selected')
    btnFilterActive.classList.remove('selected')
    btnFilterCompleted.classList.remove('selected')
    showAll()
})
btnFilterActive.addEventListener('click', () => {
    btnFilterActive.classList.add('selected')
    btnFilterAll.classList.remove('selected')
    btnFilterCompleted.classList.remove('selected')
    showActive()
})
btnFilterCompleted.addEventListener('click', () => {
    btnFilterCompleted.classList.add('selected')
    btnFilterAll.classList.remove('selected')
    btnFilterActive.classList.remove('selected')
    showCompleted()
})

function showAll() {
    for (todo of todos) {
        var pos = todos.indexOf(todo)
        var todoElement = document.querySelectorAll('li')[pos]
        todoElement.style.display = 'flex'
    }
}

function showActive() {
    for (todo of todos) {
        var pos = todos.indexOf(todo)
        var todoCheckbox = document.querySelectorAll('[type=checkbox]')[pos]
        var todoElement = document.querySelectorAll('li')[pos]
        if (todoCheckbox.checked == false)
            todoElement.style.display = 'flex'
        else todoElement.style.display = 'none'
    }
}

function showCompleted() {
    for (todo of todos) {
        var pos = todos.indexOf(todo)
        var todoCheckbox = document.querySelectorAll('[type=checkbox]')[pos]
        var todoElement = document.querySelectorAll('li')[pos]
        if (todoCheckbox.checked == true)
            todoElement.style.display = 'flex'
        else todoElement.style.display = 'none'
    }
}

function pressEnterToSaveTodo(event, pos) {
    if (event.key == "Enter")
        saveTodo(pos)
}

function addTodo() {
    var todo = {
        text: inputTextTodo.value,
        completed: false
    }
    todos.push(todo)
    inputTextTodo.value = ''
    inputTextTodo.focus()
    renderTodos()
    saveToStorage()
}

function deleteTodo(pos) {
    todos.splice(pos, 1)
    renderTodos()
    saveToStorage()
}

function saveTodo(pos) {
    var todoTexto = document.querySelectorAll('ul li input[type=text]')
    var bntSaveTodo = document.querySelectorAll('ul li input.btnSave')
    todos[pos].text = todoTexto[pos].value
    todoTexto[pos].blur()
    bntSaveTodo[pos].blur()
    saveToStorage()
}

function completed(pos) {
    var todoCheckbox = document.querySelectorAll('ul li input[type=checkbox]')[pos]
    todos[pos].completed = todoCheckbox.checked
    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos))
}
