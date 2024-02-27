var socket = io();
let userName = "";
const btn1 = document.getElementById("join-chat");
const userNameForm = document.getElementsByTagName("form")[0];
const chatroomContainer = document.getElementsByClassName("chatroom-container")[0];
let usernameInput = document.getElementById("username-input");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("send-button");
const messageContainer = document.querySelector('.messages');
btn1.addEventListener("click", (event)=>{
    event.preventDefault();
    userName = usernameInput.value;
    console.log(userName);
    if(userName){
    userNameForm.style.display = "none";
    chatroomContainer.style.display = "block";
    }
})

sendBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    let data = {
        id: socket.id,
        username: userName,
        message: messageInput.value

    };
    socket.emit("chat message", data);
    appendMessage(data, "sent");
});

socket.on("chat message", (data) => {
    if(data.id !== socket.id){
        appendMessage(data, "received");
    }
  });

function appendMessage(data, type){
    var msgDiv = document.createElement("div");
    msgDiv.innerText=`${data.username} : ${data.message}`;
    if(type==="sent"){
    msgDiv.setAttribute("class", "message sent");
    }
    else{
        msgDiv.setAttribute("class", "message");   
    }
    messageContainer.append(msgDiv);
    messageInput.value="";
};
