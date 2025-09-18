import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { protectData } from './protectData.js'
import { formatDate } from './renderComments.js'
import { fetchAndRender } from './fetchAndRender.js'
import { postComment } from './api.js'

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
        const fieldTextEl = document.querySelector('.add-form-text')

        const commentName = comments[name]; 
        const commentText = comments[text]; 
        const quote = `Ответ на комментарий "${commentText.text}" от ${commentName.author.name}: \n`;
        fieldTextEl.value = quote;
        })
      })
  })

export const clickOnFieldName = () => {
    const fieldNameEl = document.querySelector('.add-form-name')

    fieldNameEl.addEventListener('input', () => {
        fieldNameEl.classList.add('border-color')
    })
}

export const clickOnFieldText = () => {
    const fieldTextEl = document.querySelector('.add-form-text')

    fieldTextEl.addEventListener('input', () => {
        fieldTextEl.classList.add('border-color')
    })
}

export const addButton = () => {
    const addButtonEl = document.querySelector('.add-form-button')
    const addFormEl = document.querySelector('.add-form')
    const addFormLoader = document.querySelector('.add-form-loader')
    const fieldNameEl = document.querySelector('.add-form-name')
    const fieldTextEl = document.querySelector('.add-form-text')

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

        postComment({text: `${protectData(fieldTextEl.value)}`})
        .then((response)=>{
            if (response.status === 500){
               throw new Error('Сервер сломался, попробуй позже');
            }
            if (response.status === 400){
                throw new Error('Ошибка в запросе, попробуй еще раз');
            }
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
