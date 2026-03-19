 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const assembleias = [
  {
    id: 1,
    titulo: 'Assembleia Ordinaria 2025',
    data: '28/03/2025',
    horario: '19:00',
    tipo: 'Ordinaria',
    status: 'Agendada',
    confirmados: 12,
    total: 48,
    pauta: ['Aprovacao das contas de 2024', 'Previsao orcamentaria 2025', 'Eleicao de sindico', 'Obras de reforma da fachada'],
  },
  {
    id: 2,
    titulo: 'Assembleia Extraordinaria — Reforma',
    data: '10/02/2025',
    horario: '18:30',
    tipo: 'Extraordinaria',
    status: 'Realizada',
    confirmados: 31,
    total: 48,
    pauta: ['Aprovacao de orcamento para reforma da piscina', 'Contratacao de empresa especializada'],
  },
  {
    id: 3,
    titulo: 'Assembleia Extraordinaria — Seguranca',
    data: '15/11/2024',
    horario: '19:30',
    tipo: 'Extraordinaria',
    status: 'Realizada',
    confirmados: 28,
    total: 48,
    pauta: ['Instalacao de cameras no subsolo', 'Contratacao de portaria 24h'],
  },
];

const votacoes = [
  { assunto: 'Aprovacao da reforma da piscina', sim: 28, nao: 3, abstencao: 0, resultado: 'Aprovado' },
  { assunto: 'Aumento da taxa condominial em 8%', sim: 19, nao: 9, abstencao: 3, resultado: 'Aprovado' },
  { assunto: 'Contratacao de empresa de limpeza', sim: 14, nao: 14, abstencao: 3, resultado: 'Empate' },
];

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '28px',
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
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnNovo: {
    padding: '8px 16px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  assembleiaCard: {
    border: '1px solid var(--cinza-medio)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  assembleiaTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  assembleiaTitulo: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  assembleiaInfo: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  progressoBox: {
    marginTop: '10px',
  },
  progressoLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    marginBottom: '6px',
  },
  progressoBarra: {
    height: '6px',
    backgroundColor: 'var(--cinza-medio)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressoPreenchimento: {
    height: '100%',
    backgroundColor: 'var(--azul-principal)',
    borderRadius: '3px',
  },
  votacaoCard: {
    border: '1px solid var(--cinza-medio)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
  },
  votacaoAssunto: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '12px',
  },
  votacaoBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  votacaoLinha: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  votacaoLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    width: '70px',
  },
  votacaoBarraBox: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--cinza-medio)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  votacaoNumero: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    width: '24px',
    textAlign: 'right',
  },
  modal: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modalBox: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '32px',
    width: '540px',
    boxShadow: 'var(--sombra-forte)',
  },
  modalTitulo: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '20px',
  },
  modalLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
    marginTop: '14px',
  },
  modalValor: {
    fontSize: '14px',
    color: 'var(--azul-principal)',
    fontWeight: '500',
  },
  pautaItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '8px 0',
    borderBottom: '1px solid var(--cinza-medio)',
    fontSize: '13px',
    color: 'var(--azul-principal)',
  },
  pautaNumero: {
    fontWeight: '700',
    color: 'var(--azul-principal)',
    minWidth: '20px',
  },
  modalBotoes: {
    display: 'flex',
    gap: '10px',
    marginTop: '24px',
  },
  btnPrimario: {
    flex: 1,
    padding: '11px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
  },
  btnSecundario: {
    flex: 1,
    padding: '11px',
    backgroundColor: 'var(--cinza-claro)',
    color: 'var(--azul-principal)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
};

function getStatusBadge(status) {
  const map = {
    Agendada: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Realizada: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Cancelada: { backgroundColor: '#fef2f2', color: '#dc2626' },
  };
  return map[status] || {};
}

function getTipoBadge(tipo) {
  const map = {
    Ordinaria: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Extraordinaria: { backgroundColor: '#fffbeb', color: '#d97706' },
  };
  return map[tipo] || {};
}

export default function Assembleias() {
  const [selecionada, setSelecionada] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  return (
    <Layout perfil="sindico" titulo="Assembleias" nomeUsuario={nomeUsuario}>

      <div style={styles.grid}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>
            Assembleias
            <button style={styles.btnNovo}>Nova Assembleia</button>
          </div>
          {assembleias.map((a) => (
            <div
              key={a.id}
              style={styles.assembleiaCard}
              onClick={() => setSelecionada(a)}
            >
              <div style={styles.assembleiaTop}>
                <div>
                  <div style={styles.assembleiaTitulo}>{a.titulo}</div>
                  <div style={styles.assembleiaInfo}>{a.data} as {a.horario}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <span style={{ ...styles.badge, ...getStatusBadge(a.status) }}>{a.status}</span>
                  <span style={{ ...styles.badge, ...getTipoBadge(a.tipo) }}>{a.tipo}</span>
                </div>
              </div>
              <div style={styles.progressoBox}>
                <div style={styles.progressoLabel}>
                  <span>Confirmacoes</span>
                  <span>{a.confirmados} de {a.total}</span>
                </div>
                <div style={styles.progressoBarra}>
                  <div style={{ ...styles.progressoPreenchimento, width: `${(a.confirmados / a.total) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.box}>
          <div style={styles.boxTitulo}>Resultado das Votacoes</div>
          {votacoes.map((v, idx) => {
            const total = v.sim + v.nao + v.abstencao;
            return (
              <div key={idx} style={styles.votacaoCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={styles.votacaoAssunto}>{v.assunto}</div>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: v.resultado === 'Aprovado' ? '#f0fdf4' : '#fffbeb',
                    color: v.resultado === 'Aprovado' ? '#16a34a' : '#d97706',
                  }}>{v.resultado}</span>
                </div>
                <div style={styles.votacaoBars}>
                  {[
                    { label: 'A favor', valor: v.sim, cor: '#16a34a' },
                    { label: 'Contra', valor: v.nao, cor: '#dc2626' },
                    { label: 'Abstencao', valor: v.abstencao, cor: '#64748b' },
                  ].map((item) => (
                    <div key={item.label} style={styles.votacaoLinha}>
                      <div style={styles.votacaoLabel}>{item.label}</div>
                      <div style={styles.votacaoBarraBox}>
                        <div style={{ height: '100%', width: `${total > 0 ? (item.valor / total) * 100 : 0}%`, backgroundColor: item.cor, borderRadius: '4px' }} />
                      </div>
                      <div style={styles.votacaoNumero}>{item.valor}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selecionada && (
        <div style={styles.modal} onClick={() => setSelecionada(null)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitulo}>{selecionada.titulo}</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span style={{ ...styles.badge, ...getStatusBadge(selecionada.status) }}>{selecionada.status}</span>
              <span style={{ ...styles.badge, ...getTipoBadge(selecionada.tipo) }}>{selecionada.tipo}</span>
            </div>
            <div style={styles.modalLabel}>Data e Horario</div>
            <div style={styles.modalValor}>{selecionada.data} as {selecionada.horario}</div>
            <div style={styles.modalLabel}>Confirmacoes</div>
            <div style={styles.modalValor}>{selecionada.confirmados} de {selecionada.total} unidades</div>
            <div style={styles.modalLabel}>Pauta</div>
            {selecionada.pauta.map((item, idx) => (
              <div key={idx} style={styles.pautaItem}>
                <span style={styles.pautaNumero}>{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
            <div style={styles.modalBotoes}>
              <button style={styles.btnPrimario}>Enviar Convocacao</button>
              <button style={styles.btnSecundario} onClick={() => setSelecionada(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
