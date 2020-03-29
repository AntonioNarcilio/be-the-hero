import React, { useState } from "react";
/* importando componente LINK para comportamento SPA */
import { Link, useHistory } from "react-router-dom";
// utilizando o pacote de ícones feather icons
// ctrl + space => para mostrar todos os ícones
import { FiArrowLeft } from "react-icons/fi";

// integração com o back-end
import api from "../../services/api";

import "./styles.css";
// importando image
import logoImg from "../../assets/logo.svg";

export default function Register() {
  // armazenando os dados dos inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  // responsável por fazer o cadastro do usuário
  async function handleRegister(e) {
    // prevenir comportamento padrão no formulário
    // evitar que a pagina recarregue toda vez que clica no botão
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      // enviando dados para a api
      const response = await api.post("ongs", data);
      // ao utilizar a crase  {``}, pode-se colocar variáveis dentro de um alert
      alert(`Seu ID de acesso: ${response.data.id}`);
      // enviando o usuário para uma determinada rota
      history.push('/');
    } catch (err) {
      alert("Erro no cadastro tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sia ONG.
          </p>

          {/* link to => mudando de rota sem que o react 
              precise carregar todo o react do zero */}
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não Tenho Cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
