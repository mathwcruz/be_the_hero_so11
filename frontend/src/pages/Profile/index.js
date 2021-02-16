import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

function Profile() {
  const [incidents, setIncidents] = useState([]); //irá iniciar como um array vazio

  const ongId = localStorage.getItem('ongId'); //pegando o id da ONG que acabou de logar para setar os casos da ong no html
  const ongName = localStorage.getItem('ongName'); //pegando o nome da ONG que acabou de logar para setar no html

  const history = useHistory();

  //função que irá pegar os casos respectivos da ONG logada e setar no html
  useEffect(() => {//o método useEffect() recebe dois parâmetros, a função a ser executada e quando executar essa função, é um array
                  //se o array ficar vazio, ele irá executar apenas uma vez a função na página
    api.get('profile', {
      headers: {
        Authorization: ongId,
      } 
    }).then(response => { //pegando todos os casos criados pela ong para setar no html
      setIncidents(response.data) //setando na variável 'incidents' todas as informações trazidas do backend
    }); 
  }, [ongId]); 

  //função que irá deletar um caso
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId //passando o id da ONG que criou o caso para o back validar a remoção
        }
      }); //enviando o id do caso e usando o método 'delete' para deletar o caso no banco
      setIncidents(incidents.filter(incident => incident.id !== id)); //filtrando apenas os incidents que não foram deletados ao chamar a função
    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente, por favor');
    };
  };

  function handleLogout() {
    localStorage.clear(); //limpando as informações armazenadas no locaStorage
    history.push('/'); //enviando o usuário a área de login
  };

  return (
    <div className="profile-container">
      <header>
        <img 
          src={LogoImg} 
          alt="Be The Hero"
        />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new"> {/* Componente Link irá fazer a página não ser carregada, SPA */}
          Cadastrar um novo caso 
        </Link>

        <button 
          type="button"
          onClick={handleLogout} //ao clicar no botão, irá finalizar a sessão do usuário e mandá-lo a área de login
          >
          <FiPower 
            size={ 18 } 
            color="#E02041"
          />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => ( //percorrendo o array de indicents para setar cada caso na tela, com suas respectivas informações e retornando esses dados
          <li key={incident.id}> {/* passando a propriedade 'key' para o React saber qual caso está sendo setado na página */}
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl
              .NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' }
              ).format(incident.value)}</p> {/* formatando a moeda prara R$ */}

            <button 
              type="button"
              onClick={() => handleDeleteIncident(incident.id)} //ao clicar no botão, irá enviar o id pro método DELETE e irá excluir o caso
                                                                //deve-se passar uma função antes, caso contrário, irá deletar todos os casos assim que abrir a página
            >
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))};
      </ul>
    </div>
  );
};

export default Profile;