import { buscarCep } from "../../backend/src/controllers/ApiCep.js";

window.onload = ()=> {
    const cep = document.getElementById("txtcep");
    cep.addEventListener("blur", buscarCep); //adiciona o evento que ao campo de cep perder o foco, a função buscarCep é acionada
}