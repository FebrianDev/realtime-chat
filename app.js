//Express
const express = require('express')
const app = express()

//server
const http = require('http')
const server = http.createServer(app)

//socket
const {Server} = require('socket.io')
const io = new Server(server)

const PORT = process.env.PORT

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.render('index.html')
})

let users = []

// jika user connect ke server
io.on('connection', (socket) => {
    socket.on('name', (name) =>{
        //console.log(socket.id)
        io.emit('welcome', name)
        users.push(name)
    })

    socket.on('message', (message, myName) =>{
       users.forEach(user => {
           if(user === myName){
               io.emit('msg', message, myName)
           }
       })
    })
});



// jika user disconnect ke server
io.on('disconnect', socket => {

})

server.listen(PORT, () => {
    console.log('Server running', PORT)
})