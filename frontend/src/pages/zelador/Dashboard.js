 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const chamadosPendentes = [
  { id: 1, unidade: 'Apto 204', assunto: 'Vazamento no banheiro', prioridade: 'Alta', status: 'Aberto', data: '14/03/2025', categoria: 'Hidraulica' },
  { id: 2, unidade: 'Apto 112', assunto: 'Portao da garagem com defeito', prioridade: 'Alta', status: 'Em andamento', data: '13/03/2025', categoria: 'Eletrica' },
  { id: 3, unidade: 'Apto 301', assunto: 'Lampada queimada no corredor', prioridade: 'Baixa', status: 'Aberto', data: '12/03/2025', categoria: 'Eletrica' },
  { id: 4, unidade: 'Apto 502', assunto: 'Infiltracao na parede', prioridade: 'Alta', status: 'Aberto', data: '10/03/2025', categoria: 'Hidraulica' },
];

const tarefasDiarias = [
  { id: 1, tarefa: 'Limpeza da area de lazer', horario: '08:00', concluida: true },
  { id: 2, tarefa: 'Verificacao da bomba dagua', horario: '09:00', concluida: true },
  { id: 3, tarefa: 'Limpeza do hall de entrada', horario: '10:00', concluida: false },
  { id: 4, tarefa: 'Inspecao dos extintores', horario: '14:00', concluida: false },
  { id: 5, tarefa: 'Verificacao das cameras', horario: '16:00', concluida: false },
];

const styles = {
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
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
    fontSize: '26px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  cardSub: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
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
  chamadoCard: {
    border: '1px solid var(--cinza-medio)',
    borderRadius: '8px',
    padding: '14px',
    marginBottom: '10px',
    borderLeft: '4px solid var(--azul-principal)',
  },
  chamadoTopo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px',
  },
  chamadoUnidade: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
  },
  chamadoAssunto: {
    fontSize: '13px',
    color: 'var(--azul-principal)',
    marginBottom: '8px',
  },
  chamadoRodape: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  btnAtender: {
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    cursor: 'pointer',
    border: 'none',
  },
  tarefaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--cinza-medio)',
    cursor: 'pointer',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid var(--azul-principal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'transparent',
  },
  checkboxMarcado: {
    backgroundColor: 'var(--verde-sucesso)',
    border: '2px solid var(--verde-sucesso)',
  },
  tarefaTexto: {
    flex: 1,
    fontSize: '13px',
    color: 'var(--azul-principal)',
  },
  tarefaHorario: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  btnEmergencia: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'var(--vermelho-alerta)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '800',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  btnNovoChamado: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
  },
};

function getBadge(valor) {
  const map = {
    Alta: { backgroundColor: '#fef2f2', color: '#dc2626' },
    Media: { backgroundColor: '#fffbeb', color: '#d97706' },
    Baixa: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Aberto: { backgroundColor: '#eff6ff', color: '#2563eb' },
    'Em andamento': { backgroundColor: '#fffbeb', color: '#d97706' },
    Concluido: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  };
  return map[valor] || {};
}

function getBordaColor(prioridade) {
  if (prioridade === 'Alta') return '#dc2626';
  if (prioridade === 'Media') return '#d97706';
  return '#16a34a';
}

export default function DashboardZelador() {
  const [tarefas, setTarefas] = useState(tarefasDiarias);
  const [emergenciaAtivada, setEmergenciaAtivada] = useState(false);

  function toggleTarefa(id) {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  }

  function handleEmergencia() {
    setEmergenciaAtivada(true);
    setTimeout(() => setEmergenciaAtivada(false), 4000);
  }

  const concluidas = tarefas.filter(t => t.concluida).length;

  return (
    <Layout perfil="zelador" titulo="Painel do Zelador" nomeUsuario="Zelador">

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Chamados Abertos</div>
          <div style={styles.cardValor}>{chamadosPendentes.filter(c => c.status === 'Aberto').length}</div>
          <div style={styles.cardSub}>Aguardando atendimento</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Em Andamento</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>
            {chamadosPendentes.filter(c => c.status === 'Em andamento').length}
          </div>
          <div style={styles.cardSub}>Em atendimento agora</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Tarefas do Dia</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>{concluidas}/{tarefas.length}</div>
          <div style={styles.cardSub}>Tarefas concluidas hoje</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--vermelho-alerta)' }}>
          <div style={styles.cardLabel}>Prioridade Alta</div>
          <div style={{ ...styles.cardValor, color: 'var(--vermelho-alerta)' }}>
            {chamadosPendentes.filter(c => c.prioridade === 'Alta').length}
          </div>
          <div style={styles.cardSub}>Chamados urgentes</div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>
            Chamados Pendentes
            <span style={{ fontSize: '12px', color: 'var(--vermelho-alerta)', fontWeight: '600' }}>
              {chamadosPendentes.length} abertos
            </span>
          </div>
          {chamadosPendentes.map((c) => (
            <div key={c.id} style={{ ...styles.chamadoCard, borderLeftColor: getBordaColor(c.prioridade) }}>
              <div style={styles.chamadoTopo}>
                <span style={styles.chamadoUnidade}>{c.unidade}</span>
                <span style={{ ...styles.badge, ...getBadge(c.prioridade) }}>{c.prioridade}</span>
              </div>
              <div style={styles.chamadoAssunto}>{c.assunto}</div>
              <div style={styles.chamadoRodape}>
                <span style={{ ...styles.badge, ...getBadge(c.status) }}>{c.status}</span>
                <button style={styles.btnAtender}>Atender</button>
              </div>
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
                Alerta enviado ao sindico e portaria.
              </div>
            ) : (
              <button style={styles.btnEmergencia} onClick={handleEmergencia}>
                Acionar Emergencia
              </button>
            )}
            <button style={styles.btnNovoChamado}>Abrir Novo Chamado</button>
          </div>

          <div style={styles.box}>
            <div style={styles.boxTitulo}>
              Tarefas do Dia
              <span style={{ fontSize: '12px', color: 'var(--verde-sucesso)', fontWeight: '600' }}>
                {concluidas}/{tarefas.length} concluidas
              </span>
            </div>
            {tarefas.map((t) => (
              <div key={t.id} style={styles.tarefaItem} onClick={() => toggleTarefa(t.id)}>
                <div style={{ ...styles.checkbox, ...(t.concluida ? styles.checkboxMarcado : {}) }}>
                  {t.concluida && <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>✓</span>}
                </div>
                <span style={{ ...styles.tarefaTexto, textDecoration: t.concluida ? 'line-through' : 'none', color: t.concluida ? 'var(--cinza-texto)' : 'var(--azul-principal)' }}>
                  {t.tarefa}
                </span>
                <span style={styles.tarefaHorario}>{t.horario}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  );
}
