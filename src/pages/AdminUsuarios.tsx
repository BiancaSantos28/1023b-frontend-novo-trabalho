import { useEffect, useState } from "react";
import axios from "axios";

type Usuario = {
  _id: string;
  nome: string;
  tipo: string;
};

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/admin/usuarios`)
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Erro ao carregar usuários:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Usuários Cadastrados</h2>
      {usuarios.length === 0 && <p>Nenhum usuário encontrado.</p>}
      <ul>
        {usuarios.map(u => (
          <li key={u._id}>{u.nome} ({u.tipo})</li>
        ))}
      </ul>
    </div>
  );
}
