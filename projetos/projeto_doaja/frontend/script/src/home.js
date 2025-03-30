function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

// Função para exibir os produtos cadastrados
function exibirDoacoes() {
  var listaDoacoes = document.getElementById('listaDoacoes');

  // Limpar lista antes de adicionar os itens novamente
  listaDoacoes.innerHTML = '';

  // Buscar coleção 'Doacoes' no Firestore
  firebase.firestore().collection('Doacoes').get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              var doacao = doc.data();

              // Criar um item de lista para cada doação
              var itemLista = document.createElement('li');
              itemLista.textContent = `Nome: ${doacao.nome}, Categoria: ${doacao.categoria}, Descrição: ${doacao.descricao}, Contato: ${doacao.contato}`//fazer uma de imagens;

              // Adicionar o item à lista
              listaDoacoes.appendChild(itemLista);
          });
      })
      .catch(function(error) {
          console.error('Erro ao buscar doação: ', error);
         
      });
}

// Chamar a função para exibir as doações assim que a página carregar
document.addEventListener('DOMContentLoaded', function() {
  exibirDoacoes()();
});