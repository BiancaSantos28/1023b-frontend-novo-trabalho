import { useEffect, useState } from "react";
import axios from "axios";

type Produto = {
  _id: string;
  nome: string;
  preco: number;
  urlfoto: string;
  descricao: string;
};

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/produtos`)
      .then(res => setProdutos(res.data))
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Produtos Disponíveis</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {produtos.map(p => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={p.urlfoto} alt={p.nome} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <p>R$ {p.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
