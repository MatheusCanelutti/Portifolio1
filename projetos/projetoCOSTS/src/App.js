import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Home from './components/Pages/HOme';
import Company from './components/Pages/Company';
import NewProjet from './components/Pages/NewProjet';
import Contact from './components/Pages/Contact';
import Projects from './components/Pages/Projects';
import Project from './components/Pages/Project';

import Container from './components/Layout/Container';
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';



function App() {
  return (
    <Router>
     <NavBar/>
        <Container customClass = "min-height"> 
      <Routes>
          <Route exact path="/" element = {<Home/>} />
          <Route path="/Contact" element = {<Contact/>} />
          <Route path="/Company" element = {<Company/>} />
          <Route path="/NewProjet" element = {<NewProjet/>} /> 
          <Route path="/Projects" element = {<Projects/>} /> 
          <Route path="/Project/:id" element = {<Project/>} />
    </Routes>
        </Container>

     <Footer/>
    </Router>
  );
}

export default App;
