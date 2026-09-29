import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Download, Trash2, Edit, Save, PlusCircle, ShieldCheck } from 'lucide-react';

export default function Admin({ onBack }) {
  const [leads, setLeads] = useState([]);
  const [actionName, setActionName] = useState('Feira das Profissões - Polo Igarapé-Açu');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('unicesumar_leads') || '[]');
    setLeads(savedLeads);
    const savedAction = localStorage.getItem('unicesumar_action_name');
    if (savedAction) setActionName(savedAction);
  }, []);

  const handleSaveActionName = (val) => {
    setActionName(val);
    localStorage.setItem('unicesumar_action_name', val);
  };

  const handleEditClick = (index, lead) => {
    setEditingIndex(index);
    setEditForm(lead);
  };

  const handleSaveEdit = (index) => {
    const updated = [...leads];
    updated[index] = editForm;
    setLeads(updated);
    localStorage.setItem('unicesumar_leads', JSON.stringify(updated));
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (confirm("Tem certeza que deseja excluir este lead?")) {
      const updated = leads.filter((_, i) => i !== index);
      setLeads(updated);
      localStorage.setItem('unicesumar_leads', JSON.stringify(updated));
    }
  };

  // Exportação em Excel no formato exato solicitado
  const exportToExcel = () => {
    const dataToExport = leads.map((lead, idx) => ({
      "Nº": idx + 1,
      "Data/Hora": new Date(lead.dataRegistro).toLocaleString('pt-BR'),
      "Nome Ação": actionName,
      "Nome Completo": lead.nome,
      "WhatsApp": lead.whatsapp,
      "CPF": lead.cpf,
      "Escolaridade": lead.escolaridade || 'Não informada',
      "Curso Pretendido": lead.cursoPretendido || 'A definir'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Capturados");

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Leads_UniCesumar_${actionName.replace(/\s+/g, '_')}_${dateStr}.xlsx`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl w-full border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-unicesumar-blue" /> Painel Admin de Leads
          </h1>
          <p className="text-xs text-slate-500">Gerencie e exporte as respostas da ação da feira.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 shadow"
          >
            <Download className="w-4 h-4" /> Exportar Planilha Excel (.xlsx)
          </button>
          <button
            onClick={onBack}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 px-4 rounded-lg"
          >
            Voltar ao Teste
          </button>
        </div>
      </div>

      <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Nome da Ação do Dia:
        </label>
        <input
          type="text"
          value={actionName}
          onChange={(e) => handleSaveActionName(e.target.value)}
          className="w-full md:w-1/2 p-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unicesumar-blue"
        />
      </div>

      {/* Tabela de Leads */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 border-collapse">
          <thead>
            <tr className="bg-slate-100 uppercase text-slate-700 text-[10px] font-bold border-b">
              <th className="p-2">Data</th>
              <th className="p-2">Nome</th>
              <th className="p-2">WhatsApp</th>
              <th className="p-2">CPF</th>
              <th className="p-2">Escolaridade</th>
              <th className="p-2">Curso Escolhido</th>
              <th className="p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-slate-400">
                  Nenhum lead registrado ainda nesta ação.
                </td>
              </tr>
            ) : (
              leads.map((lead, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  {editingIndex === idx ? (
                    <>
                      <td className="p-2">{new Date(lead.dataRegistro).toLocaleDateString()}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editForm.nome}
                          onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editForm.whatsapp}
                          onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editForm.cpf}
                          onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2">{editForm.escolaridade}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editForm.cursoPretendido}
                          onChange={(e) => setEditForm({ ...editForm, cursoPretendido: e.target.value })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button onClick={() => handleSaveEdit(idx)} className="text-green-600 mr-2">
                          <Save className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 whitespace-nowrap">{new Date(lead.dataRegistro).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="p-2 font-bold text-slate-800">{lead.nome}</td>
                      <td className="p-2">{lead.whatsapp}</td>
                      <td className="p-2 font-mono">{lead.cpf}</td>
                      <td className="p-2">{lead.escolaridade}</td>
                      <td className="p-2 font-semibold text-unicesumar-blue">{lead.cursoPretendido}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <button onClick={() => handleEditClick(idx, lead)} className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
