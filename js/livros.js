
function carregarLivros() {
    const livrosSalvos = localStorage.getItem('biblioteca_livros');
    
    if (livrosSalvos) {
        return JSON.parse(livrosSalvos);
    } else {

        const livrosIniciais = [
            { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", status: "disponivel" },
            { id: 2, titulo: "1984", autor: "George Orwell", status: "disponivel" },
            { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", status: "disponivel" }
        ];
        salvarLivros(livrosIniciais);
        return livrosIniciais;
    }
}

function salvarLivros(livros) {
    localStorage.setItem('biblioteca_livros', JSON.stringify(livros));
}


function emprestarLivro(idLivro) {
    const livros = carregarLivros();
    
    const livroIndex = livros.findIndex(livro => livro.id === idLivro);

    if (livroIndex !== -1) {
        if (livros[livroIndex].status === "disponivel") {
            // Altera o status para emprestado
            livros[livroIndex].status = "emprestado";
            
            
            salvarLivros(livros);
            
            alert(`O livro "${livros[livroIndex].titulo}" foi emprestado com sucesso!`);
            
        } else {
            alert("Este livro já está emprestado no momento.");
        }
    } else {
        alert("Livro não encontrado.");
    }
}

function devolverLivro(idLivro) {
    const livros = carregarLivros();
    const livroIndex = livros.findIndex(livro => livro.id === idLivro);

    if (livroIndex !== -1 && livros[livroIndex].status === "emprestado") {
        livros[livroIndex].status = "disponivel";
        salvarLivros(livros);
        alert(`O livro "${livros[livroIndex].titulo}" foi devolvido!`);
    }
}