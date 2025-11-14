import React, { useState, useEffect } from "react";
import "../styles/TreatmentView.css";

export default function TreatmentView({ pet }) {
  const [treatments, setTreatments] = useState(() => {
    const saved = localStorage.getItem(`treatments_${pet.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newTreatment, setNewTreatment] = useState({
    datetime: "",
    medicine: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    datetime: "",
    medicine: "",
  });

  useEffect(() => {
    localStorage.setItem(`treatments_${pet.id}`, JSON.stringify(treatments));
  }, [treatments, pet.id]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTreatment.datetime || !newTreatment.medicine) {
      alert("Заповни дату/час та назву препарату 💊");
      return;
    }

    const obj = {
      id: Date.now(),
      ...newTreatment,
    };

    setTreatments((prev) =>
      [...prev, obj].sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    );

    setNewTreatment({ datetime: "", medicine: "" });
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setEditForm({ datetime: t.datetime, medicine: t.medicine });
  };

  const saveEdit = () => {
    setTreatments((prev) =>
      prev
        .map((t) => (t.id === editId ? { ...t, ...editForm } : t))
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    );
    setEditId(null);
  };

  const copyTreatment = (t) => {
    const copy = {
      id: Date.now(),
      datetime: t.datetime,
      medicine: t.medicine,
    };
    setTreatments((prev) =>
      [...prev, copy].sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Видалити лікування?")) {
      setTreatments(treatments.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="treatment-view">
      <h3 className="section-title">💊 Лікування</h3>

      {/* ФОРМА ДОДАВАННЯ */}
      <form className="treatment-form" onSubmit={handleAdd}>
        <div className="input-block">
          <label>Дата та час</label>
          <input
            type="datetime-local"
            value={newTreatment.datetime}
            onChange={(e) =>
              setNewTreatment({
                ...newTreatment,
                datetime: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="input-block">
          <label>Назва препарату</label>
          <textarea
            placeholder="Назва препарату, дозування, спосіб введення..."
            value={newTreatment.medicine}
            onChange={(e) =>
              setNewTreatment({
                ...newTreatment,
                medicine: e.target.value,
              })
            }
            onKeyDown={(e) => {
              // Enter НЕ відправляє форму
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
              }
            }}
            rows={2}
            className="treatment-textarea"
            required
          ></textarea>
        </div>

        <button className="btn-add" type="submit">
          ➕ Додати
        </button>
      </form>

      {/* СПИСОК ЛІКУВАНЬ */}
      <div className="treatment-list">
        {treatments.length === 0 ? (
          <p className="empty">Поки немає лікувань 🐾</p>
        ) : (
          treatments.map((t) =>
            editId === t.id ? (
              // РЕЖИМ РЕДАГУВАННЯ
              <div key={t.id} className="treatment-item edit-mode">
                <input
                  type="datetime-local"
                  value={editForm.datetime}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      datetime: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editForm.medicine}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      medicine: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                    }
                  }}
                  rows={2}
                  className="treatment-textarea"
                ></textarea>

                <div className="btn-row">
                  <button className="btn-save" onClick={saveEdit}>
                    💾
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setEditId(null)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ) : (
              // ЗВИЧАЙНИЙ РОЗДІЛ
              <div key={t.id} className="treatment-item">
                <div>
                  <strong>
                    {new Date(t.datetime).toLocaleString("uk-UA")}
                  </strong>
                  <br />
                  {t.medicine}
                </div>

                <div className="btn-row">
                  <button className="btn-copy" onClick={() => copyTreatment(t)}>
                    📋
                  </button>
                  <button className="btn-edit" onClick={() => startEdit(t)}>
                    ✏️
                  </button>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(t.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
