import React, { useEffect, useState } from "react";
import "../styles/AnalysisView.css"; // імпортуй файл стилів

export default function AnalysisView({ pet }) {
  const storageKey = `weights_${pet.id}`;

  const [weights, setWeights] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  });

  const [form, setForm] = useState({
    date: "",
    weight: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", weight: "" });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(weights));
  }, [weights, storageKey]);

  const resetForm = () => setForm({ date: "", weight: "" });

  const handleAdd = (e) => {
    e?.preventDefault?.();
    if (!form.date || form.weight === "") {
      alert("Вкажіть дату та вагу (в грамах).");
      return;
    }
    const item = {
      id: Date.now(),
      date: form.date,
      weight: Number(form.weight),
    };
    const updated = [...weights, item].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setWeights(updated);
    resetForm();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditForm({ date: item.date, weight: String(item.weight) });
  };

  const saveEdit = () => {
    if (!editForm.date || editForm.weight === "") {
      alert("Вкажіть дату та вагу.");
      return;
    }
    const updated = weights
      .map((w) =>
        w.id === editId
          ? { ...w, date: editForm.date, weight: Number(editForm.weight) }
          : w
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setWeights(updated);
    setEditId(null);
  };

  const cancelEdit = () => setEditId(null);

  const handleDelete = (id) => {
    if (!confirm("Видалити запис ваги?")) return;
    setWeights(weights.filter((w) => w.id !== id));
  };

  const copyLatest = (dateToCopy = null) => {
    // копіюємо останній запис (або за дату dateToCopy)
    const source = dateToCopy
      ? weights.find((w) => w.date === dateToCopy)
      : weights[0];
    if (!source) return;
    const copy = { id: Date.now(), date: source.date, weight: source.weight };
    setWeights((prev) =>
      [copy, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  return (
    <div className="analysis-view">
      {/* Форма додавання */}
      <form className="weight-form" onSubmit={handleAdd}>
        <div className="field">
          <label>Дата</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label>Вага (г)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            placeholder="напр. 88 (г)"
            required
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary">
            ➕ Додати
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              // швидко скопіювати останню вагу в поле дати сьогодні
              if (weights.length === 0)
                return alert("Немає записів для копіювання.");
              const last = weights[0];
              setForm({
                date: new Date().toISOString().slice(0, 10),
                weight: String(last.weight),
              });
            }}
          >
            📋 Скопіювати останню
          </button>
        </div>
      </form>

      {/* Список записів */}
      <div className="weight-list card">
        {weights.length === 0 ? (
          <p className="empty">Немає записів ваги</p>
        ) : (
          <ul>
            {weights.map((w) =>
              editId === w.id ? (
                <li key={w.id} className="weight-item edit">
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    value={editForm.weight}
                    onChange={(e) =>
                      setEditForm({ ...editForm, weight: e.target.value })
                    }
                  />
                  <div className="row-actions">
                    <button className="btn-save" onClick={saveEdit}>
                      💾
                    </button>
                    <button className="btn-cancel" onClick={cancelEdit}>
                      ❌
                    </button>
                  </div>
                </li>
              ) : (
                <li key={w.id} className="weight-item">
                  <div>
                    <strong>{w.date}</strong> —{" "}
                    <span className="muted">{w.weight} г</span>
                  </div>
                  <div className="row-actions">
                    <button
                      className="btn-copy"
                      title="Скопіювати"
                      onClick={() => copyLatest(w.date)}
                    >
                      📋
                    </button>
                    <button
                      className="btn-edit"
                      title="Редагувати"
                      onClick={() => startEdit(w)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      title="Видалити"
                      onClick={() => handleDelete(w.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
