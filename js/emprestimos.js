const formulario = document.getElementById("formEmprestimo");

const dataEmprestimo = document.getElementById("emprestimo");

const dataDevolucao = document.getElementById("Devolução");

dataEmprestimo.addEventListener("change", function(){

    // data escolhida
    const data = new Date(dataEmprestimo.value);

    // somar 30 dias
    data.setDate(data.getDate() + 30);

    // formatar
    const ano = data.getFullYear();

    const mes = String(data.getMonth() + 1).padStart(2, "0");

    const dia = String(data.getDate()).padStart(2, "0");

    // definir data máxima
    dataDevolucao.max = ano + "-" + mes + "-" + dia;

});

formulario.addEventListener("submit", function(event){

    // impede recarregar a página
    event.preventDefault();

    // pegar valores
    const aluno = document.getElementById("nome").value;

    const livro = document.getElementById("name").value;

    const emprestimo = document.getElementById("emprestimo").value;

    const devolucao = document.getElementById("Devolução").value;

    // pegar tabela
    const tabela = document.getElementById("corpoTabela");

    // criar linha
    const linha = document.createElement("tr");

    // conteúdo da linha
    linha.innerHTML = `
        <td>${aluno}</td>
        <td>${livro}</td>
        <td>${emprestimo}</td>
        <td>${devolucao}</td>

        <td class="status">
            Emprestado
        </td>

        <td>
            <button class="btnDevolver">
                Devolver
            </button>
        </td>
    `;

    // adicionar linha na tabela
    tabela.appendChild(linha);

    // botão devolver
    const botao = linha.querySelector(".btnDevolver");

    botao.addEventListener("click", function(){

        linha.querySelector(".status").innerText = "Disponível";

        botao.innerText = "Devolvido";

        botao.disabled = true;

    });

});