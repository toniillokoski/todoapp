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
    //Lähetä tiedot funktiolle addStorage
    addStorage(todos);
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
          <input  type="checkbox" 
                  class="option-input checkbox" 
                  ${checked}>
          <div class="itemName">${item.name}</div>
          <button class="delete-button">✘</button>
        `;
        //Lisää
        todoList.append(li);
      });

      let count1 = todos.filter(function(s) { return s.completed; }).length;

      document.getElementById('total').innerHTML = todos.length;
      document.getElementById('done').innerHTML = count1;
      document.getElementById('remaining').innerHTML = todos.length - count1;;
    }
  

//Funktio jolla lisätä todot local storageen
function addStorage(todos) {
    //Muuta taulukko merkkijonoksi että sen voi asettaa local storageen
    localStorage.setItem('todos', JSON.stringify(todos));
    //Renderöi uudelleen näytölle
    toUL(todos);
}

//Funktio jolla kaivetaan tallennetut tiedot local storagesta
function getStorage() {
    const reference = localStorage.getItem('todos');
    //Jos reference saa tietoja
    if (reference) {
      //Muuta tiedot taulukoksi ja aseta ne todosiin
      todos = JSON.parse(reference);
      toUL(todos);
    }
}

//Kutsu getStorage-funktiota
getStorage();

//Lisätään event listener todon checkboxiin
todoList.addEventListener('click', function(event) {
    //Tarkistetaan onko todo checkattu
    if (event.target.type === 'checkbox') {
      //Jos on, muuta tieto toggle-funktiolla
      toggle(event.target.parentElement.getAttribute('data-key'));
    }
  
    //Event listener poistonappiin
    if (event.target.classList.contains('delete-button')) {
      //Jos painetaan --> deleteTodo-funktio
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

//Toggle-funktio jolla muutetaan todon completed
function toggle(id) {
    todos.forEach(function(item) {
        // Verrataan todon id:tä
        if (item.id == id) {
        //Muuta completed arvo
        item.completed = !item.completed;
      }
    });

    //Päivitä tiedot addStoragella
    addStorage(todos);
  }
  
//Poista tieto local storagesta
  function deleteTodo(id) {
    todos = todos.filter(function(item) {
      return item.id != id;
    });
  
    //Päivitä tiedot addStoragella
    addStorage(todos);
  }

//Funktio darkmoden vaihtamiselle
function toggleClass() {
  const body = document.querySelector('body');
  body.classList.toggle('light');
}