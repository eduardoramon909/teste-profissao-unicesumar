import React, { useState } from 'react';
import LeadForm from './components/LeadForm';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Admin from './components/Admin';
import { Settings } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('FORM'); // FORM, QUIZ, RESULTS, ADMIN
  const [userInfo, setUserInfo] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [schoolingLevel, setSchoolingLevel] = useState('');
  const [finishedMsg, setFinishedMsg] = useState(false);

  const saveLeadToStorage = (leadData) => {
    const existing = JSON.parse(localStorage.getItem('unicesumar_leads') || '[]');
    const updated = [leadData, ...existing];
    localStorage.setItem('unicesumar_leads', JSON.stringify(updated));
  };

  const handleStartQuiz = (info) => {
    setUserInfo(info);
    setStep('QUIZ');
  };

  const handleDirectLeadSubmit = (leadData) => {
    saveLeadToStorage(leadData);
    setFinishedMsg(true);
  };

  const handleCompleteQuiz = (quizAnswers, schooling) => {
    setAnswers(quizAnswers);
    setSchoolingLevel(schooling);
    setStep('RESULTS');
  };

  const handleSelectFinalCourse = (selectedCourse) => {
    const leadData = {
      ...userInfo,
      cursoPretendido: selectedCourse,
      escolaridade: answers[1]?.label || 'Não informada',
      dataRegistro: new Date().toISOString()
    };

    saveLeadToStorage(leadData);
    setFinishedMsg(true);
  };

  const resetAll = () => {
    setUserInfo(null);
    setAnswers(null);
    setSchoolingLevel('');
    setFinishedMsg(false);
    setStep('FORM');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between p-4 md:p-8 relative">
      {/* Topo / Header */}
      <header className="max-w-5xl mx-auto w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={resetAll}>
          <div className="bg-unicesumar-orange text-white font-extrabold px-3 py-1 rounded-lg text-lg tracking-wider shadow">
            UniCesumar
          </div>
          <span className="text-white font-semibold text-sm hidden md:inline">
            Feira de Profissões
          </span>
        </div>

        <button
          onClick={() => setStep('ADMIN')}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-1 transition border border-slate-700"
        >
          <Settings className="w-4 h-4" /> Painel Admin
        </button>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 flex items-center justify-center">
        {finishedMsg ? (
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Inscrição Confirmada!</h2>
            <p className="text-slate-600 text-sm mb-6">
              Obrigado por participar! Suas informações e seu interesse no curso foram salvos com sucesso. Procure nossos consultores no estande da UniCesumar!
            </p>
            <button
              onClick={resetAll}
              className="bg-unicesumar-blue text-white font-bold py-2.5 px-6 rounded-xl w-full"
            >
              Novo Cadastramento
            </button>
          </div>
        ) : (
          <>
            {step === 'FORM' && (
              <LeadForm onSubmitLead={handleDirectLeadSubmit} onStartQuiz={handleStartQuiz} />
            )}
            {step === 'QUIZ' && (
              <Quiz userInfo={userInfo} onCompleteQuiz={handleCompleteQuiz} />
            )}
            {step === 'RESULTS' && (
              <Results
                userInfo={userInfo}
                answers={answers}
                schoolingLevel={schoolingLevel}
                onSelectFinalCourse={handleSelectFinalCourse}
              />
            )}
            {step === 'ADMIN' && (
              <Admin onBack={resetAll} />
            )}
          </>
        )}
      </main>

      {/* Rodapé */}
      <footer className="text-center text-slate-500 text-xs mt-8">
        © {new Date().getFullYear()} UniCesumar - Polo Igarapé-Açu.
      </footer>
    </div>
  );
}