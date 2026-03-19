import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState("sindico");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const rotas = { sindico: "/sindico/dashboard", morador: "/morador/dashboard", zelador: "/zelador/dashboard", funcionario: "/funcionario/dashboard" };

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const resposta = await api.post("/auth/login", { email, senha, perfil });
      const { token, usuario } = resposta.data;
      localStorage.setItem("token", token);
      localStorage.setItem("perfil", usuario.perfil);
      localStorage.setItem("nomeUsuario", usuario.nome);
      navigate(rotas[usuario.perfil]);
    } catch (err) {
      setErro("E-mail ou senha incorretos.");
    } finally {
      setCarregando(false);
    }
  }

  const s = { container: { minHeight: "100vh", display: "flex", backgroundColor: "var(--branco)" }, left: { width: "55%", backgroundColor: "var(--azul-principal)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px" }, right: { width: "45%", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px" }, box: { width: "100%", maxWidth: "380px" }, titulo: { color: "var(--branco)", fontSize: "42px", fontWeight: "800", lineHeight: "1.2", marginBottom: "24px" }, sub: { color: "rgba(255,255,255,0.7)", fontSize: "17px", lineHeight: "1.7", maxWidth: "440px", marginBottom: "48px" }, tag: { color: "rgba(255,255,255,0.6)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "24px" }, label: { display: "block", fontSize: "13px", fontWeight: "600", color: "var(--azul-principal)", marginBottom: "6px" }, input: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--cinza-medio)", borderRadius: "8px", fontSize: "14px", color: "var(--azul-principal)", marginBottom: "20px" }, select: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--cinza-medio)", borderRadius: "8px", fontSize: "14px", color: "var(--azul-principal)", marginBottom: "28px", backgroundColor: "var(--branco)" }, btn: { width: "100%", padding: "14px", backgroundColor: "var(--azul-principal)", color: "var(--branco)", borderRadius: "8px", fontSize: "15px", fontWeight: "700", border: "none", cursor: "pointer", marginBottom: "16px" }, erro: { color: "var(--vermelho-alerta)", fontSize: "13px", marginBottom: "16px", padding: "10px 14px", backgroundColor: "#fef2f2", borderRadius: "6px", border: "1px solid #fecaca" }, preco: { textAlign: "center", fontSize: "12px", color: "var(--cinza-texto)", marginTop: "24px" }, dot: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--branco)", flexShrink: 0 }, benef: { display: "flex", flexDirection: "column", gap: "16px" }, benefItem: { display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.85)", fontSize: "15px" } };

  return (
    <div style={s.container}>
      <div style={s.left}>
        <div style={s.tag}>Gestao de Condominio</div>
        <div style={s.titulo}>A plataforma que o seu condominio precisava.</div>
        <div style={s.sub}>Controle financeiro, chamados, assembleias e comunicacao em um unico lugar.</div>
        <div style={s.benef}>
          {["Reducao de inadimplencia","Transparencia total","Assembleias digitais","Assistente juridico","Relatorios automaticos"].map(b => <div key={b} style={s.benefItem}><div style={s.dot}/><span>{b}</span></div>)}
        </div>
      </div>
      <div style={s.right}>
        <div style={s.box}>
          <div style={{ fontSize: "26px", fontWeight: "700", color: "var(--azul-principal)", marginBottom: "8px" }}>Bem-vindo de volta</div>
          <div style={{ fontSize: "14px", color: "var(--cinza-texto)", marginBottom: "40px" }}>Acesse sua conta para continuar</div>
          <form onSubmit={handleLogin}>
            <label style={s.label}>Perfil de acesso</label>
            <select style={s.select} value={perfil} onChange={e => setPerfil(e.target.value)}>
              <option value="sindico">Sindico</option>
              <option value="morador">Morador</option>
              <option value="zelador">Zelador</option>
              <option value="funcionario">Funcionario</option>
            </select>
            <label style={s.label}>E-mail</label>
            <input style={s.input} type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label style={s.label}>Senha</label>
            <input style={s.input} type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} required/>
            {erro && <div style={s.erro}>{erro}</div>}
            <button type="submit" style={s.btn}>{carregando ? "Entrando..." : "Acessar plataforma"}</button>
          </form>
          <div style={s.preco}>Plano Professional — <span style={{ fontWeight: "700", color: "var(--azul-principal)" }}>R$ 109,90 / mes</span></div>
        </div>
      </div>
    </div>
  );
}