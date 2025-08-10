import { comments } from './comments.js';
import { listEl } from './constants.js'
import { addInitLikesListeners } from './addEventListeners.js';
import { addInitQuoteListeners } from './addEventListeners.js';

export const renderComments = () => {
    listEl.innerHTML = ''

    comments.map((comment, index) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `<div class="comment-header">
              <div class="comment-header__name" data-name='${index}'>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text" data-text='${index}'>
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

        listEl.appendChild(commentEl)
    })
    
    addInitLikesListeners()
    addInitQuoteListeners()
}
