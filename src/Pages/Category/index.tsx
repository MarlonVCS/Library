import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import { api } from '../../services/api';

export default function Category() {
  const [category, setCategory] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData = {
      id: id,
      name: category,
    }
    await api.post('category', preparedData);
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/loja-de-balcao-da-livraria-com-vetor-de-publicacao_87689-4222.jpg?w=2000"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar nova categoria</h1>
          <p>Insira o título da categoria.</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para página de livros
          </Link>

        </section>
        <form onSubmit={e => e}>
          <h1>Cadastrar categoria</h1>
          <br />
          <input
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}