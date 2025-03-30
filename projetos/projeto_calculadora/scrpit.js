// Esta função insere um número no innerHTML do elemento "resultado".
function insert(num){
    // Obtém o conteúdo atual do elemento "resultado".
    var numero = document.getElementById("resultado").innerHTML;

    // Acrescenta o número fornecido ao conteúdo atual.
    document.getElementById("resultado").innerHTML = numero + num;
}

// Esta função limpa o conteúdo do elemento "resultado".
function clean(){
    // Define o innerHTML do elemento "resultado" como uma string vazia.
    document.getElementById("resultado").innerHTML = "";
}

// Esta função remove o último caractere do conteúdo do elemento "resultado".
function back(){
    // Obtém o conteúdo atual do elemento "resultado".
    var resultado = document.getElementById("resultado").innerHTML;

    // Define o innerHTML do elemento "resultado" como o conteúdo excluindo o último caractere.
    document.getElementById("resultado").innerHTML = resultado.substring(0, resultado.length - 1);
}

// Esta função calcula o resultado da expressão no conteúdo do elemento "resultado".
function calcular(){
    // Obtém o conteúdo atual do elemento "resultado".
    var resultado = document.getElementById("resultado").innerHTML;

    // Se houver conteúdo em "resultado", avalia a expressão usando a função eval() e atualiza o conteúdo do elemento "resultado".
    if(resultado){
        document.getElementById("resultado").innerHTML = eval(resultado);
    }
    // Se "resultado" estiver vazio, exibe "ERRO" no elemento "resultado".
    else{
        document.getElementById("resultado").innerHTML = "ERRO";
    }
}

