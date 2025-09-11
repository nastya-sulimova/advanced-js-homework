import { fieldNameEl } from './constants.js'
import { fieldTextEl } from './constants.js'
import { addButtonEl } from './constants.js'
import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { protectData } from './protectData.js'
import { formatDate } from './renderComments.js'
import { fetchAndRender } from './fetchAndRender.js'
import { addFormEl } from './constants.js'
import { addFormLoader } from './constants.js'
import { postComment } from './api.js'
import { renderLogin } from './renderLogin.js'

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

        addFormEl.style.display = 'none';
        addFormLoader.style.display = 'block';

        if (newReview.text.length < 3 || newReview.name.length < 3){
            alert('Имя и комментарий должны быть не короче 3 символов')
            addFormEl.style.display = '';
            addFormLoader.style.display = 'none';
            return
        }

        postComment()
        .then((response)=>{
            if (response.status === 500){
               throw new Error('Сервер сломался, попробуй позже');
            }
            if (response.status === 400){
                throw new Error('Ошибка в запросе, попробуй еще раз');
            }
        //    return response.json()
           return response
       })
        .then(() => {
            comments.forEach(comment => {
                comment.formattedDate = formatDate(comment.date);
            });
            return fetchAndRender();
        })
        .then(()=>{
            fieldNameEl.classList.remove('border-color')
            fieldTextEl.classList.remove('border-color')
            fieldNameEl.value = ''
            fieldTextEl.value = ''
        })
        .then(()=>{
            addFormEl.style.display = '';
            addFormLoader.style.display = 'none';
        })
        .catch((error)=>{
            if (error.message === 'Сервер сломался, попробуй позже') {
                alert('Сервер сломался, попробуй позже')
                addFormEl.style.display = '';
                addFormLoader.style.display = 'none';
            } 
            if (error.message === 'Ошибка в запросе, попробуй еще раз') {
                alert('Ошибка в запросе, попробуй еще раз')
                addFormEl.style.display = '';
                addFormLoader.style.display = 'none';
            } 
            if (error instanceof TypeError) {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                addFormEl.style.display = '';
                addFormLoader.style.display = 'none';
            }
        })
    })
}

const regElement = document.getElementById('reg-button')
regElement.addEventListener('click', ()=>{
    const regTextEl = document.querySelector('.reg-text')
    const addFormEl = document.querySelector('.add-form')

    regTextEl.style.display = 'none'
    addFormEl.style.display = 'none'
    renderLogin()
    
})
