import {parse, v4 as uuidv4} from 'uuid'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './Project.module.css'

import Container from '../Layout/Container'

import Loading from '../Layout/Loading'
import ProjectForm from '../Project/ProjectForm'
import Message from '../Layout/Message'
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard'

function Project() {
    const { id } = useParams()
    console.log(id)

    const [project, setProject] = useState({})
    const [services, setServices] = useState({})
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:3001/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch((err) => console.log(err)) // Corrigido: log de erro adequado
        }, 500)
    }, [id])

    function editPost(project){
        setMessage('')

        //budget validation

        if(project.budget < project.cost){
          
            setMessage("O orçamento não pode se rmenor que o custo do projeto!")
            setType('error')
            return false // parar o projeto
        }

        fetch(`http://localhost:3001/projects/${project.id}`,{
          method: 'PATCH',
          headers:{
            'content-Type': 'application/json',
          } ,
          body: JSON.stringify(project),

        })
        .then(resp => resp.json())

        .then((data) => {

            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType('success')
        })

        .catch(err => console.log(err)) 

    }
    function createService(){
        setMessage('')
        //last service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost =lastService.cost

        const newCost =parseFloat(project.cost) + parseFloat(lastServiceCost)
      //valor maximo validação
      if(newCost > parseFloat(project.budget)){
        setMessage('orçamento ultrapassado, verifique o valor do serviço')
        setType('error')
        project.services.pop()
        return false
      }


      //adicionar o service cost do projeto
      project.cost =newCost
      //update do projeto
      fetch(`http://localhost:3001/projects${project.id}`,{
        method: 'PATCH',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      }).then((resp) => resp.json())
      .then((data) => {
        // exibir o seviço
         setShowServiceForm(false)
      })
      .catch(err => console.log(err))
    }

    function removeService(id, cost){

     const serviceUpdated = project.services.filter(
        (service) => service.id !== id
     )
        const projectUpdated = project

        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:3001/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage('Serviço removido com sucesso!')
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm(){
         setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
   }

    return  (<>
        {project.name ? (  // condicional if else
          <div className={Styles.project_details}>
            <Container customClass="column"> 
                {message && <Message type={type} msg={message} />}

                <div className={Styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={Styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={Styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de orçamento</span> R${project.budget}
                                </p>

                                <p>
                                    <span>Total utilizado</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={Styles.project_info}>
                                <ProjectForm 
                                  handleSubmit={editPost} 
                                  btnText="Concluir edição" 
                                  projectData={project}
                                />
                            </div>
                        )}
                </div>

                <div className={Styles.service_form_container}>
                    <h2>adicione um serviço</h2>
                    <button className={Styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={Styles.project_info}>
                     {showServiceForm &&  <ServiceForm
                      handleSubmit={createService}
                      btnText='Adicionar'
                      projectData={project}                      />}
                    </div>
                </div>
                <h2>serviços</h2>
                <Container customClass="start">
                   {services.length > 0 &&
                   services.map((service) =>(
                    <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                   ))

                   }
                  {services.length === 0 && <p>Não há serviços cadastrados</p>}
                </Container>
            </Container>
          </div>
        ): (
          <Loading/>
        )}     
        </>)
}

export default Project
