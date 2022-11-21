export type Book = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

export type CartProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  qtd: number;
}

export type CategoryProps = {
  id: number;
  name: string;
}

export type UserProps = {
  id: number;
  username: string;
}