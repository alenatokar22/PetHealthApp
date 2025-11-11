import React, { useState, useEffect } from "react";

export default function AnalysisView({ pet }) {
  const storageKey = `analysis_${pet.id}`;
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [newRec, setNewRec] = useState({ date: "", result: "" });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(records));
  }, [records]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newRec.date || !newRec.result) return;
    setRecords([...records, { id: Date.now(), ...newRec }]);
    setNewRec({ date: "", result: "" });
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="analysis-view">
      <form onSubmit={handleAdd} className="note-form">
        <input
          type="date"
          value={newRec.date}
          onChange={(e) => setNewRec({ ...newRec, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Результати аналізу / опис"
          value={newRec.result}
          onChange={(e) => setNewRec({ ...newRec, result: e.target.value })}
          required
        />
        <button type="submit" className="btn-add">
          Додати
        </button>
      </form>

      {records.length === 0 ? (
        <p>Немає записів 🧾</p>
      ) : (
        <ul className="notes-list">
          {records.map((r) => (
            <li key={r.id}>
              <strong>{r.date}</strong> — {r.result}
              <button onClick={() => handleDelete(r.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
