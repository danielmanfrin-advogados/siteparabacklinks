import React from 'react';
import { X, Check, Sliders, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { CustomMetricConfig } from '../types';

interface CustomMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: CustomMetricConfig[];
  onToggleMetric: (id: string) => void;
  onResetToDefaults: () => void;
  onSelectAll: () => void;
}

export const CustomMetricsModal: React.FC<CustomMetricsModalProps> = ({
  isOpen,
  onClose,
  metrics,
  onToggleMetric,
  onResetToDefaults,
  onSelectAll,
}) => {
  if (!isOpen) return null;

  const enabledCount = metrics.filter(m => m.enabled).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Personalizar Métricas do Dashboard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info & Bulk Controls */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div>
            <span>{enabledCount} de {metrics.length} métricas ativas</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAll}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
            >
              Ativar todas
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={onResetToDefaults}
              className="text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restaurar padrão</span>
            </button>
          </div>
        </div>

        {/* Metrics List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => onToggleMetric(metric.id)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                metric.enabled
                  ? 'border-blue-200 bg-blue-50/40 hover:bg-blue-50/70'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 opacity-75'
              }`}
            >
              <div className="pt-0.5">
                {metric.enabled ? (
                  <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded border border-slate-300 bg-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${metric.enabled ? 'text-slate-900' : 'text-slate-600'}`}>
                    {metric.label}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    {metric.format}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Aplicar no Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
