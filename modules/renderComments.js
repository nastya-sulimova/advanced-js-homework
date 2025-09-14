import { comments } from './comments.js'
import { addInitLikesListeners } from './addEventListeners.js'
import { addInitQuoteListeners } from './addEventListeners.js'
import { updateComments } from './comments.js'
import { renderLogin } from './renderLogin.js'
import { addButton } from './addEventListeners.js'
import { clickOnFieldName } from './addEventListeners.js'
import { clickOnFieldText } from './addEventListeners.js'
import { token } from './api.js'
import { name } from './api.js'

updateComments()

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const renderComments = () => {
 
    comments.forEach((comment) => {
        comment.formattedDate = formatDate(comment.date)
    })

    const container = document.querySelector('.container')

    const commentsHtml = comments.map((comment, index) => {

      return `
      <li class="comment" data-index='${index}'>
      <div class="comment-header">
              <div class="comment-header__name" data-name='${index}'>${comment.author.name}</div>
              <div>${comment.formattedDate}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text" data-text='${index}'>
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${
                    comment.isLiked ? '-active-like' : ''
                }" data-index='${index}'></button>
              </div>
            </div>
           </li> 
        `
    }).join('');

        

    const addCommentsHtml = `

      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value = "${name}"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>

      <p class="add-form-loader">Комментарий добавляется...</p>
    `
    const linkToLoginText = `<p class="reg-text">Для добавления комментария необходимо <button id="auth-button">авторизоваться</button></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
    ${token? addCommentsHtml : linkToLoginText}
    `
    container.innerHTML = baseHtml

    if (token) {
      addInitLikesListeners()
      addInitQuoteListeners()
      addButton()
      clickOnFieldName()
      clickOnFieldText()
    } else {
        document.getElementById('auth-button').addEventListener('click', ()=>{
          renderLogin()
        }) 
    }
    
}
