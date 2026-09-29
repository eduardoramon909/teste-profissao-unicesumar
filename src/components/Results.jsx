import React from 'react';
import { ALL_COURSES } from '../data/courses';
import { CheckCircle2, Award, ArrowRight } from 'lucide-react';

export default function Results({ userInfo, answers, schoolingLevel, onSelectFinalCourse }) {
  // Cálculo inteligente das melhores opções
  const getRecommendations = () => {
    const areaCounts = {};
    Object.values(answers).forEach((ans) => {
      if (ans.area) {
        areaCounts[ans.area] = (areaCounts[ans.area] || 0) + 1;
      }
    });

    // Descobre a área mais votada
    let topArea = "Negócios";
    let maxVotes = 0;
    Object.entries(areaCounts).forEach(([area, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        topArea = area;
      }
    });

    // Mapeia o nível do curso com base na escolaridade
    let targetModalities = ["Graduação"];
    if (schoolingLevel === "TECNICO_PROF") {
      targetModalities = ["Técnicos", "Profissionalizantes"];
    } else if (schoolingLevel === "POS") {
      targetModalities = ["Pós-Graduação"];
    }

    let recommended = [];
    targetModalities.forEach(modality => {
      const coursesInModality = ALL_COURSES[modality] || [];
      const match = coursesInModality.filter(c => c.category === topArea);
      recommended.push(...match.map(c => ({ ...c, modality })));
    });

    // Caso precise de complemento
    if (recommended.length < 3) {
      targetModalities.forEach(modality => {
        const remaining = ALL_COURSES[modality] || [];
        recommended.push(...remaining.map(c => ({ ...c, modality })));
      });
    }

    return recommended.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full border border-slate-100 text-center">
      <div className="inline-flex p-3 bg-green-100 rounded-full text-green-600 mb-3">
        <Award className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-extrabold text-slate-800">
        Seu Perfil Foi Analisado!
      </h2>
      <p className="text-slate-500 text-sm mt-1 mb-6">
        Parabéns, <span className="font-bold text-slate-700">{userInfo.nome}</span>! Com base em suas respostas, selecionamos os 3 cursos perfeitos para o seu perfil:
      </p>

      <div className="grid gap-4 text-left mb-6">
        {recommendations.map((course, idx) => (
          <div
            key={idx}
            onClick={() => onSelectFinalCourse(`${course.name} (${course.modality})`)}
            className="p-4 border-2 border-slate-200 hover:border-unicesumar-orange rounded-xl cursor-pointer transition duration-200 bg-slate-50 hover:bg-orange-50/30 flex items-center justify-between group"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-unicesumar-blue bg-blue-100 px-2 py-0.5 rounded">
                {course.modality}
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-unicesumar-orange">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500">Área de afinidade: {course.category}</p>
            </div>
            <div className="flex items-center text-xs font-bold text-unicesumar-orange group-hover:translate-x-1 transition">
              Escolher <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        Clique na opção desejada para registrar seu interesse oficial e concorrer a condições exclusivas na Feira das Profissões!
      </p>
    </div>
  );
}