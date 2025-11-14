const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'index.html';
}

async function criarChave() {
  const tipo = document.getElementById('tipoChave').value;
  const valor = document.getElementById('valorChave').value.trim();
  const mensagem = document.getElementById('mensagem');


  if (!token) {
    alert('Você precisa estar logado para criar uma chave.');
    return window.location.href = 'index.html';
  }

  if (!tipo) {
    return mensagem.textContent = 'Selecione o tipo da chave PIX.';
  }

  if (tipo !== 'aleatoria' && !valor) {
    return mensagem.textContent = 'Digite o valor da chave PIX.';
  }

  try {
    const response = await fetch('http://localhost:3000/createkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: tipo,
        key: valor
      })
    });

    const data = await response.json();

    if (response.ok) {
      mensagem.textContent = '✅ Chave criada com sucesso!';
      document.getElementById('valorChave').value = '';
      document.getElementById('tipoChave').value = '';
    } else {
      mensagem.textContent = `❌ Erro: ${data.mensagem || 'Falha ao criar chave.'}`;
    }
    setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);

  } catch (error) {
    console.error(error);
    mensagem.textContent = '⚠️ Erro na conexão com o servidor.';
  }
}
