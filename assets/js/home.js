document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    return window.location.href = 'index.html';
  }

  try {
    const response = await fetch('http://localhost:3000/protegido', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    const usuario = result.user;

   
    const chavesPix = usuario.pixKey.map(chave => ({
      type: chave.type,
      key: chave.key
    }));

    console.log(chavesPix);

  
    const nomeUser = document.querySelector('#usuario');
    nomeUser.innerText = `Bem-vindo, ${usuario.nome}`;

    const saldoEl = document.getElementById('saldo');
    saldoEl.textContent = `R$ ${usuario.saldo.toFixed(2)}`;

  
    let oculto = false;
    document.getElementById('toggleSaldo').addEventListener('click', () => {
      oculto = !oculto;
      saldoEl.textContent = oculto ? '••••••••' : `R$ ${usuario.saldo.toFixed(2)}`;
    });

   
    const chavesContainer = document.querySelector('.chaves');

   
    chavesContainer.innerHTML = '<h3>Suas chaves Pix</h3>';

    if (chavesPix.length > 0) {
      chavesPix.forEach(chave => {
        const div = document.createElement('div');
        div.classList.add('chave-item');

        div.innerHTML = `
          <span class="tipo">${chave.type ? chave.type.toUpperCase() : 'Tipo não definido'}</span>
          <span class="valor">${chave.key || 'Chave vazia'}</span>
        `;

        chavesContainer.appendChild(div);
      });
    } else {
      const semChaves = document.createElement('p');
      semChaves.style.textAlign = 'center';
      semChaves.style.opacity = '0.7';
      semChaves.textContent = 'Nenhuma chave cadastrada.';
      chavesContainer.appendChild(semChaves);
    }

  } catch (err) {
    console.error(err);
    alert('Erro na conexão com o servidor');
  }
});
