import { fieldNameEl } from './constants.js'
import { fieldTextEl } from './constants.js'
import { addButtonEl } from './constants.js'
import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

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

        const date = new Date()
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear()).slice(-2)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        const newReview = {
            name: fieldNameEl.value,
            date: `${day}.${month}.${year} ${hours}:${minutes}`,
            text: fieldTextEl.value,
            counter: 0,
            isLiked: false,
        }

        comments.push(newReview)

        renderComments(comments)

        fieldNameEl.classList.remove('border-color')
        fieldTextEl.classList.remove('border-color')
        fieldNameEl.value = ''
        fieldTextEl.value = ''
    })
}
