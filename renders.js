import { fetchPromise } from "./main.js";
import { fetchPost } from "./api.js";
import { renderLoginForm } from "./components/login.js";
import { token } from "./components/login.js";

export const appElement = document.getElementById('app');

export const renderApp = (userArray, like, copy) => {
  
  const usersHtml = userArray.map((user, index) => {

    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${user.name}</div>
        <div>${user.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
           ${user.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.likes}</span>
           <button id="button-user-like" class="${user.classLike}" data-index="${index}"></button>
        </div>
      </div>
     </li>`;
  })
  .join("");

  appElement.innerHTML = `<p id="get-loader">Пожалуйста подождите, загружаю комментарии...</p>
  <ul class="comments" id="list-comments">${usersHtml}</ul>
      <p id="comment-loader"></p>
      <div id="add-form-comment" class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="text-input-name"
          disabled
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="text-textarea-comment"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-button">Написать</button>
        </div>
      </div>`;

  const buttonElement = document.getElementById('add-button');
  const nameInputElement = document.getElementById('text-input-name');
  const commentTextareaElement = document.getElementById('text-textarea-comment');
  const addFormElement = document.getElementById("add-form-comment");
  const commentLoaderElement = document.getElementById('comment-loader'); 

  like(renderApp);
  copy(commentTextareaElement); 
  
  nameInputElement.value = localStorage.getItem('name');

  buttonElement.addEventListener('click', () => {

      const textName = nameInputElement.value;
      const commentTextTextarea = commentTextareaElement.value;
    
      commentLoaderElement.innerHTML = "Комментарий добавляется..."
      
      addFormElement.style.display = "none";
    
      nameInputElement.classList.remove("error");
      commentTextareaElement.classList.remove("error");
    
      fetchPost({nameInputElement, commentTextareaElement, token})
    
      .then (() => {
          
        fetchPromise(renderApp);
    
      })
      .catch ((error) => {
    
        if (error.message === 'Ошибка ввода') {
    
          alert('Имя пользователя и текст комментария должны содержать не менее трех символов');
          console.warn(error);
    
          nameInputElement.classList.add("error");
          commentTextareaElement.classList.add("error");
    
        } else if (error.message === 'Сервер упал') {
    
          alert('Сервер сломался, попробуйте позже.');
          console.warn(error);
            
        } else {
    
          alert('Кажется, у вас сломался интернет, попробуйте позже');
    
        };
    
        addFormElement.style.display = "flex";
        commentLoaderElement.innerHTML = "";
    
        nameInputElement.value = textName;
        commentTextareaElement.value = commentTextTextarea;
    
      });
    
    commentTextareaElement.value = "";
    
    });
}

const renderComments = (userArray, like, copy) => {


  const usersHtml = userArray.map((user, index) => {

    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${user.name}</div>
        <div>${user.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
           ${user.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.likes}</span>
           <button id="button-user-like" class="${user.classLike}" data-index="${index}"></button>
        </div>
      </div>
     </li>`;
  })
  .join("")

  appElement.innerHTML = `<p id="get-loader">Пожалуйста подождите, загружаю комментарии...</p>
  <ul class="comments" id="list-comments">${usersHtml}</ul>
  <p>Чтобы добавить комментарий, <a id="login-link" class="container-link" href="#">авторизуйтесь</a></p>`;

  const linkLoginElement = document.getElementById('login-link');

  linkLoginElement.addEventListener("click", () => {

    renderLoginForm();

  });

  // renderLoginForm();
    
}

export default renderComments;