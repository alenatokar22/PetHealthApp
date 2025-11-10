import React, { useState } from "react";
import { MdPets } from "react-icons/md";
import {
  FaPalette,
  FaVenusMars,
  FaFeatherAlt,
  FaWeightHanging,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PetForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    color: "",
    gender: "",
    birth: "",
    weight: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Введіть ім’я улюбленця 🐾");

    const newPet = { id: Date.now(), ...form };
    onAdd(newPet);

    setForm({
      name: "",
      species: "",
      color: "",
      gender: "",
      birth: "",
      weight: "",
    });
  };

  return (
    <form className="pet-form fancy" onSubmit={handleSave}>
      <div className="form-group">
        <MdPets className="form-icon" />
        <input
          type="text"
          placeholder="Ім'я улюбленця"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <FaFeatherAlt className="form-icon" />
        <input
          type="text"
          placeholder="Вид / порода"
          value={form.species}
          onChange={(e) => handleChange("species", e.target.value)}
        />
      </div>

      <div className="form-group">
        <FaPalette className="form-icon" />
        <input
          type="text"
          placeholder="Колір"
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
      </div>

      <div className="form-group">
        <FaVenusMars className="form-icon" />
        <input
          type="text"
          placeholder="Стать"
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        />
      </div>

      <div className="form-group">
        <FaWeightHanging className="form-icon" />
        <input
          type="number"
          placeholder="Вага (г)"
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
        />
      </div>

      <div className="form-group">
        <FaCalendarAlt className="form-icon" />
        <input
          type="date"
          value={form.birth}
          onChange={(e) => handleChange("birth", e.target.value)}
        />
      </div>

      <div className="form-buttons clean">
        <button type="submit" className="btn-save">
          💾 Зберегти
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          ✖ Скасувати
        </button>
      </div>
    </form>
  );
}
