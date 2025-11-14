const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'index.html';
}

const receiverUser = document.querySelector('#nomeReceiver');
const check = document.querySelector('.checkar');
const enviar = document.querySelector('.enviar');
const mensagem = document.querySelector('#mensagem');
const mensagemPix = document.querySelector('#mensagemPix');


let chavePix = null;

async function checkPix() {
    const chave = document.getElementById('chave').value.trim();

    if (!chave) {
        mensagem.textContent = "Preencha todos os campos para enviar o PIX!";
        mensagem.style.color = "#ff5c5c";
        return;
    }

    const data = { key: chave };

    try {
        const response = await fetch('http://localhost:3000/checkKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            mensagem.textContent = result.message || "Erro ao verificar chave PIX!";
            mensagem.style.color = "#ff5c5c";
            return;
        }

        chavePix = chave;

        receiverUser.textContent = result.nome;
        check.classList.add('hidden');
        enviar.classList.remove('hidden');
        mensagem.textContent = '';

    } catch (error) {
        console.error(error);
        mensagem.textContent = "Erro de conexão com o servidor.";
        mensagem.style.color = "#ff5c5c";
    }
}

async function enviarPix() {
    const valor = Number(document.getElementById('valor').value.trim());


    if (!valor || !chavePix) {
        mensagemPix.textContent = "Preencha o valor e verifique a chave PIX primeiro!";
        mensagemPix.style.color = "#ff5c5c";
        return;
    }

    const data = {
        chavePix: chavePix,
        valor: Number(valor)
    };

    console.log(data)

    try {
        const response = await fetch('http://localhost:3000/sendPix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            mensagem.textContent = result.message || "Erro ao enviar o PIX!";
            mensagem.style.color = "#ff5c5c";
            return;
        }

        mensagemPix.textContent = "PIX enviado com sucesso! 💸";
        mensagemPix.style.color = "#4CAF50";

        
        document.getElementById('valor').value = '';
        chavePix = null;

        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);

    } catch (error) {
        console.error(error);
        mensagemPix.textContent = "Erro de conexão com o servidor.";
        mensagemPix.style.color = "#ff5c5c";
    }
}
