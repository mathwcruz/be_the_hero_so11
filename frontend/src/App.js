import React from 'react'; //sempre importar o 'React' quando for utilizar JSX (lidar com html)
import './global.css';
import Routes from './routes'; //importando as rotas

//Um componente é uma função que retorna um conteúdo html
function App() {
  return ( //retornando o conteúdo html para a página, baseado na rota atual da página
    <div>
      <Routes /> {/* Chamando o componente de rotas */}
    </div>
  );
};

export default App;
