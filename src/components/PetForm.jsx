// форма додавання

import React, { useState } from "react";

export default function PetForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", species: "", birth: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.birth) return;

    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      species: form.species.trim(),
      birth: form.birth,
    });

    setForm({ name: "", species: "", birth: "" });
  };

  return (
    <form className="pet-form" onSubmit={handleSubmit}>
      <input
        placeholder="Ім'я"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Порода / вид"
        value={form.species}
        onChange={(e) => setForm({ ...form, species: e.target.value })}
      />
      <input
        type="date"
        value={form.birth}
        onChange={(e) => setForm({ ...form, birth: e.target.value })}
        required
      />
      <button type="submit" className="btn-add">
        Додати тварину
      </button>
    </form>
  );
}
