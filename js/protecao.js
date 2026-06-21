const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

function protegerPagina() {
  if (!usuarioLogado) {
    alert("Faça login para acessar essa página!");

    window.location.href = "login.html";
  }
}

function mostrarUsuario() {
  if (usuarioLogado) {
    const area = document.getElementById("usuario");

    if (area) {
      area.innerHTML = `
            Olá, ${usuarioLogado.nome}
            <button onclick="sair()">
            Sair
            </button>
            `;
    }
  }
}

function sair() {
  localStorage.removeItem("usuarioLogado");

  window.location.href = "login.html";
}

localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuario)
);
