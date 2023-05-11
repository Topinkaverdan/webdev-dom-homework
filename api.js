import {nameInputElement, commentTextareaElement, currentDate} from "./main.js"

const fetchGet = () => {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/danilova-veronika/comments", {
      
        method: "GET",
      
        });
    

}

const fetchPost = () => {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/danilova-veronika/comments", {

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

}

export { fetchGet, fetchPost };