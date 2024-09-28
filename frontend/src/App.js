import "./styles.css";
import Header from "./header"
import Lista from "./lista/produtos";
import React, { useEffect } from 'react';
import Menu from './menu';
import Entrada from './operacoes/entrada';

function App() {
  useEffect(() => {
    document.title = 'MorningStar Dev Exam';
  }, []);
  return (
    <div className="wrapper">
        <Header/>
      <div>
        <Menu/>
      </div>
      <div className="main">
        <Lista/>
      </div>
    </div>
  );
}

export default App;
