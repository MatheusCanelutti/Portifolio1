
import Styles from './Home.module.css';
import savings from '../img/savings.svg';
import LinkButton from '../Layout/LinkButton';

function HOme() {
    return (
        
        <section className = {Styles.home_container}> 
            <h1>Bem-vindo ao 
                <span>Costs</span>
            </h1>
            <p>comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/NewProjet" text= "Criar projeto" /> 
            <img src={savings} alt='Costs' />
        </section>
    
    );
}

export default HOme