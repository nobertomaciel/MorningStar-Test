// Importing modules
import React from "react";
import logo from "./img/logo-white.png";
import "./styles.css";

function Header() {
	return (
		<div className="App">
			<header className="App-header">
                <table width={"100%"}>
					<tr>
                        <td><img src={logo} width="246px" height="42px" className="App-logo" alt="logotipo"></img></td>
                        <td><h3>Cadastro de mercadorias</h3></td>
                    </tr>
				</table>
			</header>
		</div>
	);
}

export default Header;
