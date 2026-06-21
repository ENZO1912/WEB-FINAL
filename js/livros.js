const formulario = document.querySelector(".formulario");

function carregarLivros() {
  const livros = localStorage.getItem("biblioteca_livros");

  if (livros) {
    const lista = JSON.parse(livros);

    // se existir mas estiver vazio cria os iniciais
    if (lista.length > 0) {
      return lista;
    }
  }

  const livrosIniciais = [
    {
      id: 1,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      categoria: "Romance",
      ano: "1899",
      status: "Disponível",
    },

    {
      id: 2,
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Fantasia",
      ano: "1943",
      status: "Disponível",
    },

    {
      id: 3,
      titulo: "Harry Potter e a Pedra Filosofal",
      autor: "J.K. Rowling",
      categoria: "Fantasia",
      ano: "1997",
      status: "Disponível",
    },

    {
      id: 4,
      titulo: "A Menina que Roubava Livros",
      autor: "Markus Zusak",
      categoria: "Drama",
      ano: "2005",
      status: "Disponível",
    },

    {
      id: 5,
      titulo: "A Revolução dos Bichos",
      autor: "George Orwell",
      categoria: "Política/Ficção",
      ano: "1945",
      status: "Disponível",
    },
  ];

  salvarLivros(livrosIniciais);

  return livrosIniciais;
}

// ===============================
// SALVAR LIVROS
// ===============================

function salvarLivros(livros) {
  localStorage.setItem(
    "biblioteca_livros",

    JSON.stringify(livros),
  );
}

// ===============================
// MOSTRAR LIVROS NA TABELA
// ===============================

function mostrarLivros() {
  const tabela = document.getElementById("corpoTabelaLivros");

  // evita aparecer em outras páginas

  if (!tabela) {
    return;
  }

  const livros = carregarLivros();
  console.log(livros);

  tabela.innerHTML = "";

  livros.forEach(function (livro) {
    tabela.innerHTML += `

        <tr>

            <td>${livro.titulo}</td>

            <td>${livro.autor}</td>

            <td>${livro.categoria}</td>

            <td>${livro.ano}</td>

            <td>${livro.status}</td>

        </tr>

        `;
  });
}

// ===============================
// CADASTRAR LIVRO NOVO
// ===============================

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const livros = carregarLivros();

    const novoLivro = {
      id: Date.now(),

      titulo: document.getElementById("nome").value,

      autor: document.getElementById("autor").value,

      categoria: document.getElementById("categoria").value,

      ano: document.getElementById("ano").value,

      status: document.getElementById("status").value,
    };

    const livroExiste = livros.some(function (livro) {
      return (
        livro.titulo.toLowerCase().trim() ===
          novoLivro.titulo.toLowerCase().trim() &&
        livro.autor.toLowerCase().trim() ===
          novoLivro.autor.toLowerCase().trim()
      );
    });

    if (livroExiste) {
      alert("Este livro já está cadastrado!");

      return;
    }

    livros.push(novoLivro);

    salvarLivros(livros);

    mostrarLivros();

    formulario.reset();
  });
}

// ===============================
// INICIAR PÁGINA
// ===============================

console.log("livros.js funcionando");

mostrarLivros();
