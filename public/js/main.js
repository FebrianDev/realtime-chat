const socket = io()

const form = document.getElementById('form-name')
const cardChat = document.getElementById('card-chat')
const nameValue = document.getElementById('text-name')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nameValue.value !== "") {
        socket.emit('name', nameValue.value,1)
        form.style.display = 'none'
        cardChat.style.display = 'block'
    }
})

socket.on('welcome', welcome => {
    console.log(welcome)
    const chat = document.getElementById('chat')
    const p = document.createElement('p')
    p.setAttribute('class', 'card-text m-1 text-center')
    p.innerText = `Welcome ${welcome}`
    chat.appendChild(p)
})

const formSend = document.getElementById('form-send')
formSend.addEventListener('submit', e => {
    e.preventDefault()

    const message = document.getElementById('message')
    if (message.value != null) {
        socket.emit('message', message.value, nameValue.value)
    }
})

socket.on('msg', (message, myname) => {
    const chat = document.getElementById('chat')
    if (myname === nameValue.value) {
        const p = document.createElement('h6')
        p.setAttribute('class', 'card-text m-1 text-end')
        p.innerText = `${message}`
        chat.appendChild(p)
    } else {
        const p = document.createElement('h6')
        p.setAttribute('class', 'card-text m-1 text-start')
        p.innerText = `${myname} : ${message}`
        chat.appendChild(p)
    }
})

socket.on('users', users => {
    const userOnline = document.getElementById('users-online')
    userOnline.innerText = `${users} Users Online`
})