// деталі тварини

import React, { useState } from "react";

export default function PetDetails({ pet, onBack, onEdit, onSave, editing }) {
  const [form, setForm] = useState({ ...pet });

  const handleSave = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="pet-details">
      <button className="btn-back" onClick={onBack}>
        ← Назад
      </button>
      <div className="pet-icon">🐾</div>
      <h2 className="pet-name">{form.name}</h2>

      {!editing ? (
        <>
          <table className="pet-info">
            <tbody>
              <tr>
                <td>Стать:</td>
                <td>{form.gender || "—"}</td>
              </tr>
              <tr>
                <td>Порода:</td>
                <td>{form.species || "—"}</td>
              </tr>
              <tr>
                <td>Колір:</td>
                <td>{form.color || "—"}</td>
              </tr>
              <tr>
                <td>Вага:</td>
                <td>{form.weight || "—"}</td>
              </tr>
              <tr>
                <td>Дата народження:</td>
                <td>{new Date(form.birth).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>

          <button className="btn-edit" onClick={onEdit}>
            ✏️ Редагувати
          </button>
        </>
      ) : (
        <form className="edit-form" onSubmit={handleSave}>
          <label>Стать:</label>
          <input
            value={form.gender || ""}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          <label>Порода:</label>
          <input
            value={form.species || ""}
            onChange={(e) => setForm({ ...form, species: e.target.value })}
          />
          <label>Колір:</label>
          <input
            value={form.color || ""}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <label>Вага (кг):</label>
          <input
            type="number"
            value={form.weight || ""}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <button type="submit" className="btn-save">
            💾 Зберегти
          </button>
        </form>
      )}
    </div>
  );
}
