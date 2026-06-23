const formularioLogin = document.getElementById("formLogin");

formularioLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  const senha = document.getElementById("pwd").value;

  const tipo = document.getElementById("tipoUsuario").value;

  // Usuário administrador fixo

  const administrador = {
    email: "admin@biblioteca.com",

    senha: "123456",

    tipo: "criador",

    nome: "Administrador",
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // adiciona o admin na busca

  usuarios.push(administrador);

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return (
      usuario.email === email &&
      usuario.senha === senha &&
      usuario.tipo === tipo
    );
  });

  if (usuarioEncontrado) {
    localStorage.setItem(
      "usuarioLogado",

      JSON.stringify(usuarioEncontrado),
    );

    alert("Login realizado com sucesso!");

    window.location.href = "../index.html";
  } else {
    alert("E-mail, senha ou tipo de usuário incorreto!");
  }
});
