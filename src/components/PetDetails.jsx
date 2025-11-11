import React, { useState, useEffect } from "react";
import NotesView from "./NotesView";
import AppointmentsView from "./AppointmentsView";
import AnalysisView from "./AnalysisView";

export default function PetDetails({ pet, onBack }) {
  const [tab, setTab] = useState("info");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...pet });
  const [photo, setPhoto] = useState(() => localStorage.getItem(`photo_${pet.id}`) || "");

  useEffect(() => {
    if (photo) localStorage.setItem(`photo_${pet.id}`, photo);
  }, [photo, pet.id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const pets = JSON.parse(localStorage.getItem("pets") || "[]");
    const updated = pets.map((p) => (p.id === pet.id ? form : p));
    localStorage.setItem("pets", JSON.stringify(updated));
    setEditMode(false);
    alert("✅ Дані оновлено");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="pet-details">
      {/* Верхня панель */}
      <div className="details-topbar">
        
        <button className="btn-back" onClick={onBack}>← Назад</button>
        {editMode && (
          <>
            <button className="btn-save" onClick={handleSave}>💾 Зберегти</button>
            <button className="btn-cancel" onClick={() => setEditMode(false)}>✖ Скасувати</button>
          </>
        )}
      </div>

      

      {/* Вкладки */}
      <h2 className="details-title">🦜 {pet.name}</h2>
      <div className="tabs top-tabs">
        
        <button
          className={`tab-btn ${tab === "info" ? "active" : ""}`}
          onClick={() => setTab("info")}
        >
          ℹ️ Інформація
        </button>
        <button
          className={`tab-btn ${tab === "notes" ? "active" : ""}`}
          onClick={() => setTab("notes")}
        >
          ✏️ Нотатки
        </button>
        <button
          className={`tab-btn ${tab === "appointments" ? "active" : ""}`}
          onClick={() => setTab("appointments")}
        >
          📅 Прийоми
        </button>
        <button
          className={`tab-btn ${tab === "analysis" ? "active" : ""}`}
          onClick={() => setTab("analysis")}
        >
          🧪 Аналізи
        </button>
      </div>

      {/* Вміст вкладок */}
      <div className="tab-content fade-in">
        {tab === "info" && (
          <div className="pet-info-card">
            {/* Фото */}
            <label className="photo-upload-header">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {photo ? (
                <img src={photo} alt="Pet" className="photo-header" />
              ) : (
                <div className="photo-placeholder">📷 Оберіть фото</div>
              )}
            </label>

            {!editMode ? (
              <>
                <p><strong>Вид / порода:</strong> {pet.species || "—"}</p>
                <p><strong>Колір:</strong> {pet.color || "—"}</p>
                <p><strong>Стать:</strong> {pet.gender || "—"}</p>
                <p><strong>Вага:</strong> {pet.weight ? `${pet.weight} г` : "—"}</p>
                <p><strong>Дата народження:</strong> {pet.birth || "—"}</p>
                <div className="info-buttons">
                  <button className="btn-edit" onClick={() => setEditMode(true)}>✏️ Редагувати</button>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <h3>Редагування {pet.name}</h3>
                <input
                  type="text"
                  placeholder="Ім’я"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Вид / порода"
                  value={form.species}
                  onChange={(e) => handleChange("species", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Колір"
                  value={form.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Стать"
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Вага (г)"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
                <input
                  type="date"
                  value={form.birth}
                  onChange={(e) => handleChange("birth", e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        {tab === "notes" && <NotesView pet={pet} />}
        {tab === "appointments" && <AppointmentsView pet={pet} />}
        {tab === "analysis" && <AnalysisView pet={pet} />}
      </div>
    </div>
  );
}
