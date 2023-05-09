const listElement = document.getElementById('list-comments');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('text-input-name');
const commentTextareaElement = document.getElementById('text-textarea-comment');
const textLoaderElement = document.getElementById('get-loader');
const addFormElement = document.getElementById("add-form-comment");
const commentLoaderElement = document.getElementById('comment-loader');    

let users = [];

import fetchGet from "./api.js";

const fetchPromise = () => {
  
  fetchGet()
  
  .then((response) => {

    if (response.status === 500) {
      
      throw new Error('Сервер упал');

    }

   return response.json();

  })

  .then((responseData) => {

    textLoaderElement.innerHTML = '';
    users = responseData.comments.map((comment) => {

      return {

        name: comment.author.name,
        date: currentDate(new Date(comment.date)),
        comment: comment.text,
        likes: comment.likes,
        classLike: "like-button",

      }

    });

    commentLoaderElement.innerHTML = "";

    addFormElement.style.display = "flex";
    
    renderComments();

    })
    .catch((error) => {
      if (error.message === 'Сервер упал') {

        alert('Сервер сломался, попробуйте позже.');
        
      } else {

        alert('Кажется, у вас сломался интернет, попробуйте позже');
        
      }
      
    });

} 



fetchPromise();



function currentDate(relevantDate) {

const date = relevantDate;
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear() % 100;
let hours = date.getHours();
let minutes = date.getMinutes();

if (day < 10) day = "0" + day;

if (month < 10) month = "0" + month;

if (year < 10) year = "0" + year;

if (hours < 10) hours = "0" + hours;

if (minutes < 10) minutes = "0" + minutes;

let newDate = day + "." + month + "." + year + " " + hours + ":" + minutes;

return newDate;

}

const initButtonsLikeListeners = () => {

  const buttonsLikeElements = document.querySelectorAll('#button-user-like');

  for (const buttonLikeElement of buttonsLikeElements) {

    buttonLikeElement.addEventListener("click", (event) => {

      event.stopPropagation();

      const index = buttonLikeElement.dataset.index;

      if (users[index].classLike === "like-button") {

        users[index].classLike = "like-button -active-like";
        users[index].likes += 1;

      } else {

        users[index].classLike = "like-button";
        users[index].likes -= 1;
        
      }

      renderComments();
      
    })
  }
}

const listCopyComment = () => {

  const listCommentElements = document.querySelectorAll('.comment');

  for (const oldComment of listCommentElements) {

    oldComment.addEventListener("click", () => {

      const index = oldComment.dataset.index;

      commentTextareaElement.value = `> ${users[index].comment} \n ${users[index].name},`

    })
    
  }
}

const renderComments = () => {

  const usersHtml = users.map((user, index) => {

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

  listElement.innerHTML = usersHtml;
  
  initButtonsLikeListeners();
  listCopyComment();
}

renderComments();


buttonElement.addEventListener('click', () => {

  const textName = nameInputElement.value;
  const commentTextTextarea = commentTextareaElement.value;

  commentLoaderElement.innerHTML = "Комментарий добавляется..."
  
  addFormElement.style.display = "none";

  nameInputElement.classList.remove("error");
  commentTextareaElement.classList.remove("error");

  if (nameInputElement.value === "" && commentTextareaElement.value === "") {

    nameInputElement.classList.add("error");
    commentTextareaElement.classList.add("error");
    return;

  }

  if (nameInputElement.value === "") {

    nameInputElement.classList.add("error");
    return;

  }

  if (commentTextareaElement.value === "") {
    
    commentTextareaElement.classList.add("error");
    return;

  }

  fetch("https://webdev-hw-api.vercel.app/api/v1/danilova-veronika/comments", {

    method: "POST",
    body: JSON.stringify({

      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      text: commentTextareaElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: currentDate(new Date()),
      likes: 0,
      classLike: "like-button",
      forceError: true,

    })

    })
    .then((response) => {

     if (response.status === 400) {

      throw new Error('Ошибка ввода');

     };

     if (response.status === 500) {

      throw new Error('Сервер упал');

     };

     return response.json();

    })
    .then (() => {
      
      fetchPromise();

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

      }

      addFormElement.style.display = "flex";
      commentLoaderElement.innerHTML = "";

      nameInputElement.value = textName;
      commentTextareaElement.value = commentTextTextarea;

    });

nameInputElement.value = "";
commentTextareaElement.value = "";

})