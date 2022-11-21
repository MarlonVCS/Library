import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';
import { CategoryProps } from '../../globalTypes';

import './styles.css';
import { api } from '../../services/api';

export default function Registration() {
  const [title, setTitle] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [value, setValue] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [data, setData] = useState<CategoryProps[]>([]);

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData = {
      id: id,
      title: title,
      description: description,
      price: value,
      category: category.label
    }
    api.post('books', preparedData)
  }
  
  const handleData = async () => {
    const { data } = await api.get('category');
    setData(data);
  }

  useEffect(() => {
    handleData();
  }, [])

  const options: any = [];
  data.forEach(category => {
    options.push({
      value: category.id, 
      label: category.name
    })
  })

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/loja-de-balcao-da-livraria-com-vetor-de-publicacao_87689-4222.jpg?w=2000"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar novo livro</h1>
          <p>Insira o título do livro, uma breve descrição de seu conteúdo, e o preço a ser cadastrado.</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para página de livros
          </Link>

        </section>
        <form onSubmit={e => e}>
          <input
            placeholder="Título do livro"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div style={{paddingTop: "8px"}}>
            <Select options={options} onChange={e => setCategory(e)} placeholder={"Categoria"} isClearable={true}/>
          </div>

          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}