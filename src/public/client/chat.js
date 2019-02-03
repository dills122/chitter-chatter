const socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var warning = document.getElementById('warning');

btn.addEventListener('click', (event) => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', (event) => {
    socket.emit('typing', handle.value);
});



socket.on('chat', (data) => {
    feedback.innerHTML = '';
    if(data && data.message !== '') {
        output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message} </p>`;
    } else {
        EmptyMessage();
    }
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
    let timer = setTimeout(() => {
        feedback.innerHTML = '';
        clearTimeout(this);
    }, 2500);
});


function EmptyMessage() {
    warning.innerHTML = `<p><strong>Try typing something first before sending</strong></p>`;
    let timer = setTimeout(() => {
        warning.innerHTML = '';
        clearTimeout(this);
    }, 3000);    
}


