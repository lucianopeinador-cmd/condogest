 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const perguntasFrequentes = [
  { pergunta: 'Posso multar um morador por barulho excessivo?', resposta: 'Sim. Conforme o art. 1.336 do Codigo Civil e a Convencao do Condominio, o morador que perturbar o sossego alheio esta sujeito a advertencia por escrito e, em caso de reincidencia, multa de ate 5 vezes o valor da taxa condominial. O procedimento correto e: 1) Registrar a ocorrencia por escrito, 2) Enviar advertencia formal com aviso de recebimento, 3) Em caso de reincidencia, aplicar multa por deliberacao em assembleia.' },
  { pergunta: 'Qual o prazo para convocar assembleia ordinaria?', resposta: 'A Assembleia Geral Ordinaria deve ser convocada pelo sindico uma vez por ano, nos primeiros 4 meses do ano (art. 1.350 do Codigo Civil). A convocacao deve ser feita com antecedencia minima de 10 dias, por meio de edital afixado em local de acesso comum e enviado a cada condominoO edital deve conter data, hora, local e pauta da reuniao.' },
  { pergunta: 'Como aplicar uma advertencia corretamente?', resposta: 'Para ter validade juridica, a advertencia deve: 1) Ser emitida por escrito com descricao detalhada da infracao, 2) Citar o artigo da Convencao ou Regulamento Interno violado, 3) Ser entregue com comprovante de recebimento (AR ou assinatura), 4) Ser arquivada com copia no condominio. Sem esses requisitos, a advertencia pode ser contestada judicialmente.' },
  { pergunta: 'O sindico pode proibir obras nos apartamentos?', resposta: 'O sindico pode e deve regulamentar obras. Obras que afetam a estrutura do edificio ou areas comuns exigem autorizacao formal. Para obras internas, o condominio pode exigir: notificacao previa com prazo minimo, horarios permitidos (geralmente dias uteis das 8h as 17h), apresentacao de ART do responsavel tecnico para obras estruturais. A proibicao total de obras nao e legal, mas a regulamentacao e obrigatoria.' },
  { pergunta: 'Como proceder com morador inadimplente ha mais de 90 dias?', resposta: 'Para inadimplencia superior a 90 dias, o caminho juridico e: 1) Notificacao extrajudicial com prazo de 10 dias para regularizacao, 2) Protesto do titulo em cartorio, 3) Acao de cobranca pelo rito sumario (valores ate 40 salarios minimos) ou ordinario. O condominio pode cobrar multa de 2%, juros de 1% ao mes e correcao monetaria. O inadimplente nao perde o direito de voto em assembleia, mas pode ter restricoes a areas de lazer conforme Convencao.' },
];

const documentosLegais = [
  { nome: 'Modelo de Advertencia por Infracao', categoria: 'Advertencia', uso: 'Notificar morador infrator' },
  { nome: 'Modelo de Notificacao de Inadimplencia', categoria: 'Financeiro', uso: 'Cobrar debitos em atraso' },
  { nome: 'Modelo de Edital de Convocacao — AGO', categoria: 'Assembleia', uso: 'Convocar assembleia ordinaria' },
  { nome: 'Modelo de Edital de Convocacao — AGE', categoria: 'Assembleia', uso: 'Convocar assembleia extraordinaria' },
  { nome: 'Modelo de Ata de Assembleia', categoria: 'Assembleia', uso: 'Registrar decisoes em reuniao' },
  { nome: 'Modelo de Contrato de Prestacao de Servicos', categoria: 'Contratos', uso: 'Formalizar contratacao de terceiros' },
];

