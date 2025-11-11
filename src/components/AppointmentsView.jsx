import React, { useState } from "react";
import NotesView from "./NotesView";
import AppointmentsView from "./AppointmentsView";
import AnalysisView from "./AnalysisView";

export default function PetDetails({ pet, onBack }) {
  const [tab, setTab] = useState("notes");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...pet });

  const handleSave = () => {
    const pets = JSON.parse(localStorage.getItem("pets") || "[]");
    const updated = pets.map((p) => (p.id === pet.id ? form : p));
    localStorage.setItem("pets", JSON.stringify(updated));
    setEditMode(false);
  };

  return (
    <div className="pet-details">
      {!editMode ? (
        <>
          <div key={tab} className="tab-content fade-in">
            {tab === "notes" && <NotesView pet={pet} />}
            {tab === "appointments" && <AppointmentsView pet={pet} />}
            {tab === "analysis" && <AnalysisView pet={pet} />}
          </div>
        </>
      ) : (
        <div className="edit-form">
          <h3>Редагування улюбленця</h3>
          <input
            type="text"
            placeholder="Ім’я"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Вид / порода"
            value={form.species}
            onChange={(e) => setForm({ ...form, species: e.target.value })}
          />
          <input
            type="text"
            placeholder="Колір"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <input
            type="number"
            placeholder="Вага (г)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <input
            type="date"
            value={form.birth}
            onChange={(e) => setForm({ ...form, birth: e.target.value })}
          />

          <div className="form-buttons clean">
            <button onClick={handleSave} className="btn-save">
              💾 Зберегти
            </button>
            <button onClick={() => setEditMode(false)} className="btn-cancel">
              ✖ Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
