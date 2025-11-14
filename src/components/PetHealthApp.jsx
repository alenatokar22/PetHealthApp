// PetHealthApp.jsx
import React, { useState, useEffect } from "react";
import PetList from "./PetList";
import PetForm from "./PetForm";
import PetDetails from "./PetDetails";
import ThemeToggle from "./ThemeToggle";
import "../styles/pet.css";

export default function PetHealthApp() {
  // lazy init — читаємо localStorage один раз при ініціалізації state
  const [pets, setPets] = useState(() => {
    try {
      const raw = localStorage.getItem("pets");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Помилка парсингу localStorage при ініціалізації:", e);
      return [];
    }
  });

  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Зберігаємо pets у localStorage коли pets змінюється
  useEffect(() => {
    try {
      localStorage.setItem("pets", JSON.stringify(pets));
    } catch (e) {
      console.error("Помилка збереження в localStorage:", e);
    }
  }, [pets]);

  // Безпечні оновлення state через функціональний setState
  const handleAddPet = (pet) => {
    setPets((prev) => {
      const updated = [...prev, pet];
      return updated;
    });
    setShowForm(false);
  };

  const handleDeletePet = (id) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
    // Якщо видалили вибрану тварину — збросимо selected
    setSelectedPet((prev) => (prev && prev.id === id ? null : prev));
  };

  const handleSelectPet = (pet) => setSelectedPet(pet);
  const handleBack = () => setSelectedPet(null);

  return (
    <div className="pet-app">
      <ThemeToggle />
      <header className="pet-header">
        {!selectedPet && <h2 className="page-title">🦜 Мої улюбленці</h2>}
      </header>

      <main className="pet-main">
        {!selectedPet ? (
          <>
            <div className="add-bar">
              {!showForm && (
                <button
                  className="btn-add-pet"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Додати улюбленця
                </button>
              )}
            </div>

            {!selectedPet && showForm ? (
              <section className="form-section appear">
                <h2 className="section-title">
                  📋 Форма для додавання улюбленця
                </h2>
                <PetForm
                  onAdd={handleAddPet}
                  onCancel={() => setShowForm(false)}
                />
              </section>
            ) : null}

            {!showForm && !selectedPet && (
              <PetList
                pets={pets}
                onDelete={handleDeletePet}
                onSelect={handleSelectPet}
              />
            )}
          </>
        ) : (
          <PetDetails pet={selectedPet} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}
