document.getElementById("formDenuncia").addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const motivo = document.getElementById("motivo").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (!usuario || !motivo || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const denuncia = {
        usuario,
        motivo,
        descricao,
        data: new Date().toLocaleString()
    };

    let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
    denuncias.push(denuncia);
    localStorage.setItem("denuncias", JSON.stringify(denuncias));

    document.getElementById("msgSucesso").style.display = "block";

    document.getElementById("formDenuncia").reset();

    setTimeout(() => {
        document.getElementById("msgSucesso").style.display = "none";
    }, 2500);
});


const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'index.html';
}