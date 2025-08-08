import { comments } from './comments.js';
import { listEl } from './constants.js'
import { fieldTextEl } from './constants.js'
import { addInitLikesListeners } from './addEventListeners.js';

export const renderComments = () => {
    listEl.innerHTML = ''

    comments.map((comment, index) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `<div class="comment-header">
              <div class="comment-header__name">${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.counter}</span>
                <button class="like-button ${
                    comment.isLiked ? '-active-like' : ''
                }" data-index='${index}'></button>
              </div>
            </div>`

        commentEl.addEventListener('click', () => {
            const quote = `Ответ на комментарий "${comment.text}" от ${comment.name}: \n`
            fieldTextEl.value = quote
        })
        listEl.appendChild(commentEl)
    })

    addInitLikesListeners()
}
