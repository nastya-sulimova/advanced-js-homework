import { fieldNameEl } from './constants.js'
import { fieldTextEl } from './constants.js'
import { addButtonEl } from './constants.js'
import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { protectData } from './protectData.js'
import { updateComments } from './comments.js'
import { formatDate } from './renderComments.js'

export const addInitLikesListeners = () => {
    const likeButtonsEl = document.querySelectorAll('.like-button')

    likeButtonsEl.forEach((likebutton) => {
        likebutton.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likebutton.dataset.index
            comments[index].isLiked = !comments[index].isLiked

            comments[index].isLiked
                ? comments[index].likes++
                : comments[index].likes--

            renderComments(comments)
        })
    })
}

export const addInitQuoteListeners = (()=>{
    const commentClickedEl = document.querySelectorAll('.comment');

    commentClickedEl.forEach((commentclicked) => {
      commentclicked.addEventListener('click', () => {
        const name = commentclicked.querySelector('.comment-header__name').dataset.name
        const text = commentclicked.querySelector('.comment-text').dataset.text

        const commentName = comments[name]; 
        const commentText = comments[text]; 
        const quote = `Ответ на комментарий "${commentText.text}" от ${commentName.author.name}: \n`;
        fieldTextEl.value = quote;
        })
      })
  })

export const clickOnFieldName = () => {
    fieldNameEl.addEventListener('input', () => {
        fieldNameEl.classList.add('border-color')
    })
}

export const clickOnFieldText = () => {
    fieldTextEl.addEventListener('input', () => {
        fieldTextEl.classList.add('border-color')
    })
}

export const addButton = () => {
    addButtonEl.addEventListener('click', () => {
        if (fieldNameEl.value === '' || fieldTextEl.value === '') {
            fieldNameEl.classList.add('error') ||
                fieldTextEl.classList.add('error')
            return
        }

        fieldNameEl.classList.remove('error') ||
            fieldTextEl.classList.remove('error')

        const newReview = { 
            text: `${protectData(fieldTextEl.value)}`, 
            name: `${protectData(fieldNameEl.value)}` 
        }

        fetch('https://wedev-api.sky.pro/api/v1/nastya-sulimova/comments',{
            method: 'POST',
            body: JSON.stringify(newReview),
        }).then(() => {
            return fetch('https://wedev-api.sky.pro/api/v1/nastya-sulimova/comments');
        })
        .then((response) => response.json())
        .then((data) => {
            updateComments(data.comments);

            comments.forEach(comment => {
                comment.formattedDate = formatDate(comment.date);
            });
            
            renderComments(data.comments);
        })

        fieldNameEl.classList.remove('border-color')
        fieldTextEl.classList.remove('border-color')
        fieldNameEl.value = ''
        fieldTextEl.value = ''
    })
}
