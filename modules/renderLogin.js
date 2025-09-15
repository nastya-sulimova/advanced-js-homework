import { login, updateName, updateToken } from './api.js'
import { fetchAndRender } from './fetchAndRender.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    container.innerHTML = `
        <h1>Страница входа</h1>
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="text" id="password-input" class="input" placeholder="Пароль">
        </div>
        <br>
        <div class="buttons">
            <button class="button" id="login-button">Войти</button>
            <button class="button" id="reg-button">Зарегистрироваться</button>
        </div>
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
                updateName(responseData.user.name)
                fetchAndRender()
            })
            .catch((error) => {
                alert(error)
            })
    })

        regElement.addEventListener('click', renderRegistration)

}