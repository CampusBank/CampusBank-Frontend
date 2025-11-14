const cards = document.querySelectorAll('.feature-card');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) card.classList.add('show');
  });
});

const token = localStorage.getItem('token');

const protegidos = document.querySelectorAll('.protegido');
const conecta = document.querySelector('#menuCadastro')
const btnHome = document.querySelector('#btnHome')
console.log(protegidos)

if (token) {
  btnHome.style.display = 'none'
  protegidos.forEach(el => {
    el.classList.remove('protegido');
    conecta.style.display = 'none'

    isADM(token)
  });
} else {
  btnHome.style.display = 'inline'
  protegidos.forEach(el => {
    el.classList.add('protegido');
    conecta.style.display = 'inline'

  });
}


document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html'
})


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

    const user = result.user

    if (user.role === 'admin') return alert('salve adm')


  } catch (err) {
    console.error(err);
    alert('Erro na conexão com o servidor');
  }
};

