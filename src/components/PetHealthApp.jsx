import React, { useState } from "react";
import "../styles/pet.css";

export default function PetHealthApp() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: "", species: "", birth: "" });

  const handleAddPet = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.birth) return;

    const newPet = {
      id: Date.now(),
      name: form.name.trim(),
      species: form.species.trim(),
      birth: form.birth,
    };

    setPets([...pets, newPet]);
    setForm({ name: "", species: "", birth: "" });
  };

  function calcAge(birth) {
    const birthDate = new Date(birth);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return m < 0 ? years - 1 : years;
  }

  return (
    <div className="pet-app">
      <header className="pet-header">
        <h1 className="pet-title">🐾 Мої тварини</h1>
      </header>

      <main className="pet-main">
        <ul className="pet-list">
          {pets.map((pet) => (
            <li key={pet.id} className="pet-card">
              <div>
                <strong>{pet.name}</strong> <br />
                <span className="muted">{pet.species || "—"}</span>
              </div>
              <div className="pet-age">
                {new Date(pet.birth).toLocaleDateString()} <br />
                <small>({calcAge(pet.birth)} р.)</small>
              </div>
            </li>
          ))}
        </ul>

        <form className="pet-form" onSubmit={handleAddPet}>
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
      </main>
    </div>
  );
}
