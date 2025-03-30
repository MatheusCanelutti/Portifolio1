import {Link} from 'react-router-dom'

import Container from './Container'

import Styles from './NavBar.module.css'

import Logo from '../img/costs_logo.png'


function NavBar(){
    return(
    <nav className = {Styles.navBar}>
        <Container>
       
            <Link to="/">
               <img src={ Logo } alt='Costs'/>
            </Link>

         <ul className = {Styles.list}>
            <li className = {Styles.item}>
               <Link to="/">Home</Link>
            </li>

            <li className = {Styles.item}>
               <Link to="/Projects">Projects</Link>
            </li>
            
            <li className = {Styles.item}>
               <Link to="/contact">Contato</Link>
            </li>
            
            <li className = {Styles.item}>
               <Link to="/Company">Empresa</Link>
            </li>

            
        </ul>
        </Container>
    </nav>
    )
}

export default NavBar