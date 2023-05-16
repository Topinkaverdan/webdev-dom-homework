export const nameInputElement = document.getElementById('text-input-name');
export const commentTextareaElement = document.getElementById('text-textarea-comment');


export let users = [];

import { fetchGet } from "./api.js";
import renderComments from "./renders.js";
// import { currentDate } from "./data.js";
import format from "date-fns/format";

export const fetchPromise = (render) => {

  fetchGet()

    .then((responseData) => {

      users = responseData.comments.map((comment) => {

        return {

          name: comment.author.name,
          date: format(new Date(comment.date), "MM-dd-yyyy hh.mm.ss"),
          comment: comment.text,
          likes: comment.likes,
          classLike: "like-button",

        }

      });

      render(users, initButtonsLikeListeners, listCopyComment);

      const textLoaderElement = document.getElementById('get-loader');

      textLoaderElement.innerHTML = '';

    })
    .catch((error) => {

      if (error.message === 'Сервер упал') {

        alert('Сервер сломался, попробуйте позже.');

      } else {

        alert('Кажется, у вас сломался интернет, попробуйте позже');

      }

    });

}



fetchPromise(renderComments);


const initButtonsLikeListeners = (render) => {

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

      render(users, initButtonsLikeListeners, listCopyComment);

      const textLoaderElement = document.getElementById('get-loader');

      textLoaderElement.innerHTML = '';

    })
  }
}

const listCopyComment = (input) => {

  const listCommentElements = document.querySelectorAll('.comment');

  for (const oldComment of listCommentElements) {

    oldComment.addEventListener("click", () => {

      const index = oldComment.dataset.index;

      input.value = `> ${users[index].comment} \n ${users[index].name},`

    })

  }
}

renderComments(users, initButtonsLikeListeners, listCopyComment);