// import { currentDate } from "./data.js";
import format from "date-fns/format";

const host = "https://webdev-hw-api.vercel.app/api/v2/danilova-veronika/comments"

const fetchGet = () => {

    return fetch(host, {
      
        method: "GET",
      
        })
        .then((response) => {

          if (response.status === 500) {
            
            throw new Error('Сервер упал');
      
          }
      
         return response.json();
      
        });
    
};

const fetchPost = ({nameInputElement, commentTextareaElement, token}) => {

    return fetch(host, {

    method: "POST",
    body: JSON.stringify({

      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      text: commentTextareaElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: format(new Date(), "MM-dd-yyyy hh.mm.ss"),
      likes: 0,
      classLike: "like-button",
      forceError: true,

    }),
    headers: {

      Authorization: token,
      
    },

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

};

const fetchLogin = (login, password) => {

  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    
    method: "POST",
    body: JSON.stringify({

      login,
      password,
    
   }),

  })
  .then((response) => {

  if (response.status === 400) {

  throw new Error("Неверный логин или пароль");

  }

  return response.json();

  });

};

const fetchRegister = (login, password, name) => {

  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    
    method: "POST",
    body: JSON.stringify({

      login,
      password,
      name,
    
   }),

  })
  .then((response) => {

  if (response.status === 400) {

  throw new Error("Такой пользователь уже существует");

  }

  return response.json();

  });

}

export { fetchGet, fetchPost, fetchLogin, fetchRegister };