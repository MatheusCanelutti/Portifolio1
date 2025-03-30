import Styles from './NewProjet.module.css'
import ProjectForm from '../Project/ProjectForm'

import { useNavigate } from 'react-router-dom'

function NewProjet() {
    const navigate = useNavigate();


    function createPost(project) {
        // Inicializa as propriedades 'cost' e 'services' do objeto 'project'
        project.cost = 0;
        project.services = [];
    
        // Faz uma requisição POST para o servidor para criar um novo projeto
        fetch("http://localhost:3001/projects", {
            method: "POST", // Define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(project), // Converte o objeto 'project' para uma string JSON
        })
        .then((resp) => resp.json()) // Converte a resposta para JSON
        .then((data) => { // Utiliza os dados da resposta
            console.log(data); // Exibe os dados no console
            // Redireciona ou realiza alguma ação adicional com os dados recebidos
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
        })
        .catch((err) => console.log(err)); // Exibe erros no console
    }
    

    return (
        <div className={Styles.newprojet_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/> 
        </div>
    );
}

export default NewProjet;
