const wrapper = document.getElementById('wrapper');
const container = document.getElementById('container');
const toCadastro = document.getElementById('toCadastro');
const toLogin = document.getElementById('toLogin');
const mensagemLogin = document.querySelector('#mensagemLogin');
const mensagemCadastro = document.querySelector('#mensagemCadastro');

toCadastro.addEventListener('click', () => {
    container.classList.add('show-cadastro');
});

toLogin.addEventListener('click', () => {
    container.classList.remove('show-cadastro');
});



document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        password: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result)

        if (response.ok) {
            mensagemCadastro.innerHTML = 'Cadastro realizado com sucesso!'
            mensagemCadastro.style.color = "#4CAF50";

            setTimeout(() => {
                window.location.href = 'cadastro_login.html';
            }, 2000);
        } else {
            mensagemCadastro.textContent = result.message || "Erro ao fazer cadastro";
            mensagemCadastro.style.color = "#ff5c5c";
        }

    } catch (err) {
        console.error(err);
        alert('Erro na conexão com o servidor');
    }
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById('emailLogin').value,
        password: document.getElementById('senhaLogin').value
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        console.log(result)

        if (!response.ok) {
            mensagemLogin.textContent = result.message || "Erro ao fazer login";
            mensagemLogin.style.color = "#ff5c5c";
            return;
        }
        if (result.token) {
            localStorage.setItem('token', result.token);
            mensagemLogin.innerHTML = 'Login realizado com sucesso!'
            mensagemLogin.style.color = "#4CAF50";

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        }
    }
    catch (err) {
        console.error(err);
        alert('Erro na conexão com o servidor');
    }
})
