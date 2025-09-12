import { registration } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const listEl = document.querySelector('.comments')

    listEl.innerHTML = `
        <h1>Страница регистрации</h1>
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="text" id="name-input" class="input" placeholder="Имя">
            <input type="text" id="password-input" class="input" placeholder="Пароль">
        </div>
        <br>
        <button class="button" id="login-button">Зарегистрироваться</button>
        </div>
    `

    const button = document.getElementById('login-button')
    const loginEl = document.getElementById('login-input')
    const nameEl = document.getElementById('name-input')
    const passwordEl = document.getElementById('password-input')

    button.addEventListener('click', () => {
        registration({
            login: loginEl.value,
            password: passwordEl.value,
            name: nameEl.value,
        })
            .then(() => {
                renderLogin()
            })
            .catch((error) => {
                console.error('Произошла ошибка:', error)
            })

            const regTextEl = document.querySelector('.reg-text')
            const addFormEl = document.querySelector('.add-form')

            regTextEl.style.display = ''
            addFormEl.style.display = ''
    })
}
