const appElement = document.getElementById('app');

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

  linkLoginElement.addEventListener('click', () => {

    const formLogin = `<div id="add-form-comment" class="add-form login-form">
        <h2>Форма входа</h2>
        <input
          type="text"
           class="add-form-name login-form-name"
           placeholder="Введите ваш логин"
           id="login-input-name"
         />
         <br/>
         <input
         type="password"
          class="add-form-name login-form-name"
          placeholder="Введите ваш пароль"
          id="login-input-password"
        />
         <div class="add-form-row">
           <button class="add-form-button login-form-button" id="login-button">Войти</button>
         </div>
      </div>`
      
    appElement.innerHTML = formLogin;
      
  });
    
}

export default renderComments;