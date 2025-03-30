
export function buscarCep(){ //Função para buscar e preencher automaticamente o número deo cep
    let cep = document.getElementById('txtcep').value; //a variável cep recebe o valor do input com id txtcep
        if(cep !== ""){ //condição, se o cep for diferente de espaço vazio
            let url = "https://brasilapi.com.br/api/cep/v1/" + cep; //conecta com a url brasilapi
            let requisicao = new XMLHttpRequest(); //Cria um objeto do tipo XMLHtppRequest e o atribui a variável requisicao

            requisicao.open("GET", url); //adiciona o método get a url na variavel requisicao
            requisicao.send(); //envia o valor dar variável requisicao

            //evento para quando a resposta da requisicao for carregada
            requisicao.onload = function(){
                if(requisicao.status === 200){ //verifica se a requisicao foi um sucesso

                     // Analisa o corpo da resposta JSON em um objeto JavaScript e adiciona aos campos rua e bairro o resultado da requisicao
                    let endereco = JSON.parse(requisicao.response);
                    document.getElementById('rua').value = endereco.street;
                    document.getElementById('bairro').value = endereco.neighborhood;
                } else if(requisicao.status === 404){ //condicional, se não for possível ler o cep ou se der erro a requisicao
                    alert("CEP Inválido");
                } else{
                    alert("Erro ao fazer a requisição");
                }
        }
    }
}