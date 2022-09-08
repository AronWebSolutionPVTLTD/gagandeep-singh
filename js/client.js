const socket = io('http://localhost:3000')

const form = document.getElementById('send-continer')
const msgInp = document.getElementById('msgInp')
const msgContainor = document.querySelector(".container") 

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = msgInp.value;
    append(`you : ${message}`, 'right');
    socket.emit('send', message)
    msgInp.value =''
})


const append = (message, position) => {
    const msgele =document.createElement('div')
    msgele.innerText = message
    msgele.classList.add('message')
    msgele.classList.add(position)
    msgContainor.append(msgele)
}

const user = prompt('Enter your name to join')
socket.emit('new-user-joined', user  )

socket.on('user-joined', user => {
    append(`${user} joined a chat` ,'right')
})

socket.on('receive', data => {
    append(`${data.user} : ${data.message}`, 'left')
})

socket.on('left', user => {
    append(`${user} left the chat`, 'left')
})