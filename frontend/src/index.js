import React from 'react';
import ReactDOM from 'react-dom'; //interação do react com a DOM do browser
import App from './App';

ReactDOM.render( // renderizar "render" é colocar em tela
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //renderizando o que conteúdo imbutido no arquivo App.js no elemento com id = root, que é a div no html
);