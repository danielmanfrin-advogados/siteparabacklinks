import React, { useState } from 'react';
import { ArrowLeftRight, Trophy, Zap, Shield, Globe, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { DomainAuditData } from '../types';
import { calculateClientAudit } from '../utils/auditHelper';

interface SeoComparatorProps {
  currentAuditData: DomainAuditData | null;
  onAuditUrl: (url: string) => void;
  onNavigateToGenerator: () => void;
}

export const SeoComparator: React.FC<SeoComparatorProps> = ({
  currentAuditData,
  onAuditUrl,
  onNavigateToGenerator,
}) => {
  const [domainA, setDomainA] = useState(currentAuditData?.domain || 'meusite.com.br');
  const [domainB, setDomainB] = useState('concorrente.com.br');
  const [dataA, setDataA] = useState<DomainAuditData | null>(currentAuditData);
  const [dataB, setDataB] = useState<DomainAuditData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainA.trim() || !domainB.trim()) return;

    setIsLoading(true);
    try {
      const [resA, resB] = await Promise.all([
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: domainA.trim() })
        }).then(r => r.json()),
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: domainB.trim() })
        }).then(r => r.json())
      ]);

      let resultA = resA?.metrics ? resA : calculateClientAudit(domainA.trim());
      let resultB = resB?.metrics ? resB : calculateClientAudit(domainB.trim());

      setDataA(resultA);
      setDataB(resultB);
    } catch {
      setDataA(calculateClientAudit(domainA.trim()));
      setDataB(calculateClientAudit(domainB.trim()));
    } finally {
      setIsLoading(false);
    }
  };

  const getWinner = (valA: number, valB: number, lowerIsBetter: boolean = false) => {
    if (valA === valB) return 'draw';
    if (lowerIsBetter) {
      return valA < valB ? 'A' : 'B';
    }
    return valA > valB ? 'A' : 'B';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Comparador de Autoridade e Concorrência SEO
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Compare lado a lado as métricas de Domain Authority, volume de backlinks, perfil de referência e tempo de resposta contra sites concorrentes.
        </p>
      </div>

      {/* Comparison Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <form onSubmit={handleCompare} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="domain-a" className="block text-xs font-semibold text-slate-700 mb-1">
                Seu Domínio (Domínio A)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="domain-a"
                  type="text"
                  placeholder="Ex: seusite.com.br"
                  value={domainA}
                  onChange={(e) => setDomainA(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono text-slate-900"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="domain-b" className="block text-xs font-semibold text-slate-700 mb-1">
                Domínio Concorrente (Domínio B)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-indigo-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="domain-b"
                  type="text"
                  placeholder="Ex: concorrente.com.br"
                  value={domainB}
                  onChange={(e) => setDomainB(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono text-slate-900"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading || !domainA.trim() || !domainB.trim()}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeftRight className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Comparando Domínios...' : 'Comparar Autoridade Agora'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comparison Results */}
      {dataA && dataB && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-200 grid grid-cols-3 items-center text-center bg-slate-50/60">
            <div className="text-left">
              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider block">Domínio A</span>
              <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block truncate">
                {dataA.domain}
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Métrica Analisada
            </div>
            <div className="text-right">
              <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider block">Domínio B (Concorrente)</span>
              <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block truncate">
                {dataB.domain}
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {/* DA Row */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-xl font-bold">
                <span className={getWinner(dataA.metrics.domainAuthority, dataB.metrics.domainAuthority) === 'A' ? 'text-blue-600' : 'text-slate-700'}>
                  {dataA.metrics.domainAuthority} / 100
                </span>
                {getWinner(dataA.metrics.domainAuthority, dataB.metrics.domainAuthority) === 'A' && (
                  <span className="text-[11px] font-sans font-semibold text-blue-600 ml-2">Vence</span>
                )}
              </div>
              <div className="text-center font-semibold text-slate-700">
                Domain Authority (DA)
              </div>
              <div className="text-right font-mono text-xl font-bold">
                {getWinner(dataA.metrics.domainAuthority, dataB.metrics.domainAuthority) === 'B' && (
                  <span className="text-[11px] font-sans font-semibold text-indigo-600 mr-2">Vence</span>
                )}
                <span className={getWinner(dataA.metrics.domainAuthority, dataB.metrics.domainAuthority) === 'B' ? 'text-indigo-600' : 'text-slate-700'}>
                  {dataB.metrics.domainAuthority} / 100
                </span>
              </div>
            </div>

            {/* PA Row */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-xl font-bold">
                <span className={getWinner(dataA.metrics.pageAuthority, dataB.metrics.pageAuthority) === 'A' ? 'text-blue-600' : 'text-slate-700'}>
                  {dataA.metrics.pageAuthority} / 100
                </span>
                {getWinner(dataA.metrics.pageAuthority, dataB.metrics.pageAuthority) === 'A' && (
                  <span className="text-[11px] font-sans font-semibold text-blue-600 ml-2">Vence</span>
                )}
              </div>
              <div className="text-center font-semibold text-slate-700">
                Page Authority (PA)
              </div>
              <div className="text-right font-mono text-xl font-bold">
                {getWinner(dataA.metrics.pageAuthority, dataB.metrics.pageAuthority) === 'B' && (
                  <span className="text-[11px] font-sans font-semibold text-indigo-600 mr-2">Vence</span>
                )}
                <span className={getWinner(dataA.metrics.pageAuthority, dataB.metrics.pageAuthority) === 'B' ? 'text-indigo-600' : 'text-slate-700'}>
                  {dataB.metrics.pageAuthority} / 100
                </span>
              </div>
            </div>

            {/* Total Backlinks */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-base font-bold text-slate-800">
                {dataA.metrics.totalBacklinks.toLocaleString('pt-BR')}
              </div>
              <div className="text-center font-semibold text-slate-700">
                Total de Backlinks
              </div>
              <div className="text-right font-mono text-base font-bold text-slate-800">
                {dataB.metrics.totalBacklinks.toLocaleString('pt-BR')}
              </div>
            </div>

            {/* Referring Domains */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-base font-bold text-slate-800">
                {dataA.metrics.referringDomains.toLocaleString('pt-BR')}
              </div>
              <div className="text-center font-semibold text-slate-700">
                Domínios de Referência
              </div>
              <div className="text-right font-mono text-base font-bold text-slate-800">
                {dataB.metrics.referringDomains.toLocaleString('pt-BR')}
              </div>
            </div>

            {/* Spam Score (Lower is better) */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-base font-bold text-emerald-600">
                {dataA.metrics.spamScore}%
              </div>
              <div className="text-center font-semibold text-slate-700">
                Spam Score (Menor é melhor)
              </div>
              <div className="text-right font-mono text-base font-bold text-emerald-600">
                {dataB.metrics.spamScore}%
              </div>
            </div>

            {/* TTFB Speed (Lower is better) */}
            <div className="grid grid-cols-3 items-center p-4 hover:bg-slate-50/50">
              <div className="text-left font-mono text-base font-bold text-slate-800">
                {dataA.ttfb} ms
              </div>
              <div className="text-center font-semibold text-slate-700">
                Tempo de Resposta (TTFB)
              </div>
              <div className="text-right font-mono text-base font-bold text-slate-800">
                {dataB.ttfb} ms
              </div>
            </div>
          </div>

          {/* Action takeaway */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              {dataA.metrics.domainAuthority < dataB.metrics.domainAuthority ? (
                <span>
                  O concorrente possui <strong className="text-slate-900">{dataB.metrics.domainAuthority - dataA.metrics.domainAuthority} pontos a mais</strong> de DA. Use nosso gerador para criar backlinks de alta autoridade e reduzir essa diferença.
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">
                  Seu domínio lidera em autoridade! Continue mantendo uma rotina de indexação para preservar a liderança orgânica.
                </span>
              )}
            </div>
            <button
              onClick={onNavigateToGenerator}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Criar Novos Backlinks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
