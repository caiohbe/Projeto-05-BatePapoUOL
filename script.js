const chat = document.querySelector('.chat');
let lastMsg;
let to = 'Todos';

function refreshChat() {
    axios
    .get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then((requisition) => {
        const msg = requisition.data;
        const renderMsg = msg.map((thisMsg) => {
        let html;
        if (thisMsg.type === 'status') {
            html = `
            <div class="status">
                <p><span>(${thisMsg.time}) </span><strong>${thisMsg.from} </strong>${thisMsg.text}</p> 
            </div>
            `;
        } else {
            html = `
            <div class="${thisMsg.type}">
                <p><span>(${thisMsg.time}) </span><strong>${thisMsg.from} </strong>para <strong>${thisMsg.to}: </strong>${thisMsg.text}</p>
            </div>
            `;
        }
        return html;
        });
    
        if (lastMsg === renderMsg[99]) {
            return;
        } 
        lastMsg = renderMsg[99];

        chat.innerHTML = '';
        for(let i = 0; i < 100; i++) {
            chat.innerHTML += `${renderMsg[i]}`;
        }
        
        chat.lastElementChild.scrollIntoView();
    })
    .catch(() => {
        location.reload();
    })
}

function login(button) {
    const name = document.querySelector('.login input').value;

    if(name === "") {
        alert('Digite seu nome');
        return;
    }

    const body = document.querySelector('body');
    body.classList.add("gap");

    const user = {
        name: name
    }

    const requisition = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    requisition.then(() => {
        const loginScreen = button.parentNode ;
        loginScreen.classList.add('hidden');
    
        const content = loginScreen.nextElementSibling;
        content.classList.remove('hidden');

        setInterval(() => {
            axios
            .post('https://mock-api.driven.com.br/api/v6/uol/status', user);
        }, 5000); 

        setInterval(refreshChat, 3000);
    })

    requisition.catch((erro) => {
        if (erro.response.status === 400) {
            alert('Nome já em uso! Tente outro.');
        }
    })
}

function sendMsg() {
    const textInput = document.querySelector('.footer input');
    msgText = textInput.value;
    textInput.value = '';

    msgFrom = document.querySelector('.login input').value;
    msgType = "message";

    const msgObj = {
        from: msgFrom,
        to: to,
        text: msgText,
        type: msgType,
    }

    axios
    .post('https://mock-api.driven.com.br/api/v6/uol/messages', msgObj)
    .then(refreshChat);
}