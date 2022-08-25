const chat = document.querySelector('.chat');
let lastMsg;
function login(button) {
    const name = document.querySelector('.login input').value;

    if(name === "") {
        alert('Digite seu nome');
        return;
    }

    const user = {
        name: name
    }

    const requisition = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    requisition.then(() => {
        axios
        .get('https://mock-api.driven.com.br/api/v6/uol/participants')
        .then((requisition) => {
            const loginScreen = button.parentNode ;
            loginScreen.classList.add('hidden');
        
            const content = loginScreen.nextElementSibling;
            content.classList.remove('hidden');

            console.log(requisition.data)
            list = requisition.data
            //chat.innerHTML = ""
            
            for(let i = 0; i < list.length; i++) {
                console.log(`${list[i].name}`);
                const date = new Date();
                const hour = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                chat.innerHTML += `
                <div class="status">
                    <p><span>(${hour}:${minutes}:${seconds}) </span><strong>${list[i].name} </strong>entra na sala...</p> 
                </div>
                `
            }

            setInterval(() => {
                axios
                .post('https://mock-api.driven.com.br/api/v6/uol/status', user)
            }, 5000);

            setInterval(() => {
                axios
                .get('https://mock-api.driven.com.br/api/v6/uol/messages')
                .then((conversation) => {
                    // console.log(conversation)
                    // console.log(conversation.data[0].from)
                    // console.log(conversation.data[0].to)
                    // console.log(conversation.data[0].text)
                    // console.log(conversation.data[0].type)
                    // console.log(conversation.data[0].time)
                    newMsg = conversation.data[0]

                    console.log(newMsg.time)
                    if (lastMsg !== newMsg.time) {
                        lastMsg = newMsg.time

                        if (newMsg.type === 'status') {
                            chat.innerHTML += `
                            <div class="status">
                                <p><span>(${newMsg.time}) </span><strong>${newMsg.from} </strong>${newMsg.text}</p> 
                            </div>
                            `
                        } else {    
                            chat.innerHTML += `
                            <div class="${newMsg.type}">
                                <p><span>(${newMsg.time}) </span><strong>${newMsg.from} </strong>para <strong>${newMsg.to} </strong>${newMsg.text}</p> 
                            </div>
                            `
                        }
                    }
                   
                    
                })
            }, 3000);

        })
    })

    requisition.catch((erro) => {
        if (erro.response.status === 400) {
            alert('Nome já em uso! Tente outro.')
        }
    })
}