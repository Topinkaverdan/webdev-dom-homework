import { nameInputElement, commentTextareaElement } from "./main.js"
import { currentDate } from "./data.js";

const fetchGet = () => {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/danilova-veronika/comments", {
      
        method: "GET",
      
        })
        .then((response) => {

          if (response.status === 500) {
            
            throw new Error('Сервер упал');
      
          }
      
         return response.json();
      
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

    .then((response) => {

      if (response.status === 400) {
  
      throw new Error('Ошибка ввода');
  
      };
  
      if (response.status === 500) {
  
      throw new Error('Сервер упал');
  
      };
  
      return response.json();
  
    })

}

export { fetchGet, fetchPost };