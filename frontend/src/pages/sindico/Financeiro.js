 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const dadosMensais = [
  { mes: 'Out', receita: 42000, despesa: 31000 },
  { mes: 'Nov', receita: 44500, despesa: 33000 },
  { mes: 'Dez', receita: 41000, despesa: 38000 },
  { mes: 'Jan', receita: 46000, despesa: 32000 },
  { mes: 'Fev', receita: 43000, despesa: 29000 },
  { mes: 'Mar', receita: 47500, despesa: 34000 },
];

const inadimplentes = [
  { unidade: 'Apto 102', morador: 'Carlos Souza', valor: 'R$ 1.320,00', meses: 2, risco: 'Medio' },
  { unidade: 'Apto 215', morador: 'Ana Lima', valor: 'R$ 2.640,00', meses: 4, risco: 'Alto' },
  { unidade: 'Apto 308', morador: 'Pedro Alves', valor: 'R$ 660,00', meses: 1, risco: 'Baixo' },
  { unidade: 'Apto 410', morador: 'Julia Ferreira', valor: 'R$ 3.960,00', meses: 6, risco: 'Alto' },
  { unidade: 'Apto 501', morador: 'Marcos Costa', valor: 'R$ 1.320,00', meses: 2, risco: 'Medio' },
];

const despesas = [
  { descricao: 'Folha de pagamento', categoria: 'Pessoal', valor: 'R$ 18.400,00', data: '05/03/2025' },
  { descricao: 'Manutencao elevadores', categoria: 'Manutencao', valor: 'R$ 3.200,00', data: '08/03/2025' },
  { descricao: 'Conta de agua', categoria: 'Utilities', valor: 'R$ 4.100,00', data: '10/03/2025' },
  { descricao: 'Conta de energia', categoria: 'Utilities', valor: 'R$ 5.800,00', data: '10/03/2025' },
  { descricao: 'Seguro predial', categoria: 'Seguros', valor: 'R$ 1.200,00', data: '15/03/2025' },
];

const styles = {
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '28px',
  },
  card: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '24px',
    boxShadow: 'var(--sombra)',
    borderTop: '4px solid var(--azul-principal)',
  },
  cardLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '10px',
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
  grid2: {
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
  tabela: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontSize: '11px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '0 16px 12px',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  td: {
    padding: '13px 16px',
    fontSize: '13px',
    color: 'var(--azul-principal)',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  btnAcao: {
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    cursor: 'pointer',
    border: 'none',
  },
};

function getRiscoBadge(risco) {
  const map = {
    Alto: { backgroundColor: '#fef2f2', color: '#dc2626' },
    Medio: { backgroundColor: '#fffbeb', color: '#d97706' },
    Baixo: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  };
  return map[risco] || {};
}

export default function Financeiro() {
  
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  return (
    <Layout perfil="sindico" titulo="Financeiro" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Receita do Mes</div>
          <div style={styles.cardValor}>R$ 47.500</div>
          <div style={styles.cardSub}>Referente a Marco 2025</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--vermelho-alerta)' }}>
          <div style={styles.cardLabel}>Total Inadimplente</div>
          <div style={{ ...styles.cardValor, color: 'var(--vermelho-alerta)' }}>R$ 9.900</div>
          <div style={styles.cardSub}>5 unidades em atraso</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Despesas do Mes</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>R$ 34.000</div>
          <div style={styles.cardSub}>71,6% da receita</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Fundo de Reserva</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>R$ 82.400</div>
          <div style={styles.cardSub}>Saldo atual acumulado</div>
        </div>
      </div>

      <div style={{ ...styles.box, marginBottom: '28px' }}>
        <div style={styles.boxTitulo}>Receita x Despesa — Ultimos 6 meses</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={dadosMensais}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
            <Legend />
            <Bar dataKey="receita" name="Receita" fill="#1a3a6b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesa" name="Despesa" fill="#dc2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>
            Inadimplentes
            <span style={{ fontSize: '12px', color: 'var(--vermelho-alerta)', fontWeight: '600' }}>
              5 unidades
            </span>
          </div>
          <table style={styles.tabela}>
            <thead>
              <tr>
                <th style={styles.th}>Unidade</th>
                <th style={styles.th}>Valor</th>
                <th style={styles.th}>Risco</th>
                <th style={styles.th}>Acao</th>
              </tr>
            </thead>
            <tbody>
              {inadimplentes.map((i, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '600' }}>{i.unidade}</div>
                    <div style={{ fontSize: '11px', color: 'var(--cinza-texto)' }}>{i.morador}</div>
                  </td>
                  <td style={styles.td}>{i.valor}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...getRiscoBadge(i.risco) }}>{i.risco}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btnAcao}>Cobrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.box}>
          <div style={styles.boxTitulo}>Despesas do Mes</div>
          <table style={styles.tabela}>
            <thead>
              <tr>
                <th style={styles.th}>Descricao</th>
                <th style={styles.th}>Categoria</th>
                <th style={styles.th}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((d, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '600' }}>{d.descricao}</div>
                    <div style={{ fontSize: '11px', color: 'var(--cinza-texto)' }}>{d.data}</div>
                  </td>
                  <td style={styles.td}>{d.categoria}</td>
                  <td style={styles.td}>{d.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </Layout>
  );
}
