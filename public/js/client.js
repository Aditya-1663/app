const socket=io('http://localhost:5000') 
// const socket=io() 
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')
const toadd=document.querySelector('.toadd')
const chats=document.querySelectorAll('.chats')
const my1=document.querySelector('#myid')
// const aditya=function(data){ 
//     console.log("gfx")
// }
 
var userid

var name12 =my1.innerHTML; 
// alert(".........."+name12)
chats.forEach(div => {
    div.addEventListener('click', function() {
       
        userid = div.getAttribute('key');
        const tomess=document.querySelectorAll('.message')
       
      socket.emit('clicked',userid ) 
        tomess.forEach(box => {
            box.remove();
          });
    //    tomess.remove();
        // toadd.append(messagecontainer);

        // alert('Name://'+ customDataString);
    });
    
});




// function aditya(){
//     userid=data.getAttribute("key")
//     console.log(data.getAttribute("key"))
//     console.log(data.this)
   
// }
const append=(message,positon)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(positon)
    messagecontainer.append(messageElement)
}



// let receiveid="oWqzyVh6Q-ET2EQkAAAD"
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value
    append(`You:${message}`,"right")
    socket.emit('send',message,userid,name12)
    messageinput.value=''
})

// var name1=prompt("enter your name")


 socket.emit('new_user_joined',name12) 


socket.on('user-joined',(name,id)=>{
    receiveid=id
    append(`${name} joined this chat`,"left")
})
socket.on('receive',data=>{
    if(data.name==name12 && data.name12==userid){

        // alert("dasdasjkd")
        append(`${userid}: ${data.message}`,"left")
    }
    else{
        alert(data.name+"........"+data.name12+name12)
    }
})
socket.on('leftchat',data=>{
    append(`${data.name} left the chat`,"left")
})
