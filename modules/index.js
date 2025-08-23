import { clickOnFieldName } from './addEventListeners.js'
import { clickOnFieldText } from './addEventListeners.js'
import { addButton } from './addEventListeners.js'
import { fetchAndRender } from './fetchAndRender.js'
import { listEl } from './constants.js'

listEl.innerHTML = '<p>Пожалуйста, подождите, комментарии загружаются...</p>'

fetchAndRender()

clickOnFieldName()

clickOnFieldText()

addButton()
