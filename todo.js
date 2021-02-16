const todoForm = document.querySelector('.todoform');
const todoInput = document.querySelector('.addtodo');
const todoList = document.querySelector('.ulist');

//Tyhjä taulukko, jonne käyttäjän tieto laitetaan
let todos = [];

//Event listener submitin painamiselle
todoForm.addEventListener('submit', function(event) {
    //Älä lataa sivua uudelleen painaessa
    event.preventDefault();
    //Kutsu addTodo-funktiota ja lähetä sille käyttäjän syöttämä tieto
    addTodo(todoInput.value);
});

//addTodo-funktio
function addTodo(item) {
    //Jos syötetty tieto ei ole tyhjä
    if (item !== '') {
        //Luo olio, jossa päivämäärä ja syötetty tieto
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
    //Sitten lisää olio luotuun taulukkoon
    todos.push(todo);
    //Lähetä tiedot funktiolle toUL
    toUL(todos);
    //Tyhjennä input-laatikko
    todoInput.value = '';
    }
}

//Funktio toUL, joka asettaa syötetyt tiedot näytölle
function toUL(todos) {
    //Ensin tyhjennä lista
    todoList.innerHTML = '';
  
    //Käy läpi tiedot
    todos.forEach(function(item) {
    //Tarkasta onko todo hoidettu
    const checked = item.completed ? 'checked': null;
    //Tee <li> elementti
    const li = document.createElement('li');
    //Anna todolle luokka
    li.setAttribute('class', 'item');
    //Anna todolle datakey = päivämäärä
    li.setAttribute('data-key', item.id);
    //Jos todo on hoidettu, anna sille class "checked", jotta tyylimääritteet muuttuu
    if (item.completed === true) {
    li.classList.add('checked');
    }
  
      li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
      `;
      // finally add the <li> to the <ul>
      todoList.append(li);
    });
  }