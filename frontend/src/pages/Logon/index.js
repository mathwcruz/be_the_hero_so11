import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //importando a propriedade "link" do react para lidar com o conceito de SPA
import { FiLogIn } from 'react-icons/fi'; //importando o ícone do login

import './styles.css';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png' //importando a imagem do banner
import logoImg from '../../assets/logo.svg' //importando a imagem da logo

function Logon() {
  //pegando o valor do input de login, usando o conceito de Estado
  const [id, setId] = useState(''); //primeira posição do array é a variável e a segunda é a função

  const history = useHistory();

  //função para logar na plataforma, se a ONG existe
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id }); //enviando o id setado no formulário ao backend para validar o login da ONG

      localStorage.setItem('ongId', id); //salvando no LocalStorage o id da ong para trabalhar em outras páginas
      localStorage.setItem('ongName', response.data.name); //salvando no LocalStorage o nome da ong para trabalhar em outras páginas

      history.push('/profile'); //enviando o usuário a página de casos
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  };

  return(
    <div className="logon-container">
      <section className="form">
        <img 
          src={logoImg} 
          alt="Be The Hero"
        />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input 
            placeholder="Sua ID"
            value={id} //setando o valor do input
            onChange={e => setId(e.target.value)} // quando o valor do input mudar, irá armazenar na função setId() o valor que foi setado no input para enviar a API
            />
          <button 
            className="button" 
            type="submit"
          >
            Entrar
          </button>

          <Link className="back-link" to="/register"> {/* Componente Link irá fazer a página não ser carregada, SPA */}
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img 
        src={heroesImg} 
        alt="Heroes"/>
    </div>
  );
};

export default Logon;