function login(button) {
    const name = document.querySelector('.login input').value;

    if(name === "") {
        alert('Digite seu nome');
        return;
    }

    const user = {
        name: name
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
    promessa.then(() => {
        axios
        .get('https://mock-api.driven.com.br/api/v6/uol/participants')
        .then((promessa) => {
            const loginScreen = button.parentNode ;
            loginScreen.classList.add('hidden');
        
            const content = loginScreen.nextElementSibling;
            content.classList.remove('hidden');

            console.log(promessa.data)
            list = promessa.data
            const chat = document.querySelector('.chat');
            //chat.innerHTML = ""
            
            for(let i = 0; i < list.length; i++) {
                console.log(`${list[i].name}`)
                const date = new Date()
                const hour = date.getHours()
                const minutes = date.getMinutes()
                const seconds = date.getSeconds()

                chat.innerHTML += `
                <div class="joined">
                    <p><span>(${hour}:${minutes}:${seconds}) </span><strong>${list[i].name} </strong>entrou na sala...</p> 
                </div>
                `
            }
        })
    })

    promessa.catch((erro) => {
        if (erro.response.status === 400) {
            alert('Nome já em uso! Tente outro.')
        }
    })
}