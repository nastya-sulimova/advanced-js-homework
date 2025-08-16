import { renderComments } from './renderComments.js'
import { clickOnFieldName } from './addEventListeners.js'
import { clickOnFieldText } from './addEventListeners.js'
import { addButton } from './addEventListeners.js'
import { updateComments } from './comments.js'

fetch('https://wedev-api.sky.pro/api/v1/nastya-sulimova/comments').then((response) => {
    return response.json()
}).then((data) =>{
    updateComments(data.comments)
    renderComments()
})

clickOnFieldName()

clickOnFieldText()

addButton()
