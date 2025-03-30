import React, { useState } from 'react';
import styles from './Contact.module.css'; // Importando estilos do arquivo Contact.module.css

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados do formulário
    console.log(formData);
    // Por exemplo, enviar para um backend ou outra ação necessária
  };

  return (
    <div className={styles.container}>
      <h2>Formulário de Contato</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="message">Mensagem:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
