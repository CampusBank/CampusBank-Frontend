function voltar() {
    window.history.back();
}

function editarDenuncia(btn) {
    const card = btn.closest(".denuncia-card");
    const texto = card.querySelector(".denuncia-texto");
    const textarea = card.querySelector("textarea");
    const btnSalvar = card.querySelectorAll(".btn")[1];

    textarea.value = texto.textContent;
    texto.style.display = "none";
    textarea.style.display = "block";
    btn.style.display = "none";
    btnSalvar.style.display = "inline-block";
}

function salvarDenuncia(btn) {
    const card = btn.closest(".denuncia-card");
    const texto = card.querySelector(".denuncia-texto");
    const textarea = card.querySelector("textarea");
    const btnEditar = card.querySelectorAll(".btn")[0];

    texto.textContent = textarea.value;
    texto.style.display = "block";
    textarea.style.display = "none";
    btn.style.display = "none";
    btnEditar.style.display = "inline-block";
}

const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'index.html';
}