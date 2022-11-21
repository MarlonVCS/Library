import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFileText, FiPower, FiShoppingCart } from 'react-icons/fi';
import { Book, UserProps } from '../../globalTypes';
import { api } from '../../services/api';

export default function Marketplace() {

  //#region data
  const [data, setData] = useState<Book[]>([]);
  const [user, setUser] = useState<UserProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const log: string[] = [];
  user.forEach(item => {
    log.push(item.username)
  })

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const { data } = await api.get('books');
    const { data: newData } = await api.get('userLog');
    setData(data);
    setUser(newData);
  }

  //#endregion

  //#region navigation
  const history = useNavigate();

  const cartList = () => {
    history("/cart")
  }

  const homeList = () => {
    history("/home")
  }
  //#endregion

  //#region funcitions
  const handleAddCart = (id: number, title: string, description: string, price: number) => {
    const preparedData = {
      id: id,
      title: title,
      description: description,
      price: price,
      qtd: 1
    }
    api.post("cart", preparedData)
    handleData();
  }

  const handleLogout = () => {
    history("/")
  }

  const handleChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  const filter = !!searchValue ?
    data.filter(book => {
      return book.category.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : data;

  //#endregion


  return (
    <div className="profile-container">

      <header>
        <img src={"https://i.imgur.com/dOF75ol.png"} alt="livrary" className="icon" />
        <span>Bem vindo!</span>

        <Link className="" to=""></Link>
        {log[0] === 'admin' ? <div>
          <button onClick={homeList} type="button">
            <FiFileText size={18} color="black" />
          </button>
        </div> : <div></div>}
        <button onClick={cartList} type="button">
          <FiShoppingCart size={18} color="black" />
        </button>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Adicionar ao carrinho</h1>

      <div className="search-container">
        <input
          className="text-input"
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Buscar por categoria"
        />
      </div>

      <ul>
        {filter.length > 0 && (
          filter.map(book => (
            <li key={book.id}>
              <strong>LIVRO:</strong>
              <p>{book.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{book.description}</p>

              <strong>CATEGORIA:</strong>
              <p>{book.category}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</p>

              <button onClick={e => handleAddCart(book.id, book.title, book.description, book.price)} type="button">
                <Link className="buttonCart" to="">+ Carrinho</Link>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}