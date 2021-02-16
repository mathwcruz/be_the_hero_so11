import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';

import './styles.css';

import api from '../../services/api';

function NewIndicent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, SetValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewincident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents' , data, { //enviando os dados capturados no input para a criação de um novo caso para a ong logada
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile'); //enviando o usuário para a area de casos cadastrados
    } catch (err) {
      alert('Erro ao cadastrar o caso, tente novamente, por favor');
    };
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img 
            src={LogoImg} 
            alt="Be The Hero"
          />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile"> {/* Componente Link irá fazer a página não ser carregada, SPA */}
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewincident}> {/* enviando os dados dos inputs para a criação de um novo caso no banco */}
          <input placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
           />
          <textarea placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
          <input placeholder="Valor em R$"
            value={value}
            onChange={(e) => SetValue(e.target.value)} 
           />

          <button 
            className="button" 
            type="submit"
          >Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default NewIndicent;