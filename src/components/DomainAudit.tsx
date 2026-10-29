import React, { useState } from 'react';
import { Globe2, ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, ExternalLink, Zap, ArrowUpRight, HelpCircle, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { DomainAuditData } from '../types';

interface DomainAuditProps {
  auditData: DomainAuditData | null;
  isLoading: boolean;
  onAuditUrl: (url: string) => void;
  onNavigateToGenerator: () => void;
  onOpenReport: () => void;
}

export const DomainAudit: React.FC<DomainAuditProps> = ({
  auditData,
  isLoading,
  onAuditUrl,
  onNavigateToGenerator,
  onOpenReport,
}) => {
  const [inputUrl, setInputUrl] = useState(auditData?.domain || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onAuditUrl(inputUrl.trim());
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Relatório de Autoridade de Domínio em Tempo Real
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Diagnóstico instantâneo de Domain Authority (DA), Page Authority (PA), Spam Score, perfil de texto âncora e infraestrutura técnica de rastreamento.
          </p>
        </div>

        {auditData && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAuditUrl(auditData.domain)}
              disabled={isLoading}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Recalcular Métricas</span>
            </button>
            <button
              onClick={onOpenReport}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Gerar Relatório Completo</span>
            </button>
          </div>
        )}
      </div>

      {/* URL Input Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite o domínio para auditar (ex: globo.com, meusite.com.br)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditando Servidor...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Auditar Domínio Agora</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Content View */}
      {auditData ? (
        <div className="space-y-8">
          {/* Main Authority Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Domain Authority (DA) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Domain Authority (DA)</span>
                <span className="text-[11px] font-mono text-slate-400">Escala Moz 1-100</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-blue-600 tracking-tight tabular-nums">
                  {auditData.metrics.domainAuthority}
                </span>
                <span className="text-sm text-slate-400 font-mono">/100</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${auditData.metrics.domainAuthority}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2.5">
                {auditData.metrics.domainAuthority >= 60
                  ? 'Autoridade excelente para disputar palavras-chave competitivas.'
                  : auditData.metrics.domainAuthority >= 30
                  ? 'Autoridade moderada. Criação de backlinks acelerará seu ranqueamento.'
                  : 'Domínio inicial. Recomendada campanha contínua de criação de links.'}
              </p>
            </div>

            {/* Page Authority (PA) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Page Authority (PA)</span>
                <span className="text-[11px] font-mono text-slate-400">Página Raiz</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-slate-900 tracking-tight tabular-nums">
                  {auditData.metrics.pageAuthority}
                </span>
                <span className="text-sm text-slate-400 font-mono">/100</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${auditData.metrics.pageAuthority}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2.5">
                Capacidade da URL raiz de ranquear organicamente nos resultados de pesquisa.
              </p>
            </div>

            {/* Spam Score */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Índice de Spam Score</span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                  {auditData.metrics.spamScore <= 5 ? 'Seguro' : 'Atenção'}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className={`text-4xl font-extrabold font-mono tracking-tight tabular-nums ${
                  auditData.metrics.spamScore <= 5 ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {auditData.metrics.spamScore}%
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    auditData.metrics.spamScore <= 5 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.max(8, auditData.metrics.spamScore)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2.5">
                {auditData.metrics.spamScore <= 5
                  ? 'Perfil de backlinks saudável sem risco de penalidades pelo algoritmo do Google.'
                  : 'Monitorar links suspeitos e submeter arquivo de desautorização (disavow).'}
              </p>
            </div>

            {/* Trust Flow & Citation Flow */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Trust Flow / Citation Flow</span>
                <span className="text-[11px] font-mono text-slate-400">Equilíbrio TF/CF</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Trust (TF)</span>
                  <span className="text-2xl font-bold font-mono text-slate-800 tabular-nums">
                    {auditData.metrics.trustFlow}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Citation (CF)</span>
                  <span className="text-2xl font-bold font-mono text-slate-800 tabular-nums">
                    {auditData.metrics.citationFlow}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Proporção: <strong className="font-mono text-slate-700">{(auditData.metrics.trustFlow / Math.max(1, auditData.metrics.citationFlow)).toFixed(2)}</strong> (Ideal ≥ 0.70)
              </div>
            </div>
          </div>

          {/* Secondary Stats Row: Links, Referring Domains, Dofollow Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Estimado de Backlinks</span>
              <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {auditData.metrics.totalBacklinks.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Conexões ativas apontando para páginas sob este domínio.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Domínios de Referência Únicos</span>
              <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {auditData.metrics.referringDomains.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Websites independentes diferentes com pelo menos um link ativo.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Distribuição Dofollow vs Nofollow</span>
              <div className="mt-2 flex items-center justify-between text-sm font-mono font-semibold text-slate-800 tabular-nums">
                <span className="text-emerald-700">{auditData.metrics.dofollowPercent}% Dofollow</span>
                <span className="text-slate-500">{auditData.metrics.nofollowPercent}% Nofollow</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden flex">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${auditData.metrics.dofollowPercent}%` }}
                />
                <div
                  className="bg-slate-300 h-full"
                  style={{ width: `${auditData.metrics.nofollowPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Technical Diagnostics & Signals */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              Verificação Técnica de Infraestrutura e Rastreamento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  {auditData.hasSsl ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Criptografia SSL (HTTPS)</span>
                  <span className="text-slate-500 mt-0.5 block">
                    {auditData.hasSsl ? 'Certificado válido ativo' : 'Alerta: site sem HTTPS'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Velocidade TTFB</span>
                  <span className="text-slate-500 font-mono mt-0.5 block tabular-nums">
                    {auditData.ttfb} ms ({auditData.ttfb < 300 ? 'Excelente' : 'Aceitável'})
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  {auditData.hasRobots ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Diretivas Robots.txt</span>
                  <span className="text-slate-500 mt-0.5 block">
                    {auditData.hasRobots ? 'Arquivo presente no servidor' : 'Não encontrado na raiz'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  {auditData.hasSitemap ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Sitemap XML</span>
                  <span className="text-slate-500 mt-0.5 block">
                    {auditData.hasSitemap ? 'Mapeado para indexadores' : 'Recomendado cadastrar'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Status HTTP</span>
                  <span className="text-slate-500 font-mono mt-0.5 block tabular-nums">
                    {auditData.httpStatus} OK (Acessível)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  <Globe2 className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Servidor Web</span>
                  <span className="text-slate-500 font-mono mt-0.5 block truncate max-w-[170px]">
                    {auditData.serverHeader}
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Tags Preview Box */}
            <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-slate-700 mb-1">Snippet detectado na página inicial:</div>
              <div className="text-sm font-semibold text-blue-800 line-clamp-1">{auditData.title}</div>
              <div className="text-xs font-mono text-emerald-700 mt-0.5">{auditData.url}</div>
              <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{auditData.description}</div>
            </div>
          </div>

          {/* Anchor Text Distribution Profile */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              Perfil de Textos Âncora Identificados
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Uma distribuição equilibrada entre marca, termos exatos e URLs diretas previne penalizações algorítmicas do Google Penguin.
            </p>

            <div className="space-y-3">
              {auditData.anchorTexts.map((anchor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">
                      "{anchor.anchor}" <span className="text-slate-400 font-normal">({anchor.type})</span>
                    </span>
                    <span className="font-mono font-semibold text-slate-700 tabular-nums">
                      {anchor.percentage}% <span className="text-slate-400 font-normal">({anchor.count.toLocaleString('pt-BR')} links)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${anchor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Next Steps Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold">
                Deseja impulsionar a Autoridade de Domínio deste site?
              </h4>
              <p className="text-xs text-blue-200 mt-1 max-w-xl leading-relaxed">
                Execute o Gerador de Backlinks para submeter este site a mais de 50 diretórios e indexadores que fortalecem o perfil de links e aceleram a indexação.
              </p>
            </div>
            <button
              onClick={onNavigateToGenerator}
              className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Criar Backlinks Agora
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <Globe2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">Nenhum domínio auditado ainda</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Digite um endereço de website acima para consultar a autoridade de domínio, autoridade de página, saúde técnica e perfil de links em tempo real.
          </p>
        </div>
      )}
    </div>
  );
};
