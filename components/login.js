import { renderApp, appElement } from "../renders.js";
import { fetchPromise, nameInputElement } from "../main.js";
import { fetchLogin, fetchRegister } from "../api.js";

let isLoginMode = true;
export let token = null;

const setToken = (newToken) => {

  token = newToken;

}

export const renderLoginForm = () => {

  // const linkLoginElement = document.getElementById('login-link');

  // linkLoginElement.addEventListener('click', () => {

    // let isLoginMode = false;

    const formLogin = `<div id="add-form-comment" class="add-form login-form">
        <h2>Форма ${isLoginMode ? "входа" : "регистрации"}</h2>
        ${isLoginMode ? "" : `<input
        type="text"
         class="add-form-name login-form-name"
         placeholder="Введите ваше имя"
         id="input-name"
       /><br/>`}
        <input
          type="text"
           class="add-form-name login-form-name"
           placeholder="Введите ваш логин"
           id="login-input-name"
         /><br/>
         <input
         type="password"
          class="add-form-name login-form-name"
          placeholder="Введите ваш пароль"
          id="login-input-password"
        /><br/>
         <div class="add-form-row">
           <button class="add-form-button login-form-button" id="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
         </div>
         <br/>
         <a id="toggle-link" class="container-link" href="#">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>
      </div>`

    appElement.innerHTML = formLogin;

    const buttonLoginElement = document.getElementById('login-button');

    buttonLoginElement.addEventListener('click', () => {

      if (isLoginMode) {

        const loginInputElement = document.getElementById('login-input-name');
        const passwordInputElement = document.getElementById('login-input-password');
  
        if (loginInputElement.value === "") {
  
          alert("Введите логин");
          return;
  
        }
  
        if (passwordInputElement.value === "") {
  
          alert("Введите пароль");
          return;
  
        }
  
        fetchLogin(
  
          loginInputElement.value,
          passwordInputElement.value,
  
        )
        .then((user) => {
  
          setToken(`Bearer ${user.user.token}`);
          fetchPromise(renderApp);
          
          localStorage.setItem('name', `${user.user.name}`);
  
        })
        .catch((error) => {
  
          alert(error.message);
  
        });

      } else {

        const loginInputElement = document.getElementById('login-input-name');
        const passwordInputElement = document.getElementById('login-input-password');
        const nameRegisterElement = document.getElementById('input-name');

        if (loginInputElement.value === "") {
  
          alert("Введите логин");
          return;
  
        }
  
        if (passwordInputElement.value === "") {
  
          alert("Введите пароль");
          return;
  
        }

        if (nameRegisterElement === "") {

          alert("Введите имя");
          return;
          
        }

        fetchRegister(

          loginInputElement.value,
          passwordInputElement.value,
          nameRegisterElement.value,

        )
        .then((user) => {
  
          setToken(`Bearer ${user.user.token}`);
          fetchPromise(renderApp);

          localStorage.setItem('name', `${user.user.name}`);
  
        })
        .catch((error) => {
  
          alert(error.message);
  
        });

      }





      // const loginInputElement = document.getElementById('login-input-name');
      // const passwordInputElement = document.getElementById('login-input-password');

      // if (loginInputElement.value === "") {

      //   alert("Введите логин");
      //   return;

      // }

      // if (passwordInputElement.value === "") {

      //   alert("Введите пароль");
      //   return;

      // }

      // fetchLogin(

      //   loginInputElement.value,
      //   passwordInputElement.value,

      // )
      //   .then((user) => {

      //     setToken(`Bearer ${user.user.token}`);
      //     fetchPromise(renderApp);

      //   })
      //   .catch((error) => {

      //     alert(error.message);

      //   });

    });

    document.getElementById('toggle-link').addEventListener('click', () => {

      isLoginMode = !isLoginMode;

      renderLoginForm();

    });

  // });

}