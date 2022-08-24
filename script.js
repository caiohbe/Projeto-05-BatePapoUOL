function login(button) {
    const name = document.querySelector('.login input').value;

    if(name === "") {
        alert('Digite seu nome');
        return;
    }

    const loginScreen = button.parentNode ;
    loginScreen.classList.add('hidden');

    const content = loginScreen.nextElementSibling;
    content.classList.remove('hidden');

    const user = {
        name: name
    }

    axios
    .post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
    .then(() => {
        axios
        .get('https://mock-api.driven.com.br/api/v6/uol/participants')
        .then((promessa) => {
            console.log(promessa.data)
            list = promessa.data
            const chat = document.querySelector('.chat');

            for(let i = 0; i < list.length; i++) {
                console.log(`${list[i].name}`)
                chat.innerHTML += `
                <div class="joined">
                    <p><span>(09:21:45) </span><strong>${list[i].name} </strong>entrou na sala...</p> 
                </div>
                `
            }
        })
    })
}