function ativarLinkAtual() {
  const paginaAtual = window.location.pathname;

  const links = document.querySelectorAll(".menu a");

  links.forEach(function (link) {
    const href = link.getAttribute("href");

    if (href === paginaAtual) {
      link.classList.add("ativo");
    }
  });
}

function configurarBotaoMenu() {
  const botao = document.getElementById("menuBotao");
  const menu = document.getElementById("menu");

  if (!botao || !menu) return;
  

  botao.addEventListener("click", function () {
    menu.classList.toggle("aberto");
  });
}

async function carregarMenu() {
  const menuContainer = document.getElementById("menu-container");

  if (!menuContainer) {
    return;
  }

  try {
    const resposta = await fetch("../componentes/menu.html");

    const html = await resposta.text();

    menuContainer.innerHTML = html;

    configurarBotaoMenu();
    ativarLinkAtual();
  } catch (erro) {
    console.error("Erro ao carregar menu:", erro);

    menuContainer.innerHTML =
      "<p>Erro ao carregar o menu.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarMenu);