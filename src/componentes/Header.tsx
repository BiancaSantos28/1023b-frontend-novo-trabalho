import { jwtDecode } from "jwt-decode";

type TokenData = {
  nome: string;
  tipo: string; // "admin" ou "comum"
};

export default function Header() {
  const token = localStorage.getItem("token");
  let nome = "Visitante";
  let tipo = "";

  if (token) {
    try {
      const decoded = jwtDecode<TokenData>(token);
      nome = decoded.nome;
      tipo = decoded.tipo;
    } catch (e) {
      console.error("Token inválido");
    }
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        background: "#f0f0f0"
      }}
    >
      <span>{nome} ({tipo})</span>
    </header>
  );
}