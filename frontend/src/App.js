import "./styles.css";
import Header from "./header"
import Lista from "./lista/produtos";
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'MorningStar Dev Exam';
  }, []);
  return (
    <div className="wrapper">
        <Header/>
      <div className="main">
        <Lista/>
      </div>
    </div>
  );
}

export default App;
