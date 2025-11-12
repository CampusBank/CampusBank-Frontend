const wrapper = document.getElementById('wrapper');
const container = document.getElementById('container');
const toCadastro = document.getElementById('toCadastro');
const toLogin = document.getElementById('toLogin');

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

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'cadastro_login.html';
        } else {
            alert(result.mensagem || 'Erro ao cadastrar');
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
            if (result.mensagem) {
                alert(result.mensagem);
            } else {
                alert('Erro ao fazer login');
            }
            return;
        }
        if (result.token) {
            localStorage.setItem('token', result.token); 
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        }
    }
    catch (err) {
        console.error(err);
        alert('Erro na conexão com o servidor');
    }
})
