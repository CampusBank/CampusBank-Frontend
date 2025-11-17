const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'index.html';
}

async function criarDenuncia() {
    const tipo = document.getElementById('options').value;
    const descricao = document.getElementById('descricao').value.trim();
    const transacao = document.getElementById('transacao').value.trim();
    const mensagem = document.getElementById('mensagem');

    if (!token) {
        alert('Você precisa estar logado para criar uma denúncia.');
        return window.location.href = 'index.html';
    }

    // validações
    if (!tipo) {
        return mensagem.textContent = 'Selecione o tipo da denúncia.';
    }

    if (!descricao) {
        return mensagem.textContent = 'Descreva o motivo da denúncia.';
    }

    if (!transacao) {
        return mensagem.textContent = 'Informe o ID da transação.';
    }

    try {
        const response = await fetch("http://localhost:3000/criarDenuncia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // passa o JWT para req.user.id
            },
            body: JSON.stringify({
                tipo,
                descricao,
                transacao
            })
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.textContent = "✅ Denúncia enviada com sucesso!";
            document.getElementById('descricao').value = '';
            document.getElementById('transacao').value = '';
            document.getElementById('options').value = '';
        } else {
            mensagem.textContent = `❌ Erro: ${data.mensagem || 'Falha ao enviar denúncia.'}`;
        }

        // redireciona após 2 segundos
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);

    } catch (error) {
        console.error(error);
        mensagem.textContent = '⚠️ Erro na conexão com o servidor.';
    }
}
