const formulario = document.getElementById("formEmprestimo");

const dataEmprestimo = document.getElementById("emprestimo");

const dataDevolucao = document.getElementById("Devolução");

const tabela = document.getElementById("corpoTabelaEmprestimos");

// ===============================
// CALCULAR DATA DE DEVOLUÇÃO
// ===============================

dataEmprestimo.addEventListener("change", function () {
  const data = new Date(dataEmprestimo.value);

  // adiciona 30 dias

  data.setDate(data.getDate() + 30);

  const ano = data.getFullYear();

  const mes = String(data.getMonth() + 1).padStart(2, "0");

  const dia = String(data.getDate()).padStart(2, "0");

  dataDevolucao.value = ano + "-" + mes + "-" + dia;
});

// ===============================
// CARREGAR EMPRÉSTIMOS SALVOS
// ===============================

function carregarEmprestimos() {
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

  tabela.innerHTML = "";

  emprestimos.forEach(function (item) {
    criarLinhaEmprestimo(item);
  });
}

// ===============================
// CRIAR LINHA NA TABELA
// ===============================

function criarLinhaEmprestimo(item) {
  const linha = document.createElement("tr");

  linha.innerHTML = `

        <td>${item.aluno}</td>

        <td>${item.livro}</td>

        <td>${item.dataEmprestimo}</td>

        <td>${item.dataDevolucao}</td>

        <td class="status">

            ${item.status}

        </td>

        <td>

            <button class="btnDevolver">

                Devolver

            </button>

        </td>

    `;

  tabela.appendChild(linha);

  const botao = linha.querySelector(".btnDevolver");

  if (item.status === "Devolvido") {
    botao.disabled = true;
  }

  botao.addEventListener("click", function () {
    devolverLivro(item.id, linha, botao);
  });
}

// ===============================
// CADASTRAR EMPRÉSTIMO
// ===============================

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const aluno = document.getElementById("nome").value;

  const nomeLivro = document.getElementById("name").value;

  const emprestimo = document.getElementById("emprestimo").value;

  const devolucao = document.getElementById("Devolução").value;

  let livros = JSON.parse(localStorage.getItem("biblioteca_livros")) || [];

  const livro = livros.find(function (item) {
    return item.titulo.toLowerCase().trim() === nomeLivro.toLowerCase().trim();
  });

  if (!livro) {
    alert("Livro não encontrado!");

    return;
  }

  if (livro.status === "Emprestado") {
    alert("Este livro já está emprestado!");

    return;
  }

  livro.status = "Emprestado";

  localStorage.setItem(
    "biblioteca_livros",

    JSON.stringify(livros),
  );

  let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

  const novoEmprestimo = {
    id: Date.now(),

    aluno: aluno,

    livro: nomeLivro,

    dataEmprestimo: emprestimo,

    dataDevolucao: devolucao,

    status: "Emprestado",
  };

  emprestimos.push(novoEmprestimo);

  localStorage.setItem(
    "emprestimos",

    JSON.stringify(emprestimos),
  );

  criarLinhaEmprestimo(novoEmprestimo);

  formulario.reset();

  alert("Empréstimo realizado com sucesso!");
});

// ===============================
// DEVOLVER LIVRO
// ===============================

function devolverLivro(id, linha, botao) {
  let emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

  let livros = JSON.parse(localStorage.getItem("biblioteca_livros")) || [];

  const emprestimo = emprestimos.find(function (item) {
    return item.id === id;
  });

  if (emprestimo) {
    emprestimo.status = "Devolvido";

    const livro = livros.find(function (item) {
      return item.titulo === emprestimo.livro;
    });

    if (livro) {
      livro.status = "Disponível";
    }
  }

  localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

  localStorage.setItem(
    "biblioteca_livros",

    JSON.stringify(livros),
  );
  linha.querySelector(".status").innerText = "Devolvido";
  botao.innerText = "Devolvido";
  botao.disabled = true;
}

// iniciar página

carregarEmprestimos();
