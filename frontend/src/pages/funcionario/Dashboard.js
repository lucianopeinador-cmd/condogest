 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const tarefas = [
  { id: 1, tarefa: 'Limpeza do corredor Bloco A', horario: '08:00', local: 'Bloco A', concluida: true },
  { id: 2, tarefa: 'Limpeza do corredor Bloco B', horario: '09:00', local: 'Bloco B', concluida: true },
  { id: 3, tarefa: 'Limpeza da area da piscina', horario: '10:00', local: 'Area de lazer', concluida: false },
  { id: 4, tarefa: 'Recolhimento do lixo — todos os andares', horario: '11:00', local: 'Todos os blocos', concluida: false },
  { id: 5, tarefa: 'Limpeza do salao de festas', horario: '14:00', local: 'Salao de festas', concluida: false },
  { id: 6, tarefa: 'Limpeza da garagem', horario: '16:00', local: 'Subsolo', concluida: false },
];

const comunicados = [
  { id: 1, titulo: 'Reuniao de equipe — 20/03 as 08:00', data: '15/03/2025', tipo: 'Reuniao' },
  { id: 2, titulo: 'Novo protocolo de limpeza da piscina', data: '12/03/2025', tipo: 'Procedimento' },
  { id: 3, titulo: 'Feriado — sem escala em 21/04', data: '10/03/2025', tipo: 'Aviso' },
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
  tarefaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 0',
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
  },
  checkboxMarcado: {
    backgroundColor: 'var(--verde-sucesso)',
    border: '2px solid var(--verde-sucesso)',
  },
  tarefaInfo: {
    flex: 1,
  },
  tarefaNome: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '2px',
  },
  tarefaLocal: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
  },
  tarefaHorario: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    fontWeight: '600',
  },
  progressoBarra: {
    height: '8px',
    backgroundColor: 'var(--cinza-medio)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  progressoPreenchimento: {
    height: '100%',
    backgroundColor: 'var(--verde-sucesso)',
    borderRadius: '4px',
    transition: 'width 0.3s',
  },
  comunicadoItem: {
    padding: '13px 0',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  comunicadoTitulo: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  comunicadoRodape: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: '20px',
  },
};

function getTipoBadge(tipo) {
  const map = {
    Reuniao: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Procedimento: { backgroundColor: '#fffbeb', color: '#d97706' },
    Aviso: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  };
  return map[tipo] || {};
}

export default function DashboardFuncionario() {
  const [listaTarefas, setListaTarefas] = useState(tarefas);
  const [emergenciaAtivada, setEmergenciaAtivada] = useState(false);

  function toggleTarefa(id) {
    setListaTarefas(listaTarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  }

  function handleEmergencia() {
    setEmergenciaAtivada(true);
    setTimeout(() => setEmergenciaAtivada(false), 4000);
  }

  const concluidas = listaTarefas.filter(t => t.concluida).length;
  const progresso = Math.round((concluidas / listaTarefas.length) * 100);

  return (
    <Layout perfil="funcionario" titulo="Painel do Funcionario" nomeUsuario="Funcionario">

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Tarefas Hoje</div>
          <div style={styles.cardValor}>{listaTarefas.length}</div>
          <div style={styles.cardSub}>Total do dia</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Concluidas</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>{concluidas}</div>
          <div style={styles.cardSub}>Tarefas finalizadas</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Pendentes</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>{listaTarefas.length - concluidas}</div>
          <div style={styles.cardSub}>Aguardando execucao</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: '#2563eb' }}>
          <div style={styles.cardLabel}>Progresso</div>
          <div style={{ ...styles.cardValor, color: '#2563eb' }}>{progresso}%</div>
          <div style={styles.cardSub}>Do dia concluido</div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>
            Minhas Tarefas
            <span style={{ fontSize: '12px', color: 'var(--verde-sucesso)', fontWeight: '600' }}>
              {concluidas}/{listaTarefas.length}
            </span>
          </div>
          <div style={styles.progressoBarra}>
            <div style={{ ...styles.progressoPreenchimento, width: `${progresso}%` }} />
          </div>
          {listaTarefas.map((t) => (
            <div key={t.id} style={styles.tarefaItem} onClick={() => toggleTarefa(t.id)}>
              <div style={{ ...styles.checkbox, ...(t.concluida ? styles.checkboxMarcado : {}) }}>
                {t.concluida && <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>✓</span>}
              </div>
              <div style={styles.tarefaInfo}>
                <div style={{ ...styles.tarefaNome, textDecoration: t.concluida ? 'line-through' : 'none', color: t.concluida ? 'var(--cinza-texto)' : 'var(--azul-principal)' }}>
                  {t.tarefa}
                </div>
                <div style={styles.tarefaLocal}>{t.local}</div>
              </div>
              <span style={styles.tarefaHorario}>{t.horario}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={styles.box}>
            <div style={styles.boxTitulo}>Comunicados</div>
            {comunicados.map((c) => (
              <div key={c.id} style={styles.comunicadoItem}>
                <div style={styles.comunicadoTitulo}>{c.titulo}</div>
                <div style={styles.comunicadoRodape}>
                  <span style={styles.comunicadoData}>{c.data}</span>
                  <span style={{ ...styles.badge, ...getTipoBadge(c.tipo) }}>{c.tipo}</span>
                </div>
              </div>
            ))}

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
                marginTop: '20px',
              }}>
                Alerta de emergencia enviado.
              </div>
            ) : (
              <button style={styles.btnEmergencia} onClick={handleEmergencia}>
                Acionar Emergencia
              </button>
            )}
          </div>
        </div>
      </div>

    </Layout>
  );
}
