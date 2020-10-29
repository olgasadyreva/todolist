const ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  
  
  //Создание переменных
  const listTodosElem = document.querySelector('.js-listTodo');
  const inputNameElem = document.querySelector('.js-addNameTodo');
  const inputDescrElem = document.querySelector('.js-addDescrTodo');
  const formAddTodoElem = document.querySelector('.js-createNewTodo');
  const messageEmptyListElem = document.querySelector('.js-emptyListElem'); 

  messageEmptyListElem.style.display = 'block'; 
    
//Вызов функций
  formAddTodoElem.addEventListener('submit', onFormSubmit);
  listTodosElem.addEventListener('click', onBtnDeleteTodoClick);
  listTodosElem.addEventListener('click', onBtnHideDescrClick);
  

//Функция добаления нового дела
  function onFormSubmit(event) {
    event.preventDefault();
    
    const todoItemName = inputNameElem.value;
    const todoItemDescr = inputDescrElem.value;
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;

    messageEmptyListElem.style.display = 'none';

    listTodosElem.insertAdjacentHTML('beforeend', `
      <li class="todo-item js-todoItem">
        <article class="item-wrap">
          <header class="item-header">
            <h3 class="item-title">${todoItemName}</h3>
           <button class="button delete-todo js-deleteTodo" aria-label="Удалить дело"></button>
           <button class="button hide-todo js-hideDescr" aria-expanded="true" aria-controls="${id}" aria-label="Свернуть описание дела"></button>
          </header>
        <p id="${id}" class="item-descr js-descrItem">${todoItemDescr}</p>
        </article>
      </li>`
      ); 

    formAddTodoElem.reset();

  }  
   

//Функция удаление дела       
  function onBtnDeleteTodoClick(event) {
    let target = event.target;
    
    if (target.classList.contains('js-deleteTodo')) {     
      target.closest('li').remove();
    }    

    if(!listTodosElem.children.length) {
      messageEmptyListElem.style.display = 'block';   
    }
  };


  //Функция сворачивания/разворачивания описание дела   
  function onBtnHideDescrClick(event) {
    let target = event.target;    
    
    if (target.classList.contains('js-hideDescr')) {   
  
      target.classList.toggle('rotate');
      target.closest('article').querySelector('.js-descrItem').classList.toggle('hide-descr');
      
      const valAttrExpanded = target.getAttribute('aria-expanded');

      if (valAttrExpanded == 'true') {    
        target.setAttribute('aria-label', 'Развернуть описание дела');
        target.setAttribute ('aria-expanded', 'false');           
      }

      if (valAttrExpanded == 'false') {      
        target.setAttribute('aria-label', 'Свернуть описание дела');
        target.setAttribute ('aria-expanded', 'true');
      }
    }
  }; 

  
});
    
  


   



