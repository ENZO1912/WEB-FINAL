const formulario = document.getElementById("formRegistro");


formulario.addEventListener("submit", function(event){

    event.preventDefault();


    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];



    const novoUsuario = {

        id: Date.now(),

        nome: document.getElementById("name").value,

        email: document.getElementById("email").value,

        senha: document.getElementById("senha").value,

        tipo: "aluno"

    };



    const usuarioExiste = usuarios.some(function(usuario){

        return usuario.email === novoUsuario.email;

    });



    if(usuarioExiste){

        alert("Esse e-mail já está cadastrado!");

        return;

    }



    usuarios.push(novoUsuario);



    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );



    alert("Conta criada com sucesso!");



    window.location.href = "login.html";


});