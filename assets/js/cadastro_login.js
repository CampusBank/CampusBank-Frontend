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

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    // --- VALIDAÇÕES ---
    if (!nome || !email || !senha || !cpf || !telefone) {
        mensagemCadastro.textContent = "Preencha todos os campos!";
        mensagemCadastro.style.color = "#ff5c5c";
        return;
    }

    if (!email.includes("@") || email.length < 5) {
        mensagemCadastro.textContent = "Email inválido!";
        mensagemCadastro.style.color = "#ff5c5c";
        return;
    }

    if (senha.length < 6) {
        mensagemCadastro.textContent = "A senha deve ter pelo menos 6 caracteres!";
        mensagemCadastro.style.color = "#ff5c5c";
        return;
    }

    if (cpf.length !== 11 || isNaN(cpf)) {
        mensagemCadastro.textContent = "CPF inválido! Digite somente 11 números.";
        mensagemCadastro.style.color = "#ff5c5c";
        return;
    }

    if (telefone.length < 10 || telefone.length > 11 || isNaN(telefone)) {
        mensagemCadastro.textContent = "Telefone inválido!";
        mensagemCadastro.style.color = "#ff5c5c";
        return;
    }

    
    const data = { nome, email, password: senha, cpf, telefone };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            mensagemCadastro.innerHTML = 'Cadastro realizado com sucesso!';
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
        });

        const result = await response.json();

        if (!response.ok) {
            mensagemLogin.textContent = result.message || "Erro ao fazer login";
            mensagemLogin.style.color = "#ff5c5c";
            return;
        }


        const token = result.token;
        localStorage.setItem('token', token);


        const isAdmin = await isADM(token);

        if (isAdmin) {
            mensagemLogin.textContent = "Bem-vindo Administrador!";
            mensagemLogin.style.color = "#FFD700";

            setTimeout(() => {
                window.location.href = "admin.html";
            }, 1500);

        } else {
            mensagemLogin.textContent = "Login realizado com sucesso!";
            mensagemLogin.style.color = "#4CAF50";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);
        }

    }
    catch (err) {
        console.error(err);
        alert('Erro na conexão com o servidor');
    }
});

async function isADM(token) {
    try {
        const response = await fetch('http://localhost:3000/protegido', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        const user = result.user;

        return user.role === 'admin';

    } catch (err) {
        console.error(err);
        return false;
    }
}

