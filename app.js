//Express
const express = require('express')
const app = express()

//server
const http = require('http')
const server = http.createServer(app)

//socket
const {Server} = require('socket.io')
const io = new Server(server)

//cors
const cors = require('cors')
app.use(cors())

const fs = require('fs')

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index.html')
})

let messages = []
let countUser = 0
// jika user connect ke server
io.on('connection', (socket) => {
    socket.on('name', (name) => {
        io.emit('welcome', name)

        countUser++
        io.emit('users', countUser)
    })

    socket.on('message', (message, name) => {

        messages.push(`${name} : ${message}\n`)
        io.emit('msg', message, name)
    })

    // jika user disconnect ke server
    socket.on('disconnect', () => {
        if(countUser !== 0)
            countUser--
        io.emit('users', countUser)
    })

})

server.listen(PORT, () => {
    console.log('Server running', PORT)
})

// setTimeout(()=>{
server.on('close', () => {
    messages.forEach(msg => {
        console.log(msg)
    })
    console.log('terminated')
})
 // },1000)

// setTimeout(() => {
process.on('SIGINT', () => {
    server.close(() => {
    messages.forEach(msg => {
        try {
            fs.appendFileSync(__dirname + '/data.txt', msg)
        } catch (e) {
            console.log(e.message)
        }
    })
    console.log('Server closed!')
      })
})
// }, 10000)
