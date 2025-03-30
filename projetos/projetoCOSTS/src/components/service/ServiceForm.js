import {useState} from 'react'

import Input from '../Form/Input'
import SubmitButton from '../Form/SubmitButton'

import Styles from '../Project/ProjectForm.module.css'




function ServiceForm({handleSubmit, btnText, projectData }){

    const[service, setService] = useState({})

function submit(e){
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)

}

function handleOnChange(e){
setService({...service, [e.target.name]: e.target.value})

}

    return(
        <form onSubmit={submit} className={Styles.form} >
    <Input
         type='text'
         text='Nome do serviço'
         name='name'
         placeholder='Insira seu serviço aqui'
         handleOnChange={handleOnChange}

    ></Input>

    <Input
         type='number'
         text='custo do serviço'
         name='cost'
         placeholder='Insira o valor total'
         handleOnChange={handleOnChange}

         ></Input>

     <Input
         type='text'
         text='descrição do serviço'
         name='description'
         placeholder='Descreva o serviço'
         handleOnChange={handleOnChange}

    ></Input>
    <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm