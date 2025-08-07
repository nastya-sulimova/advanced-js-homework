// import { comments } from './comments.js';
import { listEl } from './constants.js'
import { protectData } from './protectData.js'
import { fieldTextEl } from './constants.js'

export const renderComments = (comments) => {
    listEl.innerHTML = ''

    comments.map((comment, index) => {
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment')

        commentEl.innerHTML = `<div class="comment-header">
              <div class="comment-header__name">${protectData(comment.name)}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${protectData(comment.text)}
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

    const likeButtonsEl = document.querySelectorAll('.like-button')

    likeButtonsEl.forEach((likebutton) => {
        likebutton.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likebutton.dataset.index
            comments[index].isLiked = !comments[index].isLiked

            comments[index].isLiked
                ? comments[index].counter++
                : comments[index].counter--

            renderComments(comments)
        })
    })
}
