class Chatbox {
    constructor() {
    this.args = {
    openButton : document.querySelector('.chatbox__button'),
    chatBox : document.querySelector('.chatbox__support'),
    sendButton : document.querySelector('.send__button'),
    }
    this.state = false;
    this.messages = [];
    }

    display(){
        const {openButton,chatBox,sendButton} = this.args;
        openButton.addEventListener('click', ()=> this.toggleState(chatBox))
        sendButton.addEventListener('click', ()=> this.onSendButton(chatBox))
        const node = chatBox.querySelector('input');
        console.log(node)
        node.addEventListener("keyup",({key}) =>{
        if(key == "Enter"){
            this.onSendButton(chatBox)
        }
        })
    }


    toggleState(chatbox){
   // console.log("click")
    this.state = !this.state;
    //console.log(this.state)
    if(this.state){
        chatbox.classList.add('chatbox--active')
    }
    else{
        chatbox.classList.remove('chatbox--active')

    }
    }

    onSendButton(chatbox){
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if(text1 === ""){
        return;
        }
        let msg1 = {name: "User" , message: text1 }
        this.messages.push(msg1);
        fetch($SCRIPT_ROOT + '/predict' , {
        method: 'POST',
        body : JSON.stringify({message:text1}),
        mode : 'cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {name: "Sam" , message: r.answer, category:r.category, similar:r.similar};
            this.messages.push(msg2);
            this.addMessage(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error)=>{
        console.error('Error:',error);
        this.updateChatText(chatbox)
        textField.value = ''
        });
    }

     addMessage(message) {
  const chatBox = document.getElementById("chatbox__messages");
  const isScrolledToBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;

  // Add the new message to the chat box
  chatBox.innerHTML += `<div>${message}</div>`;

  // If the scroll bar was at the bottom, keep it at the bottom; otherwise, preserve the current scroll position
  if (isScrolledToBottom) {
    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
  }
}

     myFunctions(event){
     console.log(event.target.innerHTML)
     const {openButton,chatBox,sendButton} = this.args;
     const node = chatBox.querySelector('input');
     node.value=event.target.innerHTML
this.onSendButton(chatBox)
     }

    updateChatText(chatbox){
    var html = '';
    this.messages.slice().reverse().forEach(function(item,index){
        if(item.name === "Sam"){
            html += '<div value="${item.similar[1]}" onclick="chatbox.myFunctions(event)" class="messages__item similar">' + item.similar[1] + '</div>' +
             '<div value="${item.similar[2]}" onclick="chatbox.myFunctions(event)" class="messages__item similar">' + item.similar[2] + '</div>'+
             '<p class="related">Related: </p>'+
            '<div class="messages__item messages__item--visitor">' + item.message +
            '<p class="category"> category: ' + item.category
             +'</p>' +'</div>'

        }
        else{
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
        }
    });
    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;

    }

}
const chatbox = new Chatbox();
chatbox.display()