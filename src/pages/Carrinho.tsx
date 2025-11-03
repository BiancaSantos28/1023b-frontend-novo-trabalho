import { useEffect, useState } from "react";
import axios from "axios";

type Item = {
  _id: string;
  nome: string;
  preco: number;
  quantidade: number;
};

export default function Carrinho() {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/carrinho`)
      .then(res => setItens(res.data))
      .catch(err => console.error("Erro ao carregar carrinho:", err));
  }, []);

  const alterarQuantidade = (id: string, novaQtd: number) => {
    if (novaQtd < 1) return; // não permite quantidade menor que 1

    axios.put(`${process.env.REACT_APP_API_URL}/carrinho/${id}/quantidade`, { quantidade: novaQtd })
      .then(() => {
        setItens(prev => prev.map(i => i._id === id ? { ...i, quantidade: novaQtd } : i));
      })
      .catch(err => console.error("Erro ao alterar quantidade:", err));
  };

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrinho</h2>
      {itens.length === 0 && <p>O carrinho está vazio.</p>}
      {itens.map(item => (
        <div key={item._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{item.nome}</h3>
          <p>R$ {item.preco.toFixed(2)}</p>
          <p>
            Quantidade:
            <button onClick={() => alterarQuantidade(item._id, item.quantidade - 1)} disabled={item.quantidade <= 1}>-</button>
            {item.quantidade}
            <button onClick={() => alterarQuantidade(item._id, item.quantidade + 1)}>+</button>
          </p>
        </div>
      ))}
      <h3>Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
}

