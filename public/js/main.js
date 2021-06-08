const socket = io()
console.log('test')

const form = document.getElementById('form-name')
const cardChat = document.getElementById('card-chat')
const name = document.getElementById('text-name')

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    if(name.value !== ""){
        form.style.display = 'none'
        cardChat.style.display = 'block'
        socket.emit('name', name.value)
        console.log(socket.id)
    }
})

const chat = document.getElementById('chat')

socket.on('welcome', welcome =>{
    const p = document.createElement('p')
    p.setAttribute('class', 'card-text m-1 text-center')
    p.innerText = `Welcome ${welcome}`
    chat.appendChild(p)
})

const formSend = document.getElementById('form-send')
formSend.addEventListener('submit', e=>{
    e.preventDefault()

    const message = document.getElementById('message')
    if(message.value != null) {
        socket.emit('message', message.value, name.value)
    }
})

socket.on('msg', (message, myname) =>{
    if(myname === name.value){
        const p = document.createElement('h5')
        p.setAttribute('class', 'card-text m-1 text-end')
        p.innerText = `${message}`
        chat.appendChild(p)
    }else{
        const p = document.createElement('h6')
        p.setAttribute('class', 'card-text m-1 text-start')
        p.innerText = `${myname} : ${message}`
        chat.appendChild(p)
    }


})



// socket.on('my', message =>{
//     console.log(message)
// })
//
//
// socket.on('another', message =>{
//     console.log(message)
// })