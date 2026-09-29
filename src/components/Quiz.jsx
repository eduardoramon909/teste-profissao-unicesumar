import React, { useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { ChevronRight } from 'lucide-react';

export default function Quiz({ userInfo, onCompleteQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [schoolingLevel, setSchoolingLevel] = useState('');

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (opt) => {
    const updatedAnswers = { ...answers, [currentQ.id]: opt };
    setAnswers(updatedAnswers);

    if (currentQ.isSchooling) {
      setSchoolingLevel(opt.level);
    }

    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onCompleteQuiz(updatedAnswers, opt.level || schoolingLevel);
    }
  };

  const progressPercentage = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-xl w-full border border-slate-100">
      {/* Barra de Progresso */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
          <span>Pergunta {currentIndex + 1} de {QUESTIONS.length}</span>
          <span>{progressPercentage}% Concluído</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-unicesumar-orange h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
        {currentQ.title}
      </h2>
      {currentQ.subtitle && (
        <p className="text-xs text-slate-500 mb-4">{currentQ.subtitle}</p>
      )}

      <div className="space-y-2.5 mt-4">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(option)}
            className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-unicesumar-blue hover:bg-blue-50/50 transition duration-150 flex justify-between items-center group"
          >
            <span className="text-xs md:text-sm font-semibold text-slate-700 group-hover:text-unicesumar-blue">
              {option.label}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-unicesumar-blue" />
          </button>
        ))}
      </div>
    </div>
  );
}