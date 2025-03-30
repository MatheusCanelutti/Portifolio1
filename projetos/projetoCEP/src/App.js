
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './Styles.css';
import api from './Services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Por favor, preencha algum CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput(""); // Limpa o campo de entrada após a busca
    } catch (error) {
      alert("Erro ao buscar o CEP!");
      setInput(""); // Limpa o campo de entrada em caso de erro
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={24} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>cep: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;

