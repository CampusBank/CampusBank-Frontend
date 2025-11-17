
    const token = localStorage.getItem("token");

    // 🔐 VERIFICAR ADMIN
    async function verificarAdmin() {
      try {
        const req = await fetch("http://localhost:3000/protegido", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await req.json();

        if (!data.user || data.user.role !== "admin") {
          alert("Acesso negado! Apenas administradores podem entrar.");
          window.location.href = "home.html";
        }

      } catch (err) {
        console.error(err);
        alert("Erro ao validar administrador.");
      }
    }

    // 📌 CARREGAR DENÚNCIAS
    async function carregarDenuncias() {
      try {
        const req = await fetch("http://localhost:3000/listarDenuncias", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const denuncias = await req.json();
        const container = document.getElementById("listaDenuncias");
        container.innerHTML = "";

        denuncias.forEach((d) => {
          const div = document.createElement("div");
          div.className = "denuncia-item";

          div.innerHTML = `
            <p><strong>ID:</strong> ${d._id}</p>
            <p><strong>Status atual:</strong> ${d.status}</p>
            <p><strong>Tipo:</strong> ${d.tipo}</p>
            <p><strong>Descrição:</strong> ${d.descricao}</p>
            <p><strong>Usuário:</strong> ${d.user?.nome ?? "Indefinido"}</p>
            <p><strong>Transação:</strong> ${d.transacao?._id ?? "N/A"}</p>

            <label><strong>Alterar status:</strong></label><br>
            <select id="status-${d._id}">
              <option value="pendente" ${d.status === "pendente" ? "selected" : ""}>Pendente</option>
              <option value="resolvida" ${d.status === "resolvida" ? "selected" : ""}>Resolvida</option>
              <option value="recusada" ${d.status === "recusada" ? "selected" : ""}>Recusada</option>
            </select>

            <button onclick="atualizarDenuncia('${d._id}')">
              <i class="fa-solid fa-check"></i> Salvar
            </button>
          `;

          container.appendChild(div);
        });

      } catch (e) {
        console.error(e);
      }
    }

   
    async function atualizarDenuncia(id) {
      const novoStatus = document.getElementById(`status-${id}`).value;

      const req = await fetch("http://localhost:3000/atualizarDenuncias", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ idDenun: id, status: novoStatus })
      });

      const res = await req.json();

      if (res.novoScore !== undefined) {
        alert(`${res.mensagem}\nNovo score do usuário denunciado: ${res.novoScore}`);
      } else {
        alert(res.mensagem);
      }

      carregarDenuncias();
    }

    verificarAdmin();
    carregarDenuncias();
