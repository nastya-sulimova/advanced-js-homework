import { getComments } from "./api.js";
import { updateComments } from "./comments.js"
import { renderComments } from "./renderComments.js"

export const fetchAndRender = () => {
    return getComments()
    .then((response)=>{
        if (response.status === 500){
           throw new Error('Сервер сломался, попробуй позже');
       }
       return response
   })
    .then((data) =>{
        updateComments(data.comments)
        renderComments()
    }) 
    .catch((error)=>{
        alert(error.message)
        if (error instanceof TypeError) {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
    })
}