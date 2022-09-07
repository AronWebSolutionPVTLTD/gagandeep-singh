const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', user =>{
        console.log('new user', user);
        users[socket.id] = user;
       
        socket.broadcast.emit('user-joined', user)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message : message , user :users[socket.id]})
    })
})

socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
})