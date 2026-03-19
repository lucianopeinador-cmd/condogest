 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const comunicados = [
  { id: 1, titulo: 'Manutencao do elevador — Bloco A', data: '15/03/2025', tipo: 'Manutencao', lido: false },
  { id: 2, titulo: 'Assembleia Ordinaria — 28/03/2025', data: '12/03/2025', tipo: 'Assembleia', lido: false },
  { id: 3, titulo: 'Limpeza da caixa dagua — 20/03', data: '10/03/2025', tipo: 'Aviso', lido: true },
  { id: 4, titulo: 'Novo regulamento de uso da piscina', data: '05/03/2025', tipo: 'Regulamento', lido: true },
];

const meusChamados = [
  { id: 1, assunto: 'Vazamento no banheiro', status: 'Em andamento', data: '14/03/2025', prioridade: 'Alta' },
  { id: 2, assunto: 'Lampada queimada corredor', status: 'Concluido', data: '08/03/2025', prioridade: 'Baixa' },
];

const reservas = [
  { local: 'Salao de Festas', data: '22/03/2025', horario: '18:00 - 23:00', status: 'Confirmada' },
];

const styles = {
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '20px 24px',
    boxShadow: 'var(--sombra)',
    borderTop: '4px solid var(--azul-principal)',
  },
  cardLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  cardValor: {
    fontSize: '24px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  cardSub: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  box: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '24px',
    boxShadow: 'var(--sombra)',
  },
  boxTitulo: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comunicadoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--cinza-medio)',
    cursor: 'pointer',
  },
  comunicadoTitulo: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '3px',
  },
  comunicadoData: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  pontoDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--azul-claro)',
    flexShrink: 0,
  },
  chamadoItem: {
    padding: '14px 0',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  chamadoTopo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  chamadoAssunto: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
  },
  chamadoData: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
    marginTop: '4px',
  },
  btnEmergencia: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--vermelho-alerta)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '800',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  btnNovoChamado: {
    width: '100%',
    padding: '13px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
  },
  reservaItem: {
    padding: '14px 0',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  reservaLocal: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  reservaInfo: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
};

function getBadge(valor) {
  const map = {
    Alta: { backgroundColor: '#fef2f2', color: '#dc2626' },
    Media: { backgroundColor: '#fffbeb', color: '#d97706' },
    Baixa: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    'Em andamento': { backgroundColor: '#fffbeb', color: '#d97706' },
    Concluido: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Aberto: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Confirmada: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Manutencao: { backgroundColor: '#fffbeb', color: '#d97706' },
    Assembleia: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Aviso: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Regulamento: { backgroundColor: '#faf5ff', color: '#7c3aed' },
  };
  return map[valor] || {};
}

export default function DashboardMorador() {
  const [emergenciaAtivada, setEmergenciaAtivada] = useState(false);

  function handleEmergencia() {
    setEmergenciaAtivada(true);
    setTimeout(() => setEmergenciaAtivada(false), 4000);
  }

  return (
    <Layout perfil="morador" titulo="Minha Area" nomeUsuario="Morador">

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Minha Unidade</div>
          <div style={styles.cardValor}>Apto 204</div>
          <div style={styles.cardSub}>Bloco B — 2o andar</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Status Financeiro</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>Em dia</div>
          <div style={styles.cardSub}>Proximo vencimento: 10/04/2025</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Chamados Abertos</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>1</div>
          <div style={styles.cardSub}>1 em andamento</div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>
            Comunicados
            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
              2 nao lidos
            </span>
          </div>
          {comunicados.map((c) => (
            <div key={c.id} style={styles.comunicadoItem}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                {!c.lido && <div style={{ ...styles.pontoDot, marginTop: '4px' }} />}
                {c.lido && <div style={{ width: '8px', flexShrink: 0 }} />}
                <div>
                  <div style={{ ...styles.comunicadoTitulo, fontWeight: c.lido ? '500' : '700' }}>
                    {c.titulo}
                  </div>
                  <div style={styles.comunicadoData}>{c.data}</div>
                </div>
              </div>
              <span style={{ ...styles.badge, ...getBadge(c.tipo) }}>{c.tipo}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ ...styles.box, marginBottom: '20px' }}>
            <div style={styles.boxTitulo}>Acoes Rapidas</div>
            {emergenciaAtivada ? (
              <div style={{
                padding: '14px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '13px',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '12px',
              }}>
                Alerta de emergencia enviado ao sindico e portaria.
              </div>
            ) : (
              <button style={styles.btnEmergencia} onClick={handleEmergencia}>
                Acionar Emergencia
              </button>
            )}
            <button style={styles.btnNovoChamado}>Abrir Novo Chamado</button>
          </div>

          <div style={styles.box}>
            <div style={styles.boxTitulo}>Meus Chamados</div>
            {meusChamados.map((c) => (
              <div key={c.id} style={styles.chamadoItem}>
                <div style={styles.chamadoTopo}>
                  <span style={styles.chamadoAssunto}>{c.assunto}</span>
                  <span style={{ ...styles.badge, ...getBadge(c.status) }}>{c.status}</span>
                </div>
                <div style={styles.chamadoData}>{c.data}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.box}>
        <div style={styles.boxTitulo}>Minhas Reservas</div>
        {reservas.length > 0 ? reservas.map((r, idx) => (
          <div key={idx} style={styles.reservaItem}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={styles.reservaLocal}>{r.local}</div>
                <div style={styles.reservaInfo}>{r.data} — {r.horario}</div>
              </div>
              <span style={{ ...styles.badge, ...getBadge(r.status) }}>{r.status}</span>
            </div>
          </div>
        )) : (
          <div style={{ fontSize: '13px', color: 'var(--cinza-texto)' }}>Nenhuma reserva ativa.</div>
        )}
      </div>

    </Layout>
  );
}
