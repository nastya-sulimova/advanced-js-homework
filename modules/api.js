const host = 'https://wedev-api.sky.pro/api/v2/nastya-sulimova/comments'

export let token = ''

export const updateToken = (newToken) => {
    token = newToken
}

export let name = ''

export const updateName = (newName) => {
    name = newName
}

const authToken = 'https://wedev-api.sky.pro/api/user'

export function getComments() {
    return fetch(host, {
        method: 'GET',
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    }).then((response) => {
        return response.json()
    })
}

export function deleteComment({ id }) {
    return fetch(`${host}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json()
    })
}

export function postComment({text}) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({text}),
    }).then((response) => {
        return response.json()
    })
}

export function login({ login, password }) {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('вы ввели неверный логин или пароль, попробуйте еще раз')
        }
        return response.json()
    })
}

export function registration({ login, name, password }) {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({ login, name, password }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('вы ввели что-то не то')
        }
        return response.json()
    })
}