const checklist = [
  { item: 'AVCB (Auto de Vistoria do Corpo de Bombeiros) em dia', status: 'ok' },
  { item: 'Seguro predial obrigatorio vigente', status: 'ok' },
  { item: 'PCIP — Plano de Controle de Incendio atualizado', status: 'ok' },
  { item: 'Manutencao preventiva de elevadores (NR-12)', status: 'alerta' },
  { item: 'Certificado de para-raios (SPDA) vigente', status: 'ok' },
  { item: 'Limpeza e analise da caixa dagua (semestral)', status: 'ok' },
  { item: 'PPRA — Programa de Prevencao de Riscos Ambientais', status: 'alerta' },
  { item: 'Assembleia Geral Ordinaria realizada no prazo', status: 'pendente' },
  { item: 'Prestacao de contas aprovada em assembleia', status: 'pendente' },
  { item: 'Registro do sindico atualizado no cartorio', status: 'ok' },
];

const styles = {
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
    marginBottom: '24px',
  },
  boxTitulo: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '20px',
  },
  perguntaItem: {
    border: '1px solid var(--cinza-medio)',
    borderRadius: '8px',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  perguntaHeader: {
    padding: '14px 18px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--cinza-claro)',
  },
  perguntaTexto: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
  },
  perguntaResposta: {
    padding: '16px 18px',
    fontSize: '13px',
    color: '#334155',
    lineHeight: '1.7',
    borderTop: '1px solid var(--cinza-medio)',
    backgroundColor: 'var(--branco)',
  },
  docItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  docNome: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '3px',
  },
  docUso: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    marginRight: '8px',
  },
  btnUsar: {
    padding: '6px 14px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 0',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  checkIcone: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
  },
  checkTexto: {
    fontSize: '13px',
    color: 'var(--azul-principal)',
    flex: 1,
  },
};

function getCategoriaBadge(cat) {
  const map = {
    Advertencia: { backgroundColor: '#fef2f2', color: '#dc2626' },
    Financeiro: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Assembleia: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Contratos: { backgroundColor: '#fffbeb', color: '#d97706' },
  };
  return map[cat] || {};
}

function getCheckIcone(status) {
  if (status === 'ok') return { backgroundColor: '#f0fdf4', color: '#16a34a', text: '✓' };
  if (status === 'alerta') return { backgroundColor: '#fffbeb', color: '#d97706', text: '!' };
  return { backgroundColor: '#fef2f2', color: '#dc2626', text: '✗' };
}

export default function Juridico() {
  const [aberta, setAberta] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  return (
    <Layout perfil="sindico" titulo="Juridico" nomeUsuario={nomeUsuario}>

      <div style={styles.box}>
        <div style={styles.boxTitulo}>Assistente Juridico — Perguntas Frequentes</div>
        {perguntasFrequentes.map((p, idx) => (
          <div key={idx} style={styles.perguntaItem}>
            <div style={styles.perguntaHeader} onClick={() => setAberta(aberta === idx ? null : idx)}>
              <span style={styles.perguntaTexto}>{p.pergunta}</span>
              <span style={{ color: 'var(--azul-principal)', fontSize: '18px', fontWeight: '700' }}>
                {aberta === idx ? '−' : '+'}
              </span>
            </div>
            {aberta === idx && (
              <div style={styles.perguntaResposta}>{p.resposta}</div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>Modelos de Documentos Legais</div>
          {documentosLegais.map((d, idx) => (
            <div key={idx} style={styles.docItem}>
              <div>
                <div style={styles.docNome}>{d.nome}</div>
                <div style={styles.docUso}>
                  <span style={{ ...styles.badge, ...getCategoriaBadge(d.categoria) }}>{d.categoria}</span>
                  {d.uso}
                </div>
              </div>
              <button style={styles.btnUsar}>Usar modelo</button>
            </div>
          ))}
        </div>

        <div style={styles.box}>
          <div style={styles.boxTitulo}>Checklist de Obrigacoes Legais</div>
          {checklist.map((c, idx) => {
            const icone = getCheckIcone(c.status);
            return (
              <div key={idx} style={styles.checkItem}>
                <div style={{ ...styles.checkIcone, backgroundColor: icone.backgroundColor, color: icone.color }}>
                  {icone.text}
                </div>
                <span style={styles.checkTexto}>{c.item}</span>
              </div>
            );
          })}
        </div>
      </div>

    </Layout>
  );
}
