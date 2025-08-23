import { updateComments } from "./comments.js"
import { renderComments } from "./renderComments.js"

export const fetchAndRender = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/nastya-sulimova/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) =>{
        updateComments(data.comments)
        renderComments()
    }) 
}