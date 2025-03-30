function cadastrarProduto() {
    var nome = document.getElementById('nome').value;
    var categoria = document.getElementById('iest').value;
    var descricao = document.getElementById('descricao').value;
    var cep = document.getElementById('txtcep').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('txtnum').value;
    var bairro = document.getElementById('bairro').value;
    var contato = document.getElementById('contato').value;

    // Dados a serem adicionados ao Firestore
    var doacoesData = {
        nome: nome,
        categoria: categoria,
        descricao: descricao,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        contato: contato
    };

    // Enviando dados para o Firestore
    firebase.firestore().collection('Doacoes').add(doacoesData)
        .then(function(docRef) {
            console.log('Documento cadastrado com ID: ', docRef.id);
            alert('Produto cadastrado com sucesso!');
            limparCampos();
        })
        .catch(function(error) {
            console.error('Erro ao cadastrar produto: ', error);
            alert('Erro ao cadastrar produto. Verifique o console para mais detalhes.');
        });
}

// Função para limpar os campos do formulário após o cadastro
function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('iest').value = 'Select';
    document.getElementById('descricao').value = '';
    document.getElementById('txtcep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('txtnum').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('contato').value = '';
}