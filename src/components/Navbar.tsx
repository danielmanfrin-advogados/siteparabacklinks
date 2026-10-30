import React from 'react';
import { Sparkles, Globe2, BarChart3, Radio, ArrowLeftRight, FileText, Crosshair } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewAuditClick: () => void;
  currentDomain?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewAuditClick,
  currentDomain
}) => {
  const navItems = [
    { id: 'generator', label: 'Gerador de Backlinks', icon: Sparkles },
    { id: 'audit', label: 'Auditoria & Backlinks', icon: Globe2 },
    { id: 'competitors', label: 'Replicar Concorrentes', icon: Crosshair },
    { id: 'evolution', label: 'Dashboard de Evolução', icon: BarChart3 },
    { id: 'monitor', label: 'Monitor de Links', icon: Radio },
    { id: 'compare', label: 'Comparador SEO', icon: ArrowLeftRight },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            RL
          </div>
          <button
            onClick={() => setActiveTab('generator')}
            className="text-left cursor-pointer group"
          >
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              RankLink Pro
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + profile avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewAuditClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nova Auditoria</span>
          </button>
          
          <div className="relative group pl-2 border-l border-slate-200">
            <img
              src="/src/assets/images/avatar_seo_analyst_1793302444376.jpg"
              alt="Especialista SEO"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 hover:ring-blue-400 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-1 overflow-x-auto bg-slate-50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
