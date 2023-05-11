const listElement = document.getElementById('list-comments');
const buttonElement = document.getElementById('add-button');
export const nameInputElement = document.getElementById('text-input-name');
export const commentTextareaElement = document.getElementById('text-textarea-comment');
const textLoaderElement = document.getElementById('get-loader');
const addFormElement = document.getElementById("add-form-comment");
const commentLoaderElement = document.getElementById('comment-loader');    

export let users = [];

import { fetchGet, fetchPost } from "./api.js";
import renderComments from "./renderComments.js";

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
    
    renderComments(listElement, users, initButtonsLikeListeners, listCopyComment);

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



export function currentDate(relevantDate) {

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

      renderComments(listElement, users, initButtonsLikeListeners, listCopyComment);
      
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

renderComments(listElement, users, initButtonsLikeListeners, listCopyComment);


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

  fetchPost()
  
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

    };

    addFormElement.style.display = "flex";
    commentLoaderElement.innerHTML = "";

    nameInputElement.value = textName;
    commentTextareaElement.value = commentTextTextarea;

  });

nameInputElement.value = "";
commentTextareaElement.value = "";

});

