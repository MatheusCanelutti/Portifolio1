import { buscarCep } from "../../../backend/src/controllers/ApiCep.js";

window.onload = function(){
    let cep = document.getElementById("cep-product");
    cep.addEventListener("blur", buscarCep); //adiciona o evento que ao campo de cep perder o foco, a função buscarCep é acionada
}

//----------------------------------------


//Pega o valor dos inputs do tipo arquivo com os id photo1, photo2 e photo3
let photo1 = document.getElementById('photo1');
let photo2 = document.getElementById('photo2');
let photo3 = document.getElementById('photo3');

//Pega o valor das imagens que ilustram os inputs tipo arquivo c
let img1 = document.getElementById('img1')
let img2 = document.getElementById('img2')
let img3 = document.getElementById('img3')

//adiciona um evento que realiza uma determinada ação após uma mudança.
//Nos casos abaixo após a leitura de arquivos
img1.addEventListener('change', function(event){
    let reader = new FileReader(); //Novo leitor de arquivos

    if(img.files.length <= 0){ //Condicional, se a extensão da img1 de arquivos for menor ou igual a zero, há um retorno para realizar o teste de condicional novamente
        return;
    }

    reader.onload = () => {
        photo1.src = reader.result; //Carrega o resultado da leitura no input tipo arquivo
    }

    reader.readAsDataURL(img1.files[0]); //O leior ler o endereço do arquivo selecionado da posição 0 dos arquivos do img1

});

//adiciona um evento que realiza uma determinada ação após uma mudança.
//Nos casos abaixo após a leitura de arquivos
img2.addEventListener('change', function(event){
    let reader = new FileReader(); //Novo leitor de arquivos

    if(img2.files.length <= 0){//Condicional, se a extensão da img2 de arquivos for menor ou igual a zero, há um retorno para realizar o teste de condicional novamente
        return;
    }

    reader.onload = () => {
        photo2.src = reader.result; //Carrega o resultado da leitura no input tipo arquivo
    }

    reader.readAsDataURL(img2.files[0]); //O leior ler o endereço do arquivo selecionado da posição 0 dos arquivos do img2

});

img3.addEventListener('change', function(event){
    let reader = new FileReader();  //Novo leitor de arquivos

    if(img3.files.length <= 0){ //Condicional, se a extensão da img3 de arquivos for menor ou igual a zero, há um retorno para realizar o teste de condicional novamente
        return;
    }

    reader.onload = () => {
        photo3.src = reader.result; //Carrega o resultado da leitura no input tipo arquivo
    }

    reader.readAsDataURL(img3.files[0]);  //o leior ler o endereço do arquivo selecionado da posição 0 dos arquivos do img3

});

//-----------------------------------------------------


// Função para salvar os dados no armazenamento local
function salvarDados() {

    //Captura os valores dos inputs com id nome e id txtcep
    var valNome = document.getElementById('nome').value;
    var valCep = document.getElementById('txtcep').value;
    var valRua = document.getElementById('rua').value;
    var valNum = document.getElementById('txtnum').value;
    var valBairro = document.getElementById('bairro').value;
    var valCont = document.getElementById('contato').value;
    
    // Salvar os valores no armazenamento local
    localStorage.setItem('nome', valNome);
    localStorage.setItem('cep', valCep);
    localStorage.setItem('rua', valRua);
    localStorage.setItem('txtnum', valNum);
    localStorage.setItem('bairro', valBairro);
    localStorage.setItem('contato', valCont);
}

// Função para carregar os dados do armazenamento local e preencher os campos do formulário
function carregarDados() {
    // Recuperar os valores do armazenamento local
    var valNome = localStorage.getItem('nome');
    var valCep = localStorage.getItem('cep');
    var valRua = localStorage.getItem('rua');
    var valNum = localStorage.getItem('txtnum');
    var valBairro = localStorage.getItem('bairro');
    var valCont = localStorage.getItem('contato');
    
    // Preenche os campos do formulário com os valores salvos
    document.getElementById('nome').value = valNome;
    document.getElementById('txtcep').value = valCep;
    document.getElementById('rua').value = valRua;
    document.getElementById('txtnum').value = valNum;
    document.getElementById('bairro').value = valBairro;
    document.getElementById('contato').value = valCont;

    //Aciona a função salvarDados qudndo os inputs perderem o foco, ou seja, não estiverem selecionados
    document.getElementById('nome').addEventListener('blur', salvarDados);
    document.getElementById('txtcep').addEventListener('blur', salvarDados);
    document.getElementById('rua').addEventListener('blur', 
    salvarDados);
    document.getElementById('txtnum').addEventListener('blur', salvarDados);
    document.getElementById('bairro').addEventListener('blur', salvarDados)
    document.getElementById('contato').addEventListener('blur', salvarDados);
}

//Evento para quando a página for carregada
window.addEventListener('load', function() {
    //Carrega os dados no formulário
    carregarDados();
});