import { comments } from './comments.js';
import { listEl } from './constants.js'
import { addInitLikesListeners } from './addEventListeners.js';
import { addInitQuoteListeners } from './addEventListeners.js';
import { updateComments } from './comments.js';

updateComments()

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const renderComments = () => {
    listEl.innerHTML = ''

    comments.forEach(comment => {
      comment.formattedDate = formatDate(comment.date);
  });

    comments.map((comment, index) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `<div class="comment-header">
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
            </div>`

        listEl.appendChild(commentEl)
    })
    
    addInitLikesListeners()
    addInitQuoteListeners()
}
