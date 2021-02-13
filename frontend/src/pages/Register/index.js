import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';

import './styles.css'

function Register() {
  //pegando os valores dos inputs do formulário, usando o conceito de Estado
  const [name, setName] = useState('');  //primeira posição do array é a variável e a segunda é a função
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory(); //variável para levar o usuário a outra página

  //função para cadastrar o usuários
  async function handleRegister(e) {
    e.preventDefault();
    
    const data = { //armazenando o conteúdo dos inputs
      name,
      email, 
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('ongs', data); //fazendo um POST ao backend com os dados armazenados do input para enviar ao backend e criar uma nova ong no banco

      alert(`Seu ID de acesso: ${response.data.id}`); // mostrando ao usuário o seu ID após ter efetivado o seu cadastro com sucesso
      //IDEIA: criar um modal mostrando esse dado

      history.push('/'); //enviando o usuário para a rota de login após finalizar o seu cadastro
    } catch (err) {
      alert('Erro no cadastro, tente novamente, por favor');
    }

  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="back-link" to="/"> {/* Componente Link irá fazer a página não ser carregada, SPA */}
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o Logon
          </Link>
        </section>
        <form onSubmit={handleRegister}> {/* chamando a função que cadastra uma nova ONG */}
        {/* IDEIA: criar mascara para os inputs */}
          <input 
            placeholder="Nome da ONG"
            value={name} //setando o valor do input
            onChange={e => setName(e.target.value)} /> {/* quando o valor do input mudar, irá armazenar na função setName() o valor que foi setado no input para enviar a API */}
          <input 
            type="email" 
            placeholder="E-mail"
            value={email} //setando o valor do input
            onChange={e => setEmail(e.target.value)}/> {/* quando o valor do input mudar, irá armazenar na função setEmail() o valor que foi setado no input para enviar a API */}
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}/>
            <input 
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)} 
              style={{ width: 80 }}/>
          </div>
          <button 
            className="button" 
            type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;