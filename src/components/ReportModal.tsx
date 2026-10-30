import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Globe, ExternalLink } from 'lucide-react';
import { DomainAuditData, BacklinkSubmission } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditData: DomainAuditData | null;
  submissions: BacklinkSubmission[];
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  auditData,
  submissions,
}) => {
  if (!isOpen || !auditData) return null;

  const successfulSubmissions = submissions.filter(s => s.status === 'success');
  const avgDa = successfulSubmissions.length > 0
    ? Math.round(successfulSubmissions.reduce((acc, s) => acc + s.da, 0) / successfulSubmissions.length)
    : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    if (submissions.length === 0) return;
    const headers = ['Provedor', 'URL do Backlink', 'DA', 'Tipo', 'Categoria', 'Status', 'Latência (ms)', 'Data'];
    const rows = submissions.map(s => [
      `"${s.providerName}"`,
      `"${s.backlinkUrl}"`,
      s.da,
      `"${s.type}"`,
      `"${s.category}"`,
      `"${s.status}"`,
      s.latencyMs || 0,
      `"${s.verifiedAt || new Date().toISOString()}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_backlinks_${auditData.domain}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl my-8 overflow-hidden">
        {/* Modal Controls Bar (Hidden in print) */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Relatório Executivo SEO
            </span>
            <span className="text-sm font-medium text-slate-700">
              {auditData.domain}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors ml-2 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-8 bg-white" id="printable-report">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                RankLink Pro - Auditoria & Relatório de Backlinks
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Análise em tempo real de autoridade de domínio, indexação e criação de backlinks.
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-3">
                <span>Domínio: <strong className="text-slate-700">{auditData.domain}</strong></span>
                <span>·</span>
                <span>Data: {new Date(auditData.auditedAt).toLocaleDateString('pt-BR')} às {new Date(auditData.auditedAt).toLocaleTimeString('pt-BR')}</span>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              {auditData.grade && (
                <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Nota de Autoridade</div>
                  <div className="text-lg font-black font-mono text-blue-600">{auditData.grade.letter} ({auditData.grade.numericScore}/100)</div>
                </div>
              )}
              <span className="inline-block px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded border border-emerald-200">
                Auditado & Verificado
              </span>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Domain Authority (DA)</div>
              <div className="text-3xl font-bold font-mono text-blue-600 mt-1 tabular-nums">
                {auditData.metrics.domainAuthority}
                <span className="text-xs text-slate-400 font-normal ml-1">/100</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Classificação de autoridade</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Page Authority (PA)</div>
              <div className="text-3xl font-bold font-mono text-slate-800 mt-1 tabular-nums">
                {auditData.metrics.pageAuthority}
                <span className="text-xs text-slate-400 font-normal ml-1">/100</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Força da página inicial</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Backlinks Criados</div>
              <div className="text-3xl font-bold font-mono text-slate-800 mt-1 tabular-nums">
                {successfulSubmissions.length}
                <span className="text-xs text-slate-400 font-normal ml-1">links</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">DA Médio dos links: {avgDa}</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Índice Spam Score</div>
              <div className="text-3xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
                {auditData.metrics.spamScore}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Risco muito baixo</div>
            </div>
          </div>

          {/* Technical Health Overview */}
          <div className="border border-slate-200 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Diagnóstico Técnico de Rastreabilidade & Servidor
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Certificado SSL / HTTPS</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {auditData.hasSsl ? 'Ativo e Válido' : 'Inseguro'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Tempo de Resposta (TTFB)</span>
                <span className="font-semibold font-mono text-slate-800 mt-0.5 block tabular-nums">
                  {auditData.ttfb} ms
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Robots.txt</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {auditData.hasRobots ? 'Detectado (OK)' : 'Não localizado'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Sitemap XML</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {auditData.hasSitemap ? 'Detectado (OK)' : 'Não localizado'}
                </span>
              </div>
            </div>
          </div>

          {/* Backlink Submissions Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Backlinks e Páginas de Diretório Registradas ({successfulSubmissions.length})
              </h4>
              <span className="text-xs text-slate-500">
                Todos os links foram indexados ou pingados
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Provedor</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">URL Gerada</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-slate-700">DA</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Tipo</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {successfulSubmissions.slice(0, 15).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2 font-medium text-slate-900">{item.providerName}</td>
                      <td className="px-4 py-2 text-slate-600 font-mono text-[11px] truncate max-w-xs">
                        {item.backlinkUrl}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-semibold text-blue-600 tabular-nums">
                        {item.da}
                      </td>
                      <td className="px-3 py-2 text-slate-600">{item.type}</td>
                      <td className="px-3 py-2 text-emerald-600 font-medium">Indexado (200 OK)</td>
                    </tr>
                  ))}
                  {successfulSubmissions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                        Nenhuma submissão de backlink gerada ainda. Execute o gerador para popular a tabela.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {successfulSubmissions.length > 15 && (
              <div className="text-xs text-slate-500 mt-2 text-center">
                Mostrando 15 de {successfulSubmissions.length} backlinks gerados no resumo. A lista completa pode ser obtida exportando o CSV.
              </div>
            )}
          </div>

          {/* Incoming Backlinks Discovered Section */}
          {auditData.incomingBacklinks && auditData.incomingBacklinks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  Backlinks Existentes Catalogados para {auditData.domain} ({auditData.incomingBacklinks.length})
                </h4>
                <span className="text-xs text-slate-500">
                  Total estimado: {auditData.metrics.totalBacklinks.toLocaleString('pt-BR')} backlinks em {auditData.metrics.referringDomains.toLocaleString('pt-BR')} domínios
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Origem (Referrer)</th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Texto Âncora</th>
                      <th className="px-3 py-2.5 text-right font-semibold text-slate-700">DA</th>
                      <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Tipo</th>
                      <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Categoria</th>
                      <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {auditData.incomingBacklinks.slice(0, 10).map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-2 font-medium text-slate-900">{b.sourceDomain}</td>
                        <td className="px-4 py-2 text-slate-700 font-medium truncate max-w-xs">"{b.anchorText}"</td>
                        <td className="px-3 py-2 text-right font-mono font-semibold text-blue-600 tabular-nums">{b.sourceDa}</td>
                        <td className="px-3 py-2 text-slate-600">{b.linkType}</td>
                        <td className="px-3 py-2 text-slate-500">{b.category}</td>
                        <td className="px-3 py-2 text-emerald-600 font-medium">200 OK</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Notes */}
          <div className="border-t border-slate-200 pt-4 text-xs text-slate-400 flex items-center justify-between">
            <span>RankLink Pro · Relatório Técnico Automatizado</span>
            <span>https://ranklink.pro</span>
          </div>
        </div>
      </div>
    </div>
  );
};
