import React, { useState } from 'react';
import { Search, ChevronDown, User, Phone, CreditCard, BookOpen } from 'lucide-react';
import { validateCPF, formatCPF, formatPhone } from '../utils/cpf';
import { ALL_COURSES } from '../data/courses';

export default function LeadForm({ onSubmitLead, onStartQuiz }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cpf: '',
    cursoPretendido: ''
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCpfChange = (e) => {
    setFormData({ ...formData, cpf: formatCPF(e.target.value) });
    if (errors.cpf) setErrors({ ...errors, cpf: null });
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, whatsapp: formatPhone(e.target.value) });
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome completo é obrigatório.";
    if (formData.whatsapp.replace(/\D/g, '').length < 10) newErrors.whatsapp = "WhatsApp inválido.";
    if (!validateCPF(formData.cpf)) newErrors.cpf = "CPF inválido. Verifique os números.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se o usuário selecionou um curso desejado previamente -> Salva Lead e finaliza
    if (formData.cursoPretendido) {
      onSubmitLead({
        ...formData,
        escolaridade: "Não informado (Lead Direto)",
        dataRegistro: new Date().toISOString()
      });
    } else {
      // Se deixou o curso em branco -> Inicia o Teste Vocacional
      onStartQuiz(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-lg w-full border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-unicesumar-blue rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          Feira das Profissões UniCesumar
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Descubra Seu Futuro Profissional
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Preencha seus dados para iniciar o teste vocacional de 60 segundos!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo *</label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unicesumar-blue"
            />
          </div>
          {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp *</label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="(91) 98000-0000"
              maxLength={15}
              value={formData.whatsapp}
              onChange={handlePhoneChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unicesumar-blue"
            />
          </div>
          {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CPF *</label>
          <div className="relative">
            <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="000.000.000-00"
              maxLength={14}
              value={formData.cpf}
              onChange={handleCpfChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-unicesumar-blue"
            />
          </div>
          {errors.cpf && <p className="text-red-500 text-xs font-1 mt-1 font-semibold">{errors.cpf}</p>}
        </div>

        {/* Seletor de Cursos com Busca Categorizada */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Curso Pretendido <span className="font-normal text-slate-400">(Opcional)</span>
          </label>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm flex justify-between items-center cursor-pointer hover:border-slate-300"
          >
            <span className={formData.cursoPretendido ? "text-slate-800 font-medium" : "text-slate-400"}>
              {formData.cursoPretendido || "Selecione se já souber ou deixe em branco..."}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {dropdownOpen && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto p-2">
              <div className="sticky top-0 bg-white pb-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Pesquisar curso..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-md border-none focus:ring-1 focus:ring-unicesumar-blue"
                  />
                </div>
              </div>

              <div
                className="p-1.5 hover:bg-slate-100 text-xs rounded cursor-pointer italic text-slate-500"
                onClick={() => {
                  setFormData({ ...formData, cursoPretendido: '' });
                  setDropdownOpen(false);
                }}
              >
                -- Não sei ainda (Quero fazer o Teste Vocacional) --
              </div>

              {Object.keys(ALL_COURSES).map((modalidade) => {
                const filtered = ALL_COURSES[modalidade].filter(c =>
                  c.name.toLowerCase().includes(search.toLowerCase())
                );
                if (filtered.length === 0) return null;

                return (
                  <div key={modalidade} className="mt-2">
                    <div className="text-[10px] font-extrabold uppercase px-2 py-1 bg-blue-50 text-unicesumar-blue rounded">
                      {modalidade}
                    </div>
                    {filtered.map((curso, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setFormData({ ...formData, cursoPretendido: `${curso.name} (${modalidade})` });
                          setDropdownOpen(false);
                        }}
                        className="text-xs p-2 hover:bg-blue-100 rounded cursor-pointer text-slate-700"
                      >
                        {curso.name}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-unicesumar-blue hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200 flex justify-center items-center gap-2"
        >
          {formData.cursoPretendido ? "Cadastrar Interesse" : "Iniciar Teste (60s)"}
        </button>
      </form>
    </div>
  );
}