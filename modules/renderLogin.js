import { login, updateToken } from './api.js'
import { fetchAndRender } from './fetchAndRender.js'
// import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const listEl = document.querySelector('.comments')

    listEl.innerHTML = `
        <h1>Страница входа</h1>
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="text" id="password-input" class="input" placeholder="Пароль">
        </div>
        <br>
        <button class="button" id="login-button">Войти</button>
        <button class="button" id="reg-button">Зарегистрироваться</button>
        </div>
    `
    const button = document.getElementById('login-button')
    const loginElement = document.getElementById('login-input')
    const passwordElement = document.getElementById('password-input')
    const regElement = document.getElementById('reg-button')

    button.addEventListener('click', () => {
        login({
            login: loginElement.value,
            password: passwordElement.value,
        })
            .then((responseData) => {
                updateToken(responseData.user.token)
                fetchAndRender()
            })
            .catch((error) => {
                alert(error)
            })

            const regTextEl = document.querySelector('.reg-text')
            const addFormEl = document.querySelector('.add-form')

            regTextEl.style.display = ''
            addFormEl.style.display = ''
    })

        // regElement.addEventListener('click', renderRegistration)

}