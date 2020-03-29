import React, { useState } from "react";
/* importando componente LINK para comportamento SPA */
import { Link, useHistory } from "react-router-dom";

// utilizando o pacote de ícones feather icons
// ctrl + space => para mostrar todos os ícones
import { FiLogIn } from "react-icons/fi";

// integração com o back-end
import api from "../../services/api";

import "./styles.css";

// importando image
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    // evitar que o formulário recarregar a pagina
    e.preventDefault();

    try {
      const response = await api.post('sessions', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      // direcionando o usuário para uma rota
      history.push('/profile');
    } catch (err) {
      alert('Falha no login tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>
          {/* link to => mudando de rota sem que o react 
              precise carregar todo o react do zero */}
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não Tenho Cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
